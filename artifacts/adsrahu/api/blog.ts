// @ts-nocheck
import { getSql, checkAuth, cors } from "./_lib/db.js";

export const config = {
  api: { bodyParser: { sizeLimit: "4mb" } },
};

const GEMINI_MODEL = "gemini-2.5-flash";

function generatePosterSvg(title: string, subheading: string, category: string, themeName: string, iconType: string, points: string[]) {
  const themes = {
    "dark-tech": {
      bgStart: "#090d16",
      bgEnd: "#111827",
      accent1: "#38bdf8",
      accent2: "#2563eb",
      cardBg: "rgba(255, 255, 255, 0.02)",
      cardStroke: "rgba(56, 189, 248, 0.15)",
      gridColor: "rgba(56, 189, 248, 0.04)"
    },
    "vibrant-marketing": {
      bgStart: "#110c1a",
      bgEnd: "#1a0f2e",
      accent1: "#ec4899",
      accent2: "#f97316",
      cardBg: "rgba(255, 255, 255, 0.02)",
      cardStroke: "rgba(236, 72, 153, 0.15)",
      gridColor: "rgba(236, 72, 153, 0.04)"
    },
    "neon-purple": {
      bgStart: "#060212",
      bgEnd: "#1c0734",
      accent1: "#c084fc",
      accent2: "#6366f1",
      cardBg: "rgba(255, 255, 255, 0.02)",
      cardStroke: "rgba(192, 132, 252, 0.15)",
      gridColor: "rgba(192, 132, 252, 0.04)"
    },
    "emerald-growth": {
      bgStart: "#022c22",
      bgEnd: "#064e3b",
      accent1: "#4ade80",
      accent2: "#0f766e",
      cardBg: "rgba(255, 255, 255, 0.02)",
      cardStroke: "rgba(74, 222, 128, 0.15)",
      gridColor: "rgba(74, 222, 128, 0.04)"
    },
    "royal-blue": {
      bgStart: "#03081e",
      bgEnd: "#0b2154",
      accent1: "#00d2ff",
      accent2: "#0066ff",
      cardBg: "rgba(255, 255, 255, 0.02)",
      cardStroke: "rgba(0, 210, 255, 0.15)",
      gridColor: "rgba(0, 210, 255, 0.04)"
    }
  };

  const t = themes[themeName] || themes["dark-tech"];

  const icons = {
    "whatsapp": `<path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.459 3.475 1.332 4.991L2 22l5.161-1.355a9.92 9.92 0 004.851 1.258c5.506 0 9.988-4.482 9.988-9.988S17.518 2 12.012 2zm0 18.293a8.275 8.275 0 01-4.223-1.157l-.303-.18-3.137.823.837-3.057-.197-.314a8.28 8.28 0 01-1.27-4.42c0-4.57 3.719-8.289 8.293-8.289s8.293 3.719 8.293 8.289-3.719 8.289-8.293 8.289zm4.55-6.222c-.25-.125-1.477-.73-1.705-.812-.228-.083-.393-.125-.56.125-.166.25-.644.812-.79 1-.144.167-.291.187-.541.062-.25-.125-1.05-.388-2.003-1.237-.741-.662-1.242-1.48-1.387-1.73-.146-.25-.015-.385.11-.51.112-.112.25-.291.375-.437.125-.145.166-.25.25-.417.083-.166.042-.312-.02-.437-.063-.125-.56-1.354-.77-1.854-.2-.49-.404-.427-.56-.437h-.478c-.167 0-.438.063-.667.312-.23.25-.875.854-.875 2.083s.896 2.417 1.02 2.583c.125.167 1.763 2.693 4.272 3.778.597.258 1.063.412 1.427.527.6.19 1.147.163 1.579.099.482-.072 1.477-.604 1.685-1.166.208-.562.208-1.042.146-1.146-.062-.104-.229-.166-.479-.291z" fill="currentColor"/>`,
    "target": `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="2" fill="currentColor"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
    "trending": `<path d="M23 6l-9.5 9.5-5-5L1 18" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M17 6h6v6" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    "zap": `<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>`,
    "shield": `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    "layers": `<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    "chart": `<path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M3 20h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`
  };

  const selectedIcon = icons[iconType] || icons["zap"];

  const wrapText = (str: string, max: number) => {
    const words = str.split(" ");
    const lines = [];
    let cur = "";
    for (const w of words) {
      if ((cur + " " + w).length > max) {
        lines.push(cur.trim());
        cur = w;
      } else {
        cur += " " + w;
      }
    }
    if (cur) lines.push(cur.trim());
    return lines;
  };

  const titleLines = wrapText(title, 20).slice(0, 3);
  const subLines = wrapText(subheading, 38).slice(0, 2);

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
        <feGaussianBlur stdDeviation="90" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- Background -->
    <rect width="1200" height="630" fill="url(#bg-grad)"/>
    <rect width="1200" height="630" fill="url(#grid)"/>

    <!-- Decorative blur shapes -->
    <circle cx="200" cy="150" r="180" fill="${t.accent2}" opacity="0.15" filter="url(#glow)"/>
    <circle cx="1000" cy="450" r="220" fill="${t.accent1}" opacity="0.10" filter="url(#glow)"/>

    <!-- Left Column -->
    <g transform="translate(80, 0)">
      <!-- Category Badge -->
      <rect x="0" y="80" width="220" height="36" rx="18" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.1)"/>
      <text x="110" y="103" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" letter-spacing="1" text-anchor="middle">${category.toUpperCase()}</text>

      <!-- Main Title -->
      <g transform="translate(0, 150)">
        ${titleLines.map((line, idx) => `<text x="0" y="${idx * 70}" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="56" font-weight="900" letter-spacing="-1">${line}</text>`).join("")}
      </g>

      <!-- Subheading -->
      <g transform="translate(0, ${170 + titleLines.length * 70})">
        ${subLines.map((line, idx) => `<text x="0" y="${idx * 34}" fill="${t.accent1}" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="600" opacity="0.95">${line}</text>`).join("")}
      </g>

      <!-- Icon Frame -->
      <g transform="translate(0, 420)">
        <rect width="90" height="90" rx="28" fill="url(#accent-grad)" opacity="0.15"/>
        <rect width="90" height="90" rx="28" fill="none" stroke="${t.accent1}" stroke-width="2" opacity="0.3"/>
        <g transform="translate(25, 25) scale(1.67)" color="${t.accent1}">
          ${selectedIcon}
        </g>
      </g>
    </g>

    <!-- Right Column -->
    <g transform="translate(620, 80)">
      <!-- Card Container -->
      <rect width="500" height="470" rx="32" fill="${t.cardBg}" stroke="${t.cardStroke}" stroke-width="2"/>
      
      <!-- Key takeaways header -->
      <text x="50" y="60" fill="${t.accent1}" font-family="system-ui, sans-serif" font-size="16" font-weight="900" letter-spacing="2">KEY TAKEAWAYS</text>
      <line x1="50" y1="80" x2="150" y2="80" stroke="${t.accent1}" stroke-width="3"/>

      <!-- Takeaway Items -->
      ${points.slice(0, 3).map((pt, idx) => {
        const ptLines = wrapText(pt, 32).slice(0, 2);
        const yOffset = 130 + idx * 110;
        return `<g transform="translate(50, ${yOffset})">
          <circle cx="15" cy="18" r="10" fill="none" stroke="${t.accent1}" stroke-width="2"/>
          <path d="M11 18 l3 3 l5 -5" fill="none" stroke="${t.accent1}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <g transform="translate(45, 0)">
            ${ptLines.map((line, lIdx) => `<text x="0" y="${20 + lIdx * 28}" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="20" font-weight="600">${line}</text>`).join("")}
          </g>
        </g>`;
      }).join("")}
    </g>

    <!-- Footer -->
    <text x="80" y="580" fill="#ffffff" font-family="system-ui, sans-serif" font-size="24" font-weight="bold" letter-spacing="-0.5">Adsrahu <tspan fill="${t.accent1}">📈</tspan></text>
    
    <g transform="translate(1000, 565)" opacity="0.8">
      <text x="0" y="15" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" letter-spacing="1" text-anchor="end">READ FULL ARTICLE</text>
      <path d="M15 12 l5 5 l-5 5" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(10, 0)"/>
    </g>
  </svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

async function generateBlogWithAI(topic: string, category: string, tone: string, targetAudience: string, keyPoints: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not configured. Set it in Vercel Environment Variables.");

  const prompt = `You are a world-class digital marketing and real estate lead generation expert writing for "Adsrahu". Adsrahu is a premium performance marketing agency in India that helps real estate developers and startups scale their leads and sales.

Write a highly detailed, professional, and actionable SEO-optimized blog post based on these exact requirements:
Topic: "${topic}"
Category: "${category}"
Tone of Voice: "${tone || 'Professional and authoritative'}"
Target Audience: "${targetAudience || 'Real estate developers, founders, and business owners'}"
Key Points to Include: "${keyPoints || 'General high-value industry strategies'}"

CRITICAL INSTRUCTIONS FOR ACCURACY & QUALITY:
1. Speak directly to the Target Audience using the specified Tone of Voice.
2. Ensure you weave the "Key Points to Include" naturally into the content.
3. Provide specific, actionable strategies (e.g., mention specific Facebook Ad strategies, Google Ads intent targeting, WhatsApp automation flows, CRM integrations).
4. Avoid generic fluff. Use realistic data points, market trends, and modern SaaS/digital marketing methodologies.
5. Format the content beautifully in Markdown:
   - Start with an engaging hook.
   - Use 3-5 clearly defined ## headings.
   - Include bullet points, numbered lists, and bold text for readability.
6. End with a strong Call-To-Action (CTA) encouraging the reader to book a consultation or contact Adsrahu to implement these strategies.
7. The blog must be comprehensive and well-structured.
8. Design a clean, high-converting social media poster / infographic card for this blog. Choose the most relevant theme and icon, and summarize exactly 3 distinct key takeaways for the poster.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
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
              title: { type: "STRING", description: "An SEO-friendly, compelling blog title (50-70 chars)" },
              slug: { type: "STRING", description: "url-friendly-slug-with-hyphens" },
              excerpt: { type: "STRING", description: "A compelling 1-2 sentence summary for the blog card (under 160 chars)" },
              content: { type: "STRING", description: "The full blog body in Markdown format. Use \\n for newlines." },
              posterConfig: {
                type: "OBJECT",
                properties: {
                  theme: { type: "STRING", description: "The theme name for the poster. One of: 'dark-tech', 'vibrant-marketing', 'neon-purple', 'emerald-growth', 'royal-blue'" },
                  title: { type: "STRING", description: "A very short, high-impact headline for the poster (1-4 words max, e.g. 'WhatsApp Funnels', 'Meta Ads Scale')" },
                  subheading: { type: "STRING", description: "A punchy sub-headline explaining the goal (e.g. 'Generate 10x Leads', 'Reduce CPL by 40%')" },
                  points: { 
                    type: "ARRAY", 
                    items: { type: "STRING" },
                    description: "Exactly 3 highly informative, actionable takeaways from this blog to display on the poster. Keep them short, clean, and impact-driven (e.g., '1. Direct DB Sync', '2. Dynamic Ad Routing', '3. Real-time Lead Alerts')"
                  },
                  iconType: { type: "STRING", description: "The primary icon representing this topic. One of: 'whatsapp', 'target', 'trending', 'zap', 'shield', 'layers', 'chart'" }
                },
                required: ["theme", "title", "subheading", "points", "iconType"]
              }
            },
            required: ["title", "slug", "excerpt", "content", "posterConfig"]
          }
        },
      }),
    }
  );

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${errBody}`);
  }

  const data = await response.json();
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
        const firstBrace = text.indexOf('{');
        const lastBrace = text.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
          parsed = JSON.parse(text.substring(firstBrace, lastBrace + 1));
        } else {
          throw new Error("No JSON structure found");
        }
      }
    } catch (e2) {
      throw new Error("Failed to parse Gemini response as JSON. Snippet: " + text.substring(0, 150));
    }
  }

  // Generate dynamic, clean and completely unique high-quality SVG poster
  const pConf = parsed.posterConfig || {};
  const posterSvg = generatePosterSvg(
    pConf.title || parsed.title,
    pConf.subheading || parsed.excerpt,
    category,
    pConf.theme || "dark-tech",
    pConf.iconType || "zap",
    pConf.points || ["High conversion rates", "Real-time sync", "Actionable insights"]
  );

  return {
    title: parsed.title,
    slug: parsed.slug,
    category,
    excerpt: parsed.excerpt,
    content: parsed.content,
    imageUrl: posterSvg,
  };
}

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
      const category = b.category || "Real Estate Lead Generation";
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
  return { id: row.id, title: row.title, slug: row.slug, category: row.category, excerpt: row.excerpt, content: row.content, published: row.published, createdAt: row.created_at, imageUrl: row.image_url };
}
