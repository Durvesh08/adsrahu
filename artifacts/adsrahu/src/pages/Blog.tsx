import React from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    category: "Real Estate",
    title: "How to Generate 100+ Qualified Real Estate Leads per Month",
    excerpt: "Stop relying on portals. Build your own lead generation engine using Facebook Ads and dedicated landing pages.",
    date: "Oct 12, 2023",
    readTime: "5 min read"
  },
  {
    category: "Automation",
    title: "The Ultimate WhatsApp Automation Funnel for Realtors",
    excerpt: "How to use WhatsApp API to automatically send brochures, answer FAQs, and qualify leads 24/7.",
    date: "Oct 05, 2023",
    readTime: "8 min read"
  },
  {
    category: "Paid Ads",
    title: "Google Ads vs Facebook Ads for Property Developers",
    excerpt: "A data-driven breakdown of where you should allocate your marketing budget for maximum ROI.",
    date: "Sep 28, 2023",
    readTime: "6 min read"
  },
  {
    category: "CRM",
    title: "Why Your Sales Team is Losing 80% of Leads",
    excerpt: "The gap between lead generation and sales conversion, and how a proper CRM setup fixes it.",
    date: "Sep 15, 2023",
    readTime: "7 min read"
  },
  {
    category: "Strategy",
    title: "Cost Per Lead is a Vanity Metric. Track This Instead.",
    excerpt: "Why optimizing for cheap leads will ruin your real estate business, and how to track cost per acquisition.",
    date: "Sep 02, 2023",
    readTime: "4 min read"
  },
  {
    category: "Case Study",
    title: "Scaling a Luxury Villa Project in Dubai using Performance Marketing",
    excerpt: "The exact funnel, ad creatives, and follow-up sequence we used to sell out a premium development.",
    date: "Aug 20, 2023",
    readTime: "10 min read"
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen pt-20 pb-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Growth Insights</h1>
          <p className="text-lg text-gray-400">
            Strategies, tactics, and case studies on performance marketing, lead generation, and automation.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {["All", "Real Estate", "Paid Ads", "Automation", "CRM", "Strategy"].map((cat, i) => (
            <button 
              key={i}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${i === 0 ? 'bg-primary text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <article key={i} className="rounded-xl border border-white/10 bg-[#0d0d14] overflow-hidden flex flex-col hover:border-primary/30 transition-colors group">
              <div className="aspect-[16/9] bg-[#1a1a24] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-black/80 mix-blend-overlay group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-white border border-white/10">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-xs text-gray-500 mb-3 gap-4">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 flex-grow">
                  {post.excerpt}
                </p>
                <div className="mt-auto">
                  <button className="text-primary text-sm font-medium flex items-center group-hover:text-white transition-colors">
                    Read Article <ArrowRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
