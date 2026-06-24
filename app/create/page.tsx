"use client";

import { useState } from "react";
import {
  Film,
  Music,
  Tv,
  BookOpen,
  Clapperboard,
  Video,
  ChevronRight,
  Plus,
  Sparkles,
  Wand2,
  Upload,
  Type,
  Image,
  Mic,
} from "lucide-react";
import Link from "next/link";

const showTypes = [
  {
    id: "reallife",
    label: "Real Life Show",
    icon: Video,
    gradient: "from-green-600 to-emerald-500",
    description: "Documentary-style, vlogs, reality content, lifestyle",
    examples: ["Day in the Life", "Travel Vlog", "Cooking Show", "Talk Show"],
  },
  {
    id: "cartoon",
    label: "Cartoon / Animation",
    icon: Clapperboard,
    gradient: "from-orange-500 to-yellow-500",
    description: "2D, 3D, stop motion, anime-style animations",
    examples: ["Action Adventure", "Comedy Sketch", "Kids Show", "Anime Series"],
  },
  {
    id: "documentary",
    label: "Documentary",
    icon: BookOpen,
    gradient: "from-blue-600 to-cyan-500",
    description: "Informational, educational, nature, historical content",
    examples: ["Nature Doc", "History Deep Dive", "Tech Explainer", "True Crime"],
  },
  {
    id: "music",
    label: "Music Video",
    icon: Music,
    gradient: "from-pink-600 to-rose-500",
    description: "Narrative, performance, abstract, cinematic music videos",
    examples: ["Story-driven", "Concert Style", "Abstract Art", "Lyric Video"],
  },
  {
    id: "internetshow",
    label: "Internet Show",
    icon: Tv,
    gradient: "from-purple-600 to-violet-500",
    description: "Episodic web series, sketch comedy, drama, sci-fi",
    examples: ["Drama Series", "Sci-Fi Show", "Comedy Sketches", "Thriller"],
  },
  {
    id: "movie",
    label: "Short Film / Movie",
    icon: Film,
    gradient: "from-red-600 to-orange-500",
    description: "Short films, feature concepts, cinematic productions",
    examples: ["Action Short", "Romance", "Horror", "Sci-Fi Feature"],
  },
];

const tools = [
  { icon: Type, label: "Script Writer", desc: "AI writes your script" },
  { icon: Image, label: "Scene Designer", desc: "Visual storyboarding" },
  { icon: Mic, label: "Voice Acting", desc: "AI voice generation" },
  { icon: Upload, label: "Asset Upload", desc: "Add your own media" },
];

export default function CreatePage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const selected = showTypes.find((t) => t.id === selectedType);

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-pink-900/20 to-transparent py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black mb-2">
            <span className="gradient-text">Creator Studio</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Build your own internet show — any type, any style, fully AI-powered
          </p>

          {/* Step indicator */}
          <div className="flex items-center gap-3 mt-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step >= s
                      ? "bg-purple-600 text-white"
                      : "bg-white/10 text-gray-500"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`h-px w-12 transition-all ${
                      step > s ? "bg-purple-600" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
            <div className="ml-2 text-sm text-gray-400">
              {step === 1 && "Choose Content Type"}
              {step === 2 && "Project Details"}
              {step === 3 && "Production Tools"}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Step 1: Choose type */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              What do you want to create?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {showTypes.map(({ id, label, icon: Icon, gradient, description, examples }) => (
                <button
                  key={id}
                  onClick={() => {
                    setSelectedType(id);
                    setStep(2);
                  }}
                  className={`glass-card p-6 text-left group hover:bg-white/10 transition-all duration-200 hover:scale-[1.02] ${
                    selectedType === id ? "border-purple-500/50 bg-white/10" : ""
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{label}</h3>
                  <p className="text-gray-400 text-sm mb-3">{description}</p>
                  <div className="flex flex-wrap gap-1">
                    {examples.map((ex) => (
                      <span
                        key={ex}
                        className="text-xs px-2 py-1 bg-white/5 rounded-lg text-gray-500"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 mt-4 text-purple-400 text-sm font-medium group-hover:text-purple-300">
                    Select <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Project details */}
        {step === 2 && selected && (
          <div className="max-w-2xl">
            <button
              onClick={() => setStep(1)}
              className="text-gray-400 hover:text-white text-sm mb-6 flex items-center gap-1 transition-colors"
            >
              ← Back
            </button>
            <div className="flex items-center gap-3 mb-8">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selected.gradient} flex items-center justify-center`}
              >
                <selected.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{selected.label}</h2>
                <p className="text-gray-400 text-sm">{selected.description}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  placeholder={`e.g., "My ${selected.label} Series"`}
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Describe Your Vision
                </label>
                <textarea
                  placeholder={`Tell us about your ${selected.label.toLowerCase()}. What's the premise? Who's the audience? What makes it unique?`}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all resize-none"
                />
              </div>

              <div className="glass-card p-4 border-purple-500/20">
                <div className="flex items-center gap-2 text-purple-400 mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">AI will help you with:</span>
                </div>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>• Script writing and episode planning</li>
                  <li>• Visual style and scene descriptions</li>
                  <li>• Character development and dialogue</li>
                  <li>• Music and sound direction</li>
                </ul>
              </div>

              <button
                onClick={() => setStep(3)}
                disabled={!projectName.trim()}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Wand2 className="w-5 h-5" />
                Continue to Production
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Production tools */}
        {step === 3 && selected && (
          <div>
            <button
              onClick={() => setStep(2)}
              className="text-gray-400 hover:text-white text-sm mb-6 flex items-center gap-1 transition-colors"
            >
              ← Back
            </button>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-1">
                Production Studio:{" "}
                <span className="gradient-text">{projectName}</span>
              </h2>
              <p className="text-gray-400">
                Use the tools below, or let AI generate everything for you
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {tools.map(({ icon: Icon, label, desc }) => (
                <button
                  key={label}
                  className="glass-card p-5 text-left hover:bg-white/10 hover:glow-purple transition-all duration-200 group"
                >
                  <Icon className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
                  <div className="font-semibold text-sm">{label}</div>
                  <div className="text-gray-500 text-xs mt-1">{desc}</div>
                  <div className="flex items-center gap-1 mt-3 text-xs text-purple-400">
                    <Plus className="w-3 h-3" />
                    Open tool
                  </div>
                </button>
              ))}
            </div>

            <div className="glass-card p-6 border-purple-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-600/30 flex items-center justify-center">
                  <Wand2 className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold">Let AI Generate Everything</h3>
                  <p className="text-gray-400 text-sm">
                    Based on your description, AI will create a complete production plan
                  </p>
                </div>
              </div>
              <Link
                href={`/generate?type=${selected.id}&name=${encodeURIComponent(projectName)}&desc=${encodeURIComponent(projectDescription)}`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:from-purple-500 hover:to-pink-500 transition-all"
              >
                <Sparkles className="w-5 h-5" />
                Generate with AI Assistant
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
