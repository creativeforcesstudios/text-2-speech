import { anthropic, MOVIE_AI_MODEL } from "@/lib/anthropic";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { type, name, description, style, duration } = await req.json();

  const prompt = buildGenerationPrompt({ type, name, description, style, duration });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const messageStream = anthropic.messages.stream({
        model: MOVIE_AI_MODEL,
        max_tokens: 16000,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        thinking: { type: "adaptive" } as any,
        system: `You are CineAI, an expert AI content director. Generate comprehensive, production-ready content plans with vivid scene descriptions, dialogue, and technical direction. Structure your output with clear sections using markdown headers.`,
        messages: [{ role: "user", content: prompt }],
      });

      for await (const event of messageStream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ text: event.delta.text })}\n\n`
            )
          );
        }
      }

      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

function buildGenerationPrompt({
  type,
  name,
  description,
  style,
  duration,
}: {
  type: string;
  name: string;
  description: string;
  style?: string;
  duration?: string;
}) {
  const typeLabels: Record<string, string> = {
    reallife: "Real Life Show",
    cartoon: "Cartoon/Animation",
    documentary: "Documentary",
    music: "Music Video",
    internetshow: "Internet Show",
    movie: "Short Film/Movie",
  };

  const label = typeLabels[type] || "Content";

  return `Generate a complete production plan for the following ${label}:

**Title:** ${name}
**Description:** ${description}
${style ? `**Visual Style:** ${style}` : ""}
${duration ? `**Target Duration:** ${duration}` : ""}

Please create a comprehensive production plan that includes:

## 1. CONCEPT & OVERVIEW
- Expanded creative vision
- Target audience and tone
- Core themes and messages

## 2. EPISODE/SEGMENT STRUCTURE
- Full breakdown of scenes or segments
- Pacing and runtime for each section

## 3. SCENE-BY-SCENE BREAKDOWN
For each scene, provide:
- Visual description (camera angles, lighting, environment)
- Action/dialogue
- Mood and music direction
- Technical notes

## 4. SCRIPT (Key Scenes)
- Full dialogue and action lines for the most important scenes
- Voice direction notes

## 5. VISUAL STYLE GUIDE
- Color palette and aesthetic
- Camera movement style
- Editing rhythm and transitions

## 6. MUSIC & SOUND DESIGN
- Score direction and mood
- Sound effects and ambient audio
- Any specific musical references

## 7. PRODUCTION NOTES
- Special effects or animation notes
- Key props or set requirements
- Post-production guidance

Make this as long and detailed as possible. Be specific and cinematic in your descriptions.`;
}
