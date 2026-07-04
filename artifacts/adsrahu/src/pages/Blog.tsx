import React, { useState, useEffect } from "react";
import { ArrowRight, Clock, Tag, ChevronLeft, Loader2 } from "lucide-react";
import { blogApi, type ApiPost } from "@/lib/api";

const categoryColors: Record<string, string> = {
  "Real Estate": "from-blue-600/20 to-indigo-800/20",
  "Automation": "from-green-600/20 to-teal-800/20",
  "Paid Ads": "from-yellow-600/20 to-orange-800/20",
  "CRM": "from-purple-600/20 to-pink-800/20",
  "Strategy": "from-red-600/20 to-rose-800/20",
  "Case Study": "from-amber-600/20 to-yellow-800/20",
  "General": "from-blue-600/20 to-indigo-800/20",
};

interface DisplayPost {
  id?: number;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  color: string;
  content: string;
  imageUrl?: string;
}

function apiToDisplay(p: ApiPost): DisplayPost {
  return {
    id: p.id,
    category: p.category,
    title: p.title,
    excerpt: p.excerpt,
    date: new Date(p.createdAt).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" }),
    readTime: `${Math.max(1, Math.ceil(p.content.trim().split(/\s+/).length / 200))} min read`,
    color: categoryColors[p.category] ?? "from-blue-600/20 to-indigo-800/20",
    content: p.content,
    imageUrl: p.imageUrl,
  };
}

export default function Blog() {
  const [posts, setPosts] = useState<DisplayPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [openPost, setOpenPost] = useState<DisplayPost | null>(null);

  useEffect(() => {
    blogApi.getAll(true)
      .then(apiPosts => {
        setPosts(apiPosts.map(apiToDisplay));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...Array.from(new Set(posts.map(p => p.category)))];

  const filtered = activeCategory === "All"
    ? posts
    : posts.filter(p => p.category === activeCategory);

  if (openPost) {
    return (
      <div className="min-h-screen pt-20 pb-24 bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10">
          <button
            onClick={() => setOpenPost(null)}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-8 transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Blog
          </button>
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
              <Tag className="w-3 h-3" />{openPost.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />{openPost.readTime}
            </span>
            <span className="text-xs text-gray-600">{openPost.date}</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">{openPost.title}</h1>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed border-l-2 border-blue-500/50 pl-4">{openPost.excerpt}</p>
          
          {openPost.imageUrl && (
            <div className="mb-10 rounded-2xl overflow-hidden border border-white/10 shadow-lg relative aspect-video bg-[#0a0a12]">
              <img src={openPost.imageUrl} alt={openPost.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="prose-content text-gray-300 leading-relaxed space-y-4">
            {openPost.content.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return <h2 key={i} className="text-xl font-bold text-white mt-8 mb-3">{block.replace("## ","")}</h2>;
              }
              if (block.startsWith("### ")) {
                return <h3 key={i} className="text-base font-semibold text-blue-300 mt-5 mb-2">{block.replace("### ","")}</h3>;
              }
              if (block.startsWith("**") && block.endsWith("**")) {
                return <p key={i} className="font-semibold text-white">{block.replace(/\*\*/g,"")}</p>;
              }
              if (block.includes("| ")) {
                const rows = block.split("\n").filter(r => r.includes("|") && !r.match(/^[\|\s\-]+$/));
                return (
                  <div key={i} className="overflow-x-auto my-4">
                    <table className="w-full text-sm border border-white/10 rounded-xl overflow-hidden">
                      {rows.map((row, ri) => {
                        const cells = row.split("|").map(c => c.trim()).filter(Boolean);
                        return (
                          <tr key={ri} className={ri === 0 ? "bg-white/5" : "border-t border-white/5"}>
                            {cells.map((cell, ci) => (
                              ri === 0
                                ? <th key={ci} className="px-4 py-2.5 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">{cell}</th>
                                : <td key={ci} className="px-4 py-2.5 text-gray-400">{cell}</td>
                            ))}
                          </tr>
                        );
                      })}
                    </table>
                  </div>
                );
              }
              const withBold = block.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>');
              return <p key={i} className="text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: withBold }} />;
            })}
          </div>
          <div className="mt-16 p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 text-center">
            <p className="text-white font-semibold mb-2">Ready to implement this for your project?</p>
            <p className="text-gray-400 text-sm mb-4">Book a free 30-minute strategy session with the Adsrahu team.</p>
            <a
              href="/book-a-call"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl btn-premium text-white text-sm font-semibold"
            >
              Book Strategy Call <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Growth Insights</h1>
          <p className="text-lg text-gray-400">
            Strategies, tactics, and case studies on performance marketing, lead generation, and automation.
          </p>
        </div>

        <div className="flex flex-nowrap md:flex-wrap overflow-x-auto snap-x hide-scrollbar gap-3 mb-16 pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 md:justify-center">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap snap-center shrink-0 ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <article
                key={post.id ?? i}
                className="rounded-2xl border border-white/8 bg-[#0a0a12] overflow-hidden flex flex-col hover:border-blue-500/30 transition-all duration-300 group cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)]"
                onClick={() => setOpenPost(post)}
              >
                <div className={`aspect-[16/9] ${!post.imageUrl ? 'bg-gradient-to-br ' + post.color : 'bg-[#0a0a12]'} relative overflow-hidden flex items-end p-4`}>
                  {post.imageUrl ? (
                    <img src={post.imageUrl} alt={post.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDBNIDAgMjAgTCA0MCAyMCBNIDIwIDAgTCAyMCA0ME0gMCAzMCBMIDQwIDMwIE0gMzAgMCBMIDMwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNCkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-60" />
                  )}
                  <span className="relative z-10 inline-flex items-center rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-white border border-white/10">
                    {post.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-xs text-gray-500 mb-3 gap-3">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-3 group-hover:text-blue-300 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto">
                    <span className="text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
