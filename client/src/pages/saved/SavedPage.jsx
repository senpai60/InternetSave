import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useItem } from "../../context/ItemContext";

const dummySavedItems = [
  {
    id: 1,
    title: "Understanding Modern Web Architecture",
    description:
      "A deep dive into server-side vs client-side rendering with practical examples from real-world projects.",
    type: "article",
    url: "https://example.com/modern-web",
    createdAt: "2026-03-24T10:00:00Z",
    tags: ["Development", "Next.js"],
  },
  {
    id: 2,
    content:
      "The best way to animate text in React is using framer-motion or GSAP with ScrollTrigger for more complex layouts.",
    type: "snippet",
    url: "https://frontend-tricks.dev/animations",
    createdAt: "2026-03-25T14:30:00Z",
    tagName: "P",
    tags: ["Animations", "React"],
  },
  {
    id: 3,
    title: "UI Design Inspiration for 2026",
    description:
      "Trending bento layouts and glassmorphism effects for building high-end interfaces.",
    type: "article",
    url: "https://designplus.io/trends-2026",
    createdAt: "2026-03-25T08:15:00Z",
    tags: ["UI/UX", "Design"],
  },
  {
    id: 4,
    content: "npx create-next-app@latest ./ --typescript --tailwind --eslint",
    type: "snippet",
    url: "https://nextjs.org/docs/getting-started",
    createdAt: "2026-03-25T16:45:00Z",
    tagName: "CODE",
    tags: ["CLI", "Setup"],
  },
  {
    id: 5,
    title: "10 CSS Tricks You Didn't Know About",
    description:
      "Exploring container queries, :has selectors, and new color spaces in 2026.",
    type: "article",
    url: "https://css-mastery.com/tricks",
    createdAt: "2026-03-25T20:10:00Z",
    tags: ["CSS", "Frontend"],
  },
];

const SavedPage = () => {
  const { savedItems, getSavedItems } = useItem();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getSavedItems();
  }, []);

  const filteredItems =
    filter === "all"
      ? savedItems
      : savedItems.filter((item) =>
          filter === "articles"
            ? item.type === "article"
            : item.type === "snippet",
        );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400">
          Saved Items
        </h1>
        <p className="text-zinc-400 text-lg">
          Your curated collection of links, snippets, and inspiration.
        </p>
      </header>

      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-zinc-900">
        <div className="flex items-center gap-2 bg-zinc-900/50 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === "all" ? "bg-zinc-100 text-zinc-950 shadow-lg" : "text-zinc-400 hover:text-zinc-200"}`}
          >
            All Items
          </button>
          <button
            onClick={() => setFilter("articles")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === "articles" ? "bg-zinc-100 text-zinc-950 shadow-lg" : "text-zinc-400 hover:text-zinc-200"}`}
          >
            Articles
          </button>
          <button
            onClick={() => setFilter("snippets")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === "snippets" ? "bg-zinc-100 text-zinc-950 shadow-lg" : "text-zinc-400 hover:text-zinc-200"}`}
          >
            Snippets
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search library..."
              className="bg-zinc-900 border border-zinc-800 text-zinc-200 px-4 py-2 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all w-full md:w-64"
            />
            <svg
              className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500 group-focus-within:text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <SavedItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const SavedItemCard = ({ item }) => {
  const isArticle = item.type === "article";

  return (
    <div className="group relative bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/60 hover:border-zinc-700 p-6 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-zinc-950/50 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${isArticle ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" : "bg-cyan-500/10 text-cyan-500 border border-cyan-500/20"}`}
          >
            {isArticle ? "Article" : `Snippet • ${item.tagName}`}
          </span>
          <span className="text-zinc-600 text-[11px] font-medium">
            {new Date(item.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        {isArticle ? (
          <>
            <h3 className="text-xl font-bold text-zinc-100 group-hover:text-zinc-50 leading-snug mb-3 line-clamp-2">
              {item.title}
            </h3>
            <p className="text-zinc-400 text-sm line-clamp-3 mb-6 leading-relaxed">
              {item.description}
            </p>
          </>
        ) : (
          <div className="bg-zinc-950/50 border border-zinc-800 rounded-lg p-4 mb-6 font-mono text-xs leading-relaxed text-zinc-300 group-hover:text-zinc-200 transition-colors">
            <span className="text-zinc-600 mr-2 selection:bg-zinc-800">“</span>
            {item.content ? item.content : item.title}
            <span className="text-zinc-600 ml-1">”</span>
          </div>
        )}
      </div>

      <div>
        <div className="flex flex-wrap gap-2 mb-6">
          {item.tags?.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium text-zinc-500 bg-zinc-800/30 px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-100 text-xs font-medium flex items-center gap-1.5 transition-colors truncate max-w-[150px]"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            {new URL(item.url).hostname}
          </a>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 text-zinc-500 hover:text-zinc-100 rounded-lg hover:bg-zinc-800 transition-all">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </button>
            <button className="p-2 text-zinc-500 hover:text-red-400 rounded-lg hover:bg-zinc-800 transition-all">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedPage;
