import Link from "next/link";
import { Film, Tv, Wand2, PlusSquare, Music, Video, BookOpen, Clapperboard, Sparkles, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Tv,
    title: "Internet Viewing Station",
    description: "Watch AI-generated movies, shows, music videos, documentaries, and cartoons in a stunning theater experience.",
    href: "/watch",
    gradient: "from-blue-600 to-cyan-500",
    glow: "glow-cyan",
  },
  {
    icon: PlusSquare,
    title: "Creator Studio",
    description: "Build your own internet shows — real life, cartoons, documentaries, music videos, and more. Your vision, our AI.",
    href: "/create",
    gradient: "from-pink-600 to-rose-500",
    glow: "glow-pink",
  },
  {
    icon: Wand2,
    title: "AI Video Generator",
    description: "Let our AI assistant piece together the longest generated videos, craft music videos, and produce entire internet shows.",
    href: "/generate",
    gradient: "from-purple-600 to-violet-500",
    glow: "glow-purple",
  },
];

const contentTypes = [
  { icon: Film, label: "Movies", color: "text-yellow-400" },
  { icon: Music, label: "Music Videos", color: "text-pink-400" },
  { icon: Tv, label: "Internet Shows", color: "text-blue-400" },
  { icon: BookOpen, label: "Documentaries", color: "text-green-400" },
  { icon: Clapperboard, label: "Cartoons", color: "text-orange-400" },
  { icon: Video, label: "Real Life", color: "text-cyan-400" },
];

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl animate-spin-slow" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-300 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Powered by Claude AI
          </div>

          <h1 className="text-5xl sm:text-7xl font-black mb-6 leading-tight">
            <span className="gradient-text">Create.</span>{" "}
            <span className="text-white">Watch.</span>{" "}
            <span className="gradient-text">Inspire.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            The ultimate AI-powered studio for creating and watching{" "}
            <span className="text-purple-400 font-semibold">movies</span>,{" "}
            <span className="text-pink-400 font-semibold">music videos</span>,{" "}
            <span className="text-cyan-400 font-semibold">internet shows</span>,{" "}
            and more.
          </p>

          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Our AI assistant pieces together the longest generated videos, crafts entire
            show episodes, and brings your creative vision to life — no experience required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/generate"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-bold text-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-200 glow-purple hover:scale-105"
            >
              <Wand2 className="w-5 h-5" />
              Start Creating with AI
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/watch"
              className="flex items-center justify-center gap-2 px-8 py-4 glass-card font-bold text-lg hover:bg-white/10 transition-all duration-200 hover:scale-105"
            >
              <Tv className="w-5 h-5" />
              Watch Content
            </Link>
          </div>

          {/* Content type pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-12">
            {contentTypes.map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 glass-card text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all cursor-default"
              >
                <Icon className={`w-4 h-4 ${color}`} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">
              Everything You Need to{" "}
              <span className="gradient-text">Create & Watch</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From concept to screen — our AI-powered platform handles the entire
              creative journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description, href, gradient, glow }) => (
              <Link
                key={href}
                href={href}
                className={`group glass-card p-8 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:${glow}`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-gray-400 leading-relaxed">{description}</p>
                <div className="flex items-center gap-2 mt-6 text-sm font-medium text-purple-400 group-hover:text-purple-300">
                  Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "∞", label: "Content Types" },
              { value: "AI", label: "Powered" },
              { value: "4K", label: "Quality" },
              { value: "24/7", label: "Available" },
            ].map(({ value, label }) => (
              <div key={label} className="space-y-1">
                <div className="text-4xl font-black gradient-text">{value}</div>
                <div className="text-gray-400 text-sm font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
