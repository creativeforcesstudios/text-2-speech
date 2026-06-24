"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Wand2,
  Send,
  Bot,
  User,
  Sparkles,
  Film,
  Music,
  Tv,
  BookOpen,
  Clapperboard,
  Video,
  Download,
  RefreshCw,
  ChevronDown,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  thinking?: string;
}

const quickPrompts = [
  { icon: Tv, text: "Create a 5-episode sci-fi internet show", color: "text-purple-400" },
  { icon: Music, text: "Design a cinematic music video for an upbeat pop song", color: "text-pink-400" },
  { icon: Film, text: "Write a 10-minute short film about AI and humanity", color: "text-red-400" },
  { icon: BookOpen, text: "Plan a nature documentary series about ocean life", color: "text-blue-400" },
  { icon: Clapperboard, text: "Create an animated cartoon pilot episode", color: "text-orange-400" },
  { icon: Video, text: "Design a reality web series about young creators", color: "text-green-400" },
];

const contentTypes = [
  { value: "all", label: "All Types" },
  { value: "internetshow", label: "Internet Show" },
  { value: "music", label: "Music Video" },
  { value: "movie", label: "Short Film" },
  { value: "documentary", label: "Documentary" },
  { value: "cartoon", label: "Cartoon" },
  { value: "reallife", label: "Real Life" },
];

function GenerateContent() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedType, setSelectedType] = useState("all");
  const [showTypeSelect, setShowTypeSelect] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const type = searchParams.get("type");
    const name = searchParams.get("name");
    const desc = searchParams.get("desc");

    if (name && desc) {
      const typeLabel =
        contentTypes.find((t) => t.value === (type || "all"))?.label || "content";
      const autoPrompt = `I want to create a ${typeLabel} called "${name}". Here's my vision: ${desc}\n\nPlease generate a complete production plan for this.`;
      setInput(autoPrompt);
    }
  }, [searchParams]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text?: string) {
    const messageText = text || input.trim();
    if (!messageText || isStreaming) return;

    setInput("");
    const userMessage: Message = { role: "user", content: messageText };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsStreaming(true);

    const assistantMessage: Message = { role: "assistant", content: "" };
    setMessages([...newMessages, assistantMessage]);

    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) throw new Error("Failed to connect to AI");

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                fullText += parsed.text;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: fullText,
                  };
                  return updated;
                });
              }
            } catch {
              // skip malformed chunks
            }
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content:
              "I encountered an error. Please check that your ANTHROPIC_API_KEY is set and try again.",
          };
          return updated;
        });
      }
    } finally {
      setIsStreaming(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function stopGeneration() {
    abortRef.current?.abort();
    setIsStreaming(false);
  }

  function clearChat() {
    setMessages([]);
  }

  function downloadChat() {
    const text = messages
      .map((m) => `[${m.role.toUpperCase()}]\n${m.content}`)
      .join("\n\n---\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cineai-production-plan.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="pt-16 flex flex-col h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-purple-900/20 to-transparent px-4 py-6 border-b border-white/5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black">
              <span className="gradient-text">AI Video Generator</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Powered by Claude — creates scripts, scenes, music direction & full production plans
            </p>
          </div>

          <div className="flex items-center gap-3">
            {messages.length > 0 && (
              <>
                <button
                  onClick={downloadChat}
                  className="p-2 glass-card hover:bg-white/10 transition-colors rounded-xl"
                  title="Download production plan"
                >
                  <Download className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={clearChat}
                  className="p-2 glass-card hover:bg-white/10 transition-colors rounded-xl"
                  title="Clear chat"
                >
                  <RefreshCw className="w-4 h-4 text-gray-400" />
                </button>
              </>
            )}

            {/* Content type selector */}
            <div className="relative">
              <button
                onClick={() => setShowTypeSelect(!showTypeSelect)}
                className="flex items-center gap-2 px-3 py-2 glass-card hover:bg-white/10 transition-colors rounded-xl text-sm text-gray-300"
              >
                <Wand2 className="w-4 h-4 text-purple-400" />
                {contentTypes.find((t) => t.value === selectedType)?.label}
                <ChevronDown className="w-3 h-3" />
              </button>
              {showTypeSelect && (
                <div className="absolute right-0 top-full mt-2 w-44 glass-card rounded-xl overflow-hidden z-10 border border-white/10">
                  {contentTypes.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => {
                        setSelectedType(t.value);
                        setShowTypeSelect(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                        selectedType === t.value
                          ? "bg-purple-600/30 text-purple-300"
                          : "text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mx-auto mb-6 glow-purple">
                <Wand2 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-3">
                Your AI Film Director is Ready
              </h2>
              <p className="text-gray-400 max-w-md mx-auto mb-8">
                Describe your creative vision and I&apos;ll generate complete production plans,
                scripts, scene breakdowns, music direction, and more.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto">
                {quickPrompts.map(({ icon: Icon, text, color }) => (
                  <button
                    key={text}
                    onClick={() => sendMessage(text)}
                    className="glass-card p-4 text-left hover:bg-white/10 hover:glow-purple transition-all duration-200 group text-sm"
                  >
                    <Icon className={`w-5 h-5 ${color} mb-2 group-hover:scale-110 transition-transform`} />
                    <span className="text-gray-300 group-hover:text-white transition-colors leading-snug">
                      {text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0 mt-1 glow-purple">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl px-5 py-4 ${
                  msg.role === "user"
                    ? "bg-purple-600/30 border border-purple-500/30 text-white"
                    : "glass-card text-gray-100"
                }`}
              >
                {msg.role === "assistant" && msg.content === "" && isStreaming ? (
                  <div className="typing-indicator flex items-center gap-1 py-1">
                    <span /><span /><span />
                  </div>
                ) : (
                  <div className="prose prose-invert prose-sm max-w-none">
                    <FormattedContent content={msg.content} />
                  </div>
                )}
              </div>

              {msg.role === "user" && (
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-5 h-5 text-gray-300" />
                </div>
              )}
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-white/5 bg-black/20 backdrop-blur-xl px-4 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your video, show, music video, or movie idea..."
                rows={3}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all resize-none scrollbar-thin text-sm"
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-600">
                Shift+Enter for new line
              </div>
            </div>

            {isStreaming ? (
              <button
                onClick={stopGeneration}
                className="p-4 bg-red-600/30 border border-red-500/30 rounded-2xl hover:bg-red-600/50 transition-all text-red-400"
                title="Stop generation"
              >
                <div className="w-5 h-5 bg-red-400 rounded-sm" />
              </button>
            ) : (
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim()}
                className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed glow-purple hover:scale-105"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
            <Sparkles className="w-3 h-3 text-purple-500" />
            AI uses extended thinking for deeper creative output
          </div>
        </div>
      </div>
    </div>
  );
}

function FormattedContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-xl font-bold text-white mt-6 mb-3 first:mt-0">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-lg font-semibold text-purple-300 mt-4 mb-2">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={i} className="font-bold text-white mb-2">
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith("- ") || line.startsWith("• ")) {
      elements.push(
        <li key={i} className="ml-4 text-gray-300 mb-1 list-disc">
          <InlineMarkdown text={line.slice(2)} />
        </li>
      );
    } else if (line.match(/^\d+\. /)) {
      const num = line.match(/^(\d+)\. /)?.[1];
      elements.push(
        <li key={i} className="ml-4 text-gray-300 mb-1 list-decimal">
          <InlineMarkdown text={line.replace(/^\d+\. /, "")} />
        </li>
      );
    } else if (line.startsWith("# ")) {
      elements.push(
        <h1 key={i} className="text-2xl font-black text-white mt-4 mb-4 gradient-text">
          {line.slice(2)}
        </h1>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(
        <p key={i} className="text-gray-200 mb-2 leading-relaxed">
          <InlineMarkdown text={line} />
        </p>
      );
    }
    i++;
  }

  return <>{elements}</>;
}

function InlineMarkdown({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return <em key={i} className="text-gray-300 italic">{part.slice(1, -1)}</em>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return <code key={i} className="bg-white/10 px-1.5 py-0.5 rounded text-pink-300 font-mono text-xs">{part.slice(1, -1)}</code>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export default function GeneratePage() {
  return (
    <Suspense fallback={
      <div className="pt-16 flex items-center justify-center h-screen">
        <div className="text-gray-400">Loading AI Studio...</div>
      </div>
    }>
      <GenerateContent />
    </Suspense>
  );
}
