// @ts-nocheck
import { getSql, checkAuth, cors } from "./_lib/db.js";

export const maxDuration = 60; // Allow 60 seconds for AI text generation on Vercel

export const config = {
  api: { bodyParser: { sizeLimit: "10mb" } },
};

const GEMINI_TEXT_MODEL = "gemini-2.5-flash";

// Helper to escape XML special characters for safe SVG rendering
function escapeXml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// ── Self-Generated Infographic Poster Card Generator ─────────────────────
function generateSelfGeneratedPosterCard(
  title: string,
  excerpt: string,
  category: string,
  posterInfo?: {
    theme?: string;
    icon?: string;
    headline?: string;
    subheading?: string;
    keyTakeaways?: string[];
  }
): string {
  const safeTitle = escapeXml(title);
  const safeExcerpt = escapeXml(excerpt);
  const safeCategory = escapeXml(category || "BUSINESS GROWTH");

  const themes = {
    "dark-tech": {
      bgStart: "#080d1a",
      bgEnd: "#0f172a",
      accent1: "#38bdf8",
      accent2: "#2563eb",
      cardBg: "rgba(255, 255, 255, 0.03)",
      cardStroke: "rgba(56, 189, 248, 0.2)",
      gridColor: "rgba(56, 189, 248, 0.04)"
    },
    "emerald-growth": {
      bgStart: "#022c22",
      bgEnd: "#064e3b",
      accent1: "#34d399",
      accent2: "#059669",
      cardBg: "rgba(255, 255, 255, 0.03)",
      cardStroke: "rgba(52, 211, 153, 0.2)",
      gridColor: "rgba(52, 211, 153, 0.04)"
    },
    "neon-purple": {
      bgStart: "#090314",
      bgEnd: "#1c0734",
      accent1: "#c084fc",
      accent2: "#7e22ce",
      cardBg: "rgba(255, 255, 255, 0.03)",
      cardStroke: "rgba(192, 132, 252, 0.2)",
      gridColor: "rgba(192, 132, 252, 0.04)"
    },
    "royal-blue": {
      bgStart: "#03081e",
      bgEnd: "#0b2154",
      accent1: "#00d2ff",
      accent2: "#0066ff",
      cardBg: "rgba(255, 255, 255, 0.03)",
      cardStroke: "rgba(0, 210, 255, 0.2)",
      gridColor: "rgba(0, 210, 255, 0.04)"
    },
    "amber-glow": {
      bgStart: "#1a0c03",
      bgEnd: "#361904",
      accent1: "#fbbf24",
      accent2: "#ea580c",
      cardBg: "rgba(255, 255, 255, 0.03)",
      cardStroke: "rgba(251, 191, 36, 0.2)",
      gridColor: "rgba(251, 191, 36, 0.04)"
    }
  };

  const themeName = posterInfo?.theme || "dark-tech";
  const t = themes[themeName] || themes["dark-tech"];

  const icons = {
    "zap": `<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>`,
    "chart": `<path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M3 20h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
    "trending": `<path d="M23 6l-9.5 9.5-5-5L1 18" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M17 6h6v6" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    "target": `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="2" fill="currentColor"/>`,
    "shield": `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    "layers": `<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    "cpu": `<rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><rect x="9" y="9" width="6" height="6" fill="currentColor"/>`
  };

  const selectedIcon = icons[posterInfo?.icon || "zap"] || icons["zap"];

  const wrapText = (str: string, maxChar: number) => {
    const words = (str || "").split(" ");
    const lines = [];
    let cur = "";
    for (const w of words) {
      if ((cur + " " + w).length > maxChar) {
        lines.push(cur.trim());
        cur = w;
      } else {
        cur += " " + w;
      }
    }
    if (cur) lines.push(cur.trim());
    return lines;
  };

  const displayHeadline = escapeXml(posterInfo?.headline || safeTitle);
  const displaySubheading = escapeXml(posterInfo?.subheading || safeExcerpt);

  const titleLines = wrapText(displayHeadline, 22).slice(0, 3);
  const subLines = wrapText(displaySubheading, 36).slice(0, 2);

  const rawPoints = posterInfo?.keyTakeaways && posterInfo.keyTakeaways.length >= 3
    ? posterInfo.keyTakeaways
    : [
        "1. High-converting growth strategies",
        "2. Automated workflows & data tracking",
        "3. Scalable customer acquisition"
      ];

  const points = rawPoints.slice(0, 3).map(pt => escapeXml(pt));

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
    <defs>
      <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${t.bgStart}"/>
        <stop offset="100%" stop-color="${t.bgEnd}"/>
      </linearGradient>
      <linearGradient id="accent-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${t.accent1}"/>
        <stop offset="100%" stop-color="${t.accent2}"/>
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${t.gridColor}" stroke-width="1"/>
      </pattern>
      <filter id="glow">
        <feGaussianBlur stdDeviation="80" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- Background -->
    <rect width="1200" height="630" fill="url(#bg-grad)"/>
    <rect width="1200" height="630" fill="url(#grid)"/>

    <!-- Decorative blur lighting -->
    <circle cx="180" cy="140" r="180" fill="${t.accent2}" opacity="0.15" filter="url(#glow)"/>
    <circle cx="1020" cy="460" r="220" fill="${t.accent1}" opacity="0.12" filter="url(#glow)"/>

    <!-- Left Column: Title & Header -->
    <g transform="translate(80, 0)">
      <!-- Category Badge -->
      <rect x="0" y="75" width="220" height="36" rx="18" fill="rgba(255, 255, 255, 0.05)" stroke="${t.accent1}" stroke-width="1.2" opacity="0.8"/>
      <text x="110" y="98" fill="${t.accent1}" font-family="system-ui, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5" text-anchor="middle">${safeCategory.toUpperCase()}</text>

      <!-- Main Title -->
      <g transform="translate(0, 145)">
        ${titleLines.map((line, idx) => `<text x="0" y="${idx * 66}" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="50" font-weight="900" letter-spacing="-1">${line}</text>`).join("")}
      </g>

      <!-- Subheading -->
      <g transform="translate(0, ${160 + titleLines.length * 66})">
        ${subLines.map((line, idx) => `<text x="0" y="${idx * 32}" fill="${t.accent1}" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="600" opacity="0.95">${line}</text>`).join("")}
      </g>

      <!-- Icon Badge Frame -->
      <g transform="translate(0, 420)">
        <rect width="80" height="80" rx="24" fill="url(#accent-grad)" opacity="0.15"/>
        <rect width="80" height="80" rx="24" fill="none" stroke="${t.accent1}" stroke-width="2" opacity="0.3"/>
        <g transform="translate(22, 22) scale(1.5)" color="${t.accent1}">
          ${selectedIcon}
        </g>
      </g>
    </g>

    <!-- Right Column: Key Takeaways Card -->
    <g transform="translate(630, 75)">
      <!-- Card Container -->
      <rect width="490" height="470" rx="30" fill="${t.cardBg}" stroke="${t.cardStroke}" stroke-width="2"/>
      
      <!-- Key takeaways header -->
      <text x="45" y="55" fill="${t.accent1}" font-family="system-ui, sans-serif" font-size="15" font-weight="900" letter-spacing="2">KEY TAKEAWAYS</text>
      <line x1="45" y1="75" x2="160" y2="75" stroke="${t.accent1}" stroke-width="3"/>

      <!-- Takeaway Items -->
      ${points.map((pt, idx) => {
        const ptLines = wrapText(pt, 30).slice(0, 2);
        const yOffset = 120 + idx * 110;
        return `<g transform="translate(45, ${yOffset})">
          <circle cx="16" cy="18" r="12" fill="url(#accent-grad)" opacity="0.2"/>
          <circle cx="16" cy="18" r="12" fill="none" stroke="${t.accent1}" stroke-width="2"/>
          <path d="M12 18 l3 3 l5 -5" fill="none" stroke="${t.accent1}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <g transform="translate(45, 0)">
            ${ptLines.map((line, lIdx) => `<text x="0" y="${18 + lIdx * 26}" fill="#f1f5f9" font-family="system-ui, sans-serif" font-size="19" font-weight="600">${line}</text>`).join("")}
          </g>
        </g>`;
      }).join("")}
    </g>

    <!-- Footer -->
    <text x="80" y="580" fill="#ffffff" font-family="system-ui, sans-serif" font-size="24" font-weight="bold" letter-spacing="-0.5">Adsrahu <tspan fill="${t.accent1}">📈</tspan></text>
    
    <g transform="translate(1010, 565)" opacity="0.8">
      <text x="0" y="15" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" letter-spacing="1" text-anchor="end">READ FULL ARTICLE</text>
      <path d="M15 12 l5 5 l-5 5" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(10, 0)"/>
    </g>
  </svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

// ── AI Blog Content & Poster Generation Handler ─────────────────────────
async function generateBlogWithAI(
  topic: string,
  category: string,
  tone: string,
  targetAudience: string,
  keyPoints: string
) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY not configured. Set it in Vercel Environment Variables."
    );
  }

  const prompt = `You are a world-class performance marketing, growth, and content expert writing for "Adsrahu". Adsrahu is a high-growth digital agency and media platform.

Write a highly detailed, professional, and actionable SEO-optimized blog post based on these exact requirements:
Topic: "${topic}"
Category: "${category || "General"}"
Tone of Voice: "${tone || "Professional and authoritative"}"
Target Audience: "${targetAudience || "Business owners, founders, and industry professionals"}"
Key Points to Include: "${keyPoints || "High-value, actionable strategies"}"

CRITICAL INSTRUCTIONS:
1. Adapt fully to the specified Topic, Category, and Target Audience. Do NOT inject unmentioned niches or industries unless specified in the topic!
2. Provide specific, actionable strategies (e.g., mention specific ad strategies, automation flows, analytics, tool integrations relevant to the topic).
3. Avoid generic fluff. Use realistic data points, market trends, and modern digital marketing methodologies.
4. Format the content beautifully in Markdown:
   - Start with an engaging hook.
   - Use 3-5 clearly defined ## headings.
   - Include bullet points, numbered lists, and bold text for readability.
5. End with a strong Call-To-Action (CTA) encouraging the reader to implement these strategies or consult with Adsrahu.
6. Design a sleek 16:9 social poster card for this blog. Choose the most relevant theme and icon, and extract exactly 3 distinct key takeaways from the blog post.`;

  const textResponse = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_TEXT_MODEL}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 4096,
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              title: {
                type: "STRING",
                description: "An SEO-friendly, compelling blog title (50-70 chars)",
              },
              slug: {
                type: "STRING",
                description: "url-friendly-slug-with-hyphens",
              },
              excerpt: {
                type: "STRING",
                description: "A compelling 1-2 sentence summary for the blog card (under 160 chars)",
              },
              content: {
                type: "STRING",
                description: "The full blog body in Markdown format. Use \\n for newlines.",
              },
              poster: {
                type: "OBJECT",
                properties: {
                  theme: {
                    type: "STRING",
                    description: "Theme name for poster card. One of: 'dark-tech', 'emerald-growth', 'neon-purple', 'royal-blue', 'amber-glow'",
                  },
                  icon: {
                    type: "STRING",
                    description: "Icon representing topic. One of: 'zap', 'chart', 'trending', 'target', 'shield', 'layers', 'cpu'",
                  },
                  headline: {
                    type: "STRING",
                    description: "Short punchy headline for the poster (1-4 words max)",
                  },
                  subheading: {
                    type: "STRING",
                    description: "Punchy 1-sentence subtitle explaining the goal",
                  },
                  keyTakeaways: {
                    type: "ARRAY",
                    items: { type: "STRING" },
                    description: "Exactly 3 distinct, highly informative key takeaway points from this blog to feature on the poster card.",
                  },
                },
                required: ["theme", "icon", "headline", "subheading", "keyTakeaways"],
              },
            },
            required: ["title", "slug", "excerpt", "content", "poster"],
          },
        },
      }),
    }
  );

  if (!textResponse.ok) {
    const errBody = await textResponse.text();
    throw new Error(`Gemini API error: ${textResponse.status} - ${errBody}`);
  }

  const data = await textResponse.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("No content generated by Gemini");

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (e1) {
    try {
      const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (match) {
        parsed = JSON.parse(match[1].trim());
      } else {
        const firstBrace = text.indexOf("{");
        const lastBrace = text.lastIndexOf("}");
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
          parsed = JSON.parse(text.substring(firstBrace, lastBrace + 1));
        } else {
          throw new Error("No JSON structure found");
        }
      }
    } catch (e2) {
      throw new Error(
        "Failed to parse Gemini response as JSON. Snippet: " +
          text.substring(0, 150)
      );
    }
  }

  // Generate self-contained high-converting poster card using blog's key takeaways
  const posterSvgUrl = generateSelfGeneratedPosterCard(
    parsed.title,
    parsed.excerpt,
    category,
    parsed.poster
  );

  return {
    title: parsed.title,
    slug: parsed.slug,
    category,
    excerpt: parsed.excerpt,
    content: parsed.content,
    imageUrl: posterSvgUrl,
  };
}

// ── API Router ───────────────────────────────────────────────────────────
export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === "OPTIONS") { res.status(200).end(); return; }

  const sql = getSql();

  if (req.method === "GET") {
    const onlyPublished = req.query?.published === "true";
    const rows = onlyPublished
      ? await sql`SELECT * FROM blog_posts WHERE published = true ORDER BY created_at DESC`
      : await sql`SELECT * FROM blog_posts ORDER BY created_at DESC`;
    res.status(200).json(rows.map(toCamel));
    return;
  }

  if (req.method === "POST") {
    if (!checkAuth(req.headers["authorization"])) { res.status(401).json({ error: "Unauthorized" }); return; }

    // AI Blog Generation
    if (req.query?.action === "generate") {
      let b = req.body ?? {};
      if (typeof b === "string") { try { b = JSON.parse(b); } catch (e) {} }
      const topic = b.topic || b.title || "";
      const category = b.category || "General";
      const tone = b.tone || "";
      const targetAudience = b.targetAudience || "";
      const keyPoints = b.keyPoints || "";

      if (!topic) { res.status(400).json({ error: "topic is required" }); return; }
      try {
        const generated = await generateBlogWithAI(topic, category, tone, targetAudience, keyPoints);
        res.status(200).json(generated);
      } catch (err) {
        res.status(500).json({ error: err.message || "AI generation failed" });
      }
      return;
    }

    // Normal blog creation
    let b = req.body ?? {};
    if (typeof b === "string") {
      try { b = JSON.parse(b); } catch (e) {}
    }
    if (!b.title || !b.slug) { res.status(400).json({ error: "title and slug required" }); return; }
    const rows = await sql`
      INSERT INTO blog_posts (title, slug, category, excerpt, content, published, image_url)
      VALUES (${b.title}, ${b.slug}, ${b.category ?? "General"}, ${b.excerpt ?? ""}, ${b.content ?? ""}, ${b.published ?? false}, ${b.imageUrl ?? null})
      RETURNING *`;
    res.status(201).json(toCamel(rows[0]));
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}

function toCamel(row: any) {
  if (!row) return row;
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    excerpt: row.excerpt,
    content: row.content,
    published: row.published,
    createdAt: row.created_at,
    imageUrl: row.image_url,
  };
}
