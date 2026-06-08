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
  };
}

const seedPosts: DisplayPost[] = [
  {
    category: "Real Estate",
    title: "How to Generate 100+ Qualified Real Estate Leads per Month",
    excerpt: "Stop relying on portals. Build your own lead generation engine using Facebook Ads and dedicated landing pages.",
    date: "May 12, 2026",
    readTime: "5 min read",
    color: "from-blue-600/20 to-indigo-800/20",
    content: `## The Real Estate Lead Crisis

Most real estate developers waste crores on property portals that deliver cold, unqualified leads. The buyers are there — but the system is broken.

**The solution:** Build your own lead generation engine.

## The 3-Layer Funnel

### Layer 1: Awareness (Facebook/Instagram Ads)
Run scroll-stopping video ads targeting:
- Age: 28–55
- Income: ₹15L+ annually
- Interests: Real estate investment, interior design, luxury living
- Location: Tier-1 and NRI hotspots

Budget: ₹30,000–₹80,000/month is enough to generate 100+ leads.

### Layer 2: Capture (Dedicated Landing Page)
Not your main website — a single-purpose page with:
- One compelling headline ("3BHK in Pune from ₹65 Lakhs — Only 8 Units Left")
- Project walkthrough video
- A form with just 3 fields: Name, Phone, City

### Layer 3: Nurture (WhatsApp Automation)
The moment a lead is captured:
1. Instantly send brochure via WhatsApp
2. Follow up at 2 hours, 24 hours, 72 hours
3. Share testimonials, site photos, floor plans
4. Book site visits automatically

## Results You Can Expect

With this system properly set up:
- **Cost Per Lead:** ₹23–₹80 (vs ₹800–₹2,000 on portals)
- **Site Visit Rate:** 15–25% of leads
- **Conversion:** 3–7% of site visits close

## Getting Started

Start with a ₹50,000 test budget. One landing page. One ad set. Measure for 14 days. Optimize. Scale what works.`,
  },
  {
    category: "Automation",
    title: "The Ultimate WhatsApp Automation Funnel for Realtors",
    excerpt: "How to use WhatsApp API to automatically send brochures, answer FAQs, and qualify leads 24/7.",
    date: "May 05, 2026",
    readTime: "8 min read",
    color: "from-green-600/20 to-teal-800/20",
    content: `## Why WhatsApp is the #1 Channel for Indian Real Estate

With 500M+ users in India and 98% open rates, WhatsApp isn't just a messaging app — it's your best sales channel.

## The 5-Message Automation Sequence

**Message 1 (Instant — within 60 seconds of form fill):**
"Hi [Name]! Thanks for your interest in [Project]. I'm sharing the exclusive brochure now 👇"
→ Attach PDF brochure

**Message 2 (2 hours later):**
"[Name], just checking if you received the brochure. Our project has only 12 units left — would you like to schedule a site visit this weekend?"

**Message 3 (Day 2):**
Share a 30-second walkthrough video or testimonial

**Message 4 (Day 4):**
"Many of our buyers are NRIs and investors from [their city]. Here's what they said after visiting..."

**Message 5 (Day 7):**
Final push — limited inventory alert or upcoming price revision

## Setting It Up

Use WhatsApp Business API through providers like:
- Interakt
- AiSensy  
- Wati

Cost: ₹2,000–₹8,000/month. ROI on a single closed deal: ₹50,000+.

## The Results

Our clients using WhatsApp automation see:
- **3x higher engagement** vs cold calling
- **68% open rate** on follow-up messages
- **Site visit bookings up 40%**`,
  },
  {
    category: "Paid Ads",
    title: "Google Ads vs Facebook Ads for Property Developers",
    excerpt: "A data-driven breakdown of where you should allocate your marketing budget for maximum ROI.",
    date: "Apr 28, 2026",
    readTime: "6 min read",
    color: "from-yellow-600/20 to-orange-800/20",
    content: `## The Question Every Developer Asks

"Should I run Google Ads or Facebook Ads?"

The real answer: **both, but for different purposes.**

## Facebook Ads: Create Demand

Facebook/Instagram is for **demand generation**. Your buyers aren't actively searching — you're putting your project in front of them.

**Best for:**
- Brand new launches
- Emotional storytelling (lifestyle, family, status)
- NRI and investor targeting
- Remarketing to website visitors

**Average CPL:** ₹15–₹80

## Google Ads: Capture Demand

Search ads capture buyers who are **actively looking** for properties right now.

**Best for:**
- Location-specific searches ("3BHK Baner Pune")
- High-intent buyers
- Luxury projects (Search + Display)

**Average CPL:** ₹200–₹600 (but higher quality)

## The Ideal Split

For a ₹1,00,000 monthly budget:
- **₹70,000 → Facebook/Instagram** (volume, awareness)
- **₹30,000 → Google Search** (high-intent capture)

## Tracking What Matters

Don't optimize for cheapest lead. Optimize for:
- Cost Per Site Visit
- Cost Per Booking
- Return on Ad Spend (ROAS)

A ₹600 Google lead that closes is worth 10x a ₹50 Facebook lead that ghosts.`,
  },
  {
    category: "CRM",
    title: "Why Your Sales Team is Losing 80% of Leads",
    excerpt: "The gap between lead generation and sales conversion, and how a proper CRM setup fixes it.",
    date: "Apr 15, 2026",
    readTime: "7 min read",
    color: "from-purple-600/20 to-pink-800/20",
    content: `## The Invisible Leak in Your Sales Pipeline

You're generating leads. Your ads are working. But deals aren't closing. Where are the leads going?

Industry data shows **80% of leads are never followed up with more than once.** That's where your money is disappearing.

## The 5 CRM Mistakes Real Estate Teams Make

### 1. No Lead Assignment
Leads coming in from multiple channels with no clear owner. Result: confusion, duplicate calls, missed follow-ups.

### 2. Manual Follow-ups Only
Relying on salespeople to remember to call is a losing strategy. Automate the first 3 touchpoints.

### 3. No Lead Scoring
Treating a hot lead (NRI investor, visited 3 times) the same as a cold one wastes your team's time.

### 4. Slow Response Time
Data shows: **Leads contacted within 5 minutes are 100x more likely to convert** than those contacted after 30 minutes.

### 5. No Pipeline Visibility
If your sales head can't see where every lead is in 30 seconds, your system is broken.

## The CRM Stack We Recommend

- **Kylas** or **LeadSquared** for real estate CRM
- **Interakt/AiSensy** for WhatsApp automation
- **Google Sheets** for NRI teams (simple, accessible anywhere)

## The Result After CRM Implementation

Our clients who implement proper CRM see:
- **Response time drops from 4 hours → 4 minutes**
- **Follow-up rate jumps from 20% → 95%**
- **Conversion improves by 2–4x**`,
  },
  {
    category: "Strategy",
    title: "Cost Per Lead is a Vanity Metric. Track This Instead.",
    excerpt: "Why optimizing for cheap leads will ruin your real estate business, and how to track cost per acquisition.",
    date: "Apr 02, 2026",
    readTime: "4 min read",
    color: "from-red-600/20 to-rose-800/20",
    content: `## The CPL Trap

Everyone obsesses over Cost Per Lead. "We need leads under ₹50!" 

Here's the problem: cheap leads are usually terrible leads.

## What Actually Matters

**Cost Per Acquisition (CPA)** — how much did it cost to actually close one booking?

If your CPL is ₹30 but only 1 in 300 leads converts:
- CPA = ₹30 × 300 = **₹9,000 per booking**

If your CPL is ₹300 but 1 in 20 converts:
- CPA = ₹300 × 20 = **₹6,000 per booking**

The "expensive" lead channel is actually 33% cheaper.

## The 4 Metrics That Matter

1. **Cost Per Qualified Lead** — leads who actually pick up the phone
2. **Cost Per Site Visit** — leads who show up in person
3. **Cost Per Booking** — signed agreements
4. **Return on Ad Spend (ROAS)** — revenue generated per rupee spent

## Building Your Tracking Dashboard

Use UTM parameters on every ad → track in Google Analytics → feed into your CRM → calculate CPA by channel.

Takes 2 hours to set up. Saves lakhs in wasted ad spend every month.

## The Mindset Shift

Stop asking "how do I get cheaper leads?" Start asking "how do I close a higher % of the leads I have?"

**A 2x improvement in conversion rate is worth more than a 50% reduction in CPL.**`,
  },
  {
    category: "Case Study",
    title: "Scaling a Luxury Villa Project in Dubai using Performance Marketing",
    excerpt: "The exact funnel, ad creatives, and follow-up sequence we used to sell out a premium development.",
    date: "Mar 20, 2026",
    readTime: "10 min read",
    color: "from-amber-600/20 to-yellow-800/20",
    content: `## The Brief

A luxury villa developer in Dubai approached us with a problem: they had a ₹3 crore annual marketing budget, 90% going to property expos and portals, and were only closing 2–3 units per quarter.

**Goal:** Generate 500+ qualified NRI leads in 90 days, close 10 units.

## The Strategy

### Phase 1: Audience Research (Week 1–2)
We interviewed 20 existing buyers to understand:
- What triggered their decision to buy in Dubai
- What channels influenced them (surprisingly: Instagram and YouTube, not portals)
- Their objections (visa, payment plan, rental yield)

### Phase 2: Creative Development (Week 2–3)
We created 3 creative angles:

**Angle A:** Lifestyle — "Your morning in Dubai looks like this" (pool, skyline, sunrise)
**Angle B:** ROI — "8.5% rental yield. Tax-free. Full ownership." 
**Angle C:** Social proof — Testimonials from Indian buyers already living in Dubai

### Phase 3: Paid Media Launch (Week 3–12)
**Facebook/Instagram:** ₹12L/month targeting NRIs in UK, USA, Canada, Singapore, and HNIs in Mumbai, Delhi, Bangalore

**YouTube:** 15-second bumper ads + 2-minute documentary-style project tour

**Google Search:** "luxury villas Dubai," "invest in Dubai property," "Dubai property for NRI"

### Phase 4: WhatsApp Funnel
Every lead entered a 14-day WhatsApp sequence with:
- Brochure + payment plan PDF (Day 0)
- Drone footage of project (Day 2)
- Rental yield calculator (Day 4)
- Video call invitation (Day 7)
- Exclusive preview event invite (Day 10)

## The Results (90 Days)

| Metric | Target | Actual |
|--------|--------|--------|
| Leads Generated | 500 | 847 |
| CPL | ₹1,200 | ₹730 |
| Site Visits (Video Calls) | 80 | 134 |
| Bookings | 10 | 17 |
| Revenue | ₹42 Cr | ₹72 Cr |

**Total ad spend:** ₹36 Lakhs
**Revenue generated:** ₹72 Crores
**ROAS: 200x**`,
  },
];

export default function Blog() {
  const [posts, setPosts] = useState<DisplayPost[]>(seedPosts);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [openPost, setOpenPost] = useState<DisplayPost | null>(null);

  useEffect(() => {
    blogApi.getAll(true)
      .then(apiPosts => {
        if (apiPosts.length > 0) {
          setPosts(apiPosts.map(apiToDisplay));
        }
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

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
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
                <div className={`aspect-[16/9] bg-gradient-to-br ${post.color} relative overflow-hidden flex items-end p-4`}>
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDBNIDAgMjAgTCA0MCAyMCBNIDIwIDAgTCAyMCA0ME0gMCAzMCBMIDQwIDMwIE0gMzAgMCBMIDMwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNCkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-60" />
                  <span className="relative inline-flex items-center rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-white border border-white/10">
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
