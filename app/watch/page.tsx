"use client";

import { useState } from "react";
import { Play, Film, Music, Tv, BookOpen, Clapperboard, Video, Star, Clock, Eye, Search } from "lucide-react";

const categories = [
  { id: "all", label: "All Content", icon: Film },
  { id: "shows", label: "Internet Shows", icon: Tv },
  { id: "music", label: "Music Videos", icon: Music },
  { id: "documentaries", label: "Documentaries", icon: BookOpen },
  { id: "cartoons", label: "Cartoons", icon: Clapperboard },
  { id: "reallife", label: "Real Life", icon: Video },
];

const mockContent = [
  {
    id: 1,
    title: "Neon Dreams: Episode 1",
    type: "shows",
    duration: "24:35",
    views: "142K",
    rating: 4.8,
    thumbnail: "linear-gradient(135deg, #7c3aed, #ec4899)",
    description: "A cyberpunk internet show set in 2087",
    badge: "NEW",
  },
  {
    id: 2,
    title: "Echoes in the Dark",
    type: "music",
    duration: "4:12",
    views: "891K",
    rating: 4.9,
    thumbnail: "linear-gradient(135deg, #ec4899, #f59e0b)",
    description: "AI-generated music video with stunning visuals",
    badge: "TRENDING",
  },
  {
    id: 3,
    title: "Ocean Mysteries: Deep Dive",
    type: "documentaries",
    duration: "48:20",
    views: "67K",
    rating: 4.7,
    thumbnail: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    description: "Exploring the unexplored depths of our oceans",
    badge: null,
  },
  {
    id: 4,
    title: "Pixel Pals: Season 2",
    type: "cartoons",
    duration: "11:45",
    views: "2.3M",
    rating: 4.9,
    thumbnail: "linear-gradient(135deg, #f59e0b, #ef4444)",
    description: "The beloved animated series returns!",
    badge: "POPULAR",
  },
  {
    id: 5,
    title: "Street Chronicles",
    type: "reallife",
    duration: "18:30",
    views: "445K",
    rating: 4.6,
    thumbnail: "linear-gradient(135deg, #10b981, #06b6d4)",
    description: "Real life stories from around the world",
    badge: null,
  },
  {
    id: 6,
    title: "Midnight Frequencies",
    type: "music",
    duration: "3:58",
    views: "1.2M",
    rating: 4.8,
    thumbnail: "linear-gradient(135deg, #7c3aed, #06b6d4)",
    description: "Lo-fi beats meets AI cinematography",
    badge: "TRENDING",
  },
  {
    id: 7,
    title: "The Digital Frontier",
    type: "documentaries",
    duration: "52:10",
    views: "89K",
    rating: 4.7,
    thumbnail: "linear-gradient(135deg, #3b82f6, #7c3aed)",
    description: "How AI is reshaping our world",
    badge: null,
  },
  {
    id: 8,
    title: "Cosmic Rangers: S1 E3",
    type: "cartoons",
    duration: "22:15",
    views: "567K",
    rating: 4.8,
    thumbnail: "linear-gradient(135deg, #ec4899, #7c3aed)",
    description: "Adventures across the galaxy",
    badge: "NEW",
  },
  {
    id: 9,
    title: "City Lights: The Series",
    type: "shows",
    duration: "31:40",
    views: "234K",
    rating: 4.5,
    thumbnail: "linear-gradient(135deg, #f59e0b, #ec4899)",
    description: "Urban drama in a city that never sleeps",
    badge: null,
  },
];

export default function WatchPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<typeof mockContent[0] | null>(null);

  const filtered = mockContent.filter((c) => {
    const matchesCategory = activeCategory === "all" || c.type === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-purple-900/20 to-transparent py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black mb-2">
            <span className="gradient-text">Viewing Station</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Watch AI-generated content from creators around the world
          </p>

          {/* Search */}
          <div className="relative mt-6 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto scrollbar-thin py-4 mb-8">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeCategory === id
                  ? "bg-purple-600 text-white shadow-lg glow-purple"
                  : "glass-card text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Video Player Modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="w-full max-w-4xl glass-card overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-full aspect-video flex items-center justify-center relative"
                style={{ background: selectedVideo.thumbnail }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="w-20 h-20 mx-auto mb-4 opacity-80" />
                    <p className="text-lg font-semibold opacity-80">
                      AI Video Player
                    </p>
                    <p className="text-sm opacity-50 mt-1">
                      Connect your video source to enable playback
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="progress-bar w-full" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedVideo.title}</h2>
                    <p className="text-gray-400 mt-1">{selectedVideo.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="text-gray-400 hover:text-white text-2xl font-bold ml-4"
                  >
                    ×
                  </button>
                </div>
                <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {selectedVideo.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedVideo.duration}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-yellow-400" />
                    {selectedVideo.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedVideo(item)}
              className="glass-card overflow-hidden group text-left hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:glow-purple"
            >
              {/* Thumbnail */}
              <div
                className="w-full aspect-video flex items-center justify-center relative video-thumbnail"
                style={{ background: item.thumbnail }}
              >
                {item.badge && (
                  <span className="absolute top-3 left-3 px-2 py-1 bg-purple-600 text-xs font-bold rounded-lg z-10">
                    {item.badge}
                  </span>
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded-lg text-xs font-medium z-10">
                  {item.duration}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {item.views}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-3 h-3 fill-yellow-400" />
                    {item.rating}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <Film className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg">No content found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  );
}
