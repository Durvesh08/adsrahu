// @ts-nocheck
import { getSql, checkAuth, cors } from "./_lib/db.js";

export const config = {
  api: { bodyParser: { sizeLimit: "10mb" } },
};

const GEMINI_TEXT_MODEL = "gemini-2.5-flash";

// ── Step 1: Deep AI Creative Reasoning for Poster Concept ───────────────
async function createCustomPosterPrompt(
  apiKey: string,
  title: string,
  excerpt: string,
  category: string,
  content: string
): Promise<string> {
  const promptDesignMeta = `You are a visionary Creative Director and AI Visual Artist creating featured cover artwork for top digital marketing agency "Adsrahu".

ANALYZE THIS BLOG CONTENT DEEPLY:
- TITLE: "${title}"
- CATEGORY: "${category}"
- EXCERPT: "${excerpt}"
- FULL BLOG SNIPPET: "${(content || "").substring(0, 800)}"

YOUR TASK:
Think step-by-step about the core theme, key concepts, technical tools, and overall mood of this specific blog post.
Brainstorm a completely bespoke, cinematic, high-impact 3D visual concept for a 16:9 featured cover image.

CREATIVE GUIDELINES FOR MAXIMUM VISUAL VARIETY & QUALITY:
1. NO FIXED TEMPLATES OR STEREOTYPES: Invent a totally original visual metaphor tailored specifically to what this blog teaches.
2. ARTISTIC DIRECTION: Think about camera angles (macro close-up, wide isometric, dramatic low angle), lighting (volumetric rays, neon glow, soft studio, raytraced glass caustics), materials (metallic chrome, frosted glass, neon LED, matte obsidian), and depth of field.
3. ELEVATED AESTHETIC: Create a sleek, premium SaaS / high-tech performance agency look. Avoid cheap clipart, stock photos, or generic icons.
4. TEXT & BRANDING: Incorporate elegant 3D typography or subtle glowing title elements for "${title}" and brand watermark "Adsrahu".

OUTPUT: Write a single, highly descriptive English prompt (100-150 words) ready to send directly to an AI image generator (Imagen 3). Describe scene geometry, objects, colors, atmosphere, lighting, and style.`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_TEXT_MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptDesignMeta }] }],
          generationConfig: { temperature: 0.95, maxOutputTokens: 400 },
        }),
      }
    );
    if (res.ok) {
      const data = await res.json();
      const thinkingText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (thinkingText && thinkingText.trim().length > 20) {
        return thinkingText.trim();
      }
    }
  } catch (err) {
    console.error("Thinking prompt generation error:", err?.message || err);
  }

  // Generic fallback if thinking call fails
  return `A futuristic, high-end 3D digital cover art poster for a digital marketing blog titled "${title}". Photorealistic Octane render, cinematic lighting, 8k resolution, elegant dark theme, glassmorphic floating elements, sleek Adsrahu branding.`;
}

// ── Dynamic SVG Fallback Poster ─────────────────────────────────────────
function generateCustomDynamicPosterSvg(
  title: string,
  excerpt: string,
  category: string
): string {
  const hash = title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorPalettes = [
    { bg1: "#0a0f1e", bg2: "#1e1b4b", accent1: "#38bdf8", accent2: "#818cf8" },
    { bg1: "#06101e", bg2: "#022c22", accent1: "#34d399", accent2: "#059669" },
    { bg1: "#180828", bg2: "#31103f", accent1: "#f472b6", accent2: "#c084fc" },
    { bg1: "#0f172a", bg2: "#1e293b", accent1: "#fbbf24", accent2: "#f97316" }
  ];
  const pal = colorPalettes[hash % colorPalettes.length];

  const wrapText = (str: string, maxChar: number) => {
    const words = str.split(" ");
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

  const titleLines = wrapText(title, 26).slice(0, 3);
  const subLines = wrapText(excerpt || "High Performance Digital Growth Strategies", 42).slice(0, 2);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${pal.bg1}"/>
        <stop offset="100%" stop-color="${pal.bg2}"/>
      </linearGradient>
      <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
      </pattern>
    </defs>

    <rect width="1200" height="630" fill="url(#bg)"/>
    <rect width="1200" height="630" fill="url(#grid)"/>

    <circle cx="1050" cy="150" r="250" fill="${pal.accent1}" opacity="0.12" filter="blur(60px)"/>
    <circle cx="150" cy="500" r="200" fill="${pal.accent2}" opacity="0.15" filter="blur(60px)"/>

    <g transform="translate(90, 110)">
      <text x="0" y="0" fill="${pal.accent1}" font-family="system-ui, sans-serif" font-size="14" font-weight="800" letter-spacing="2">${(category || "GROWTH").toUpperCase()}</text>

      <g transform="translate(0, 60)">
        ${titleLines.map((line, idx) => `<text x="0" y="${idx * 68}" fill="#ffffff" font-family="system-ui, sans-serif" font-size="52" font-weight="900" letter-spacing="-1">${line}</text>`).join("")}
      </g>

      <g transform="translate(0, ${90 + titleLines.length * 68})">
        ${subLines.map((line, idx) => `<text x="0" y="${idx * 32}" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="22" font-weight="500">${line}</text>`).join("")}
      </g>

      <g transform="translate(0, 390)">
        <text fill="#ffffff" font-family="system-ui, sans-serif" font-size="22" font-weight="800">Adsrahu <tspan fill="${pal.accent1}">📈</tspan></text>
      </g>
    </g>
  </svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

// ── Step 2: Generate AI Poster (Imagen 3 & Gemini Multimodal) ─────────────
async function generatePosterWithAI(
  apiKey: string,
  title: string,
  excerpt: string,
  category: string,
  content: string
): Promise<string> {
  const creativePrompt = await createCustomPosterPrompt(apiKey, title, excerpt, category, content);
  console.log("Creative AI Poster Prompt:", creativePrompt);

  // 1. Try Imagen 3 models first
  const imagenModels = [
    "imagen-3.0-generate-002",
    "imagen-3.0-fast-generate-001"
  ];

  for (const model of imagenModels) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateImages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            prompt: creativePrompt,
            config: {
              numberOfImages: 1,
              outputMimeType: "image/jpeg",
              aspectRatio: "16:9",
            },
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const base64Bytes = data?.generatedImages?.[0]?.image?.imageBytes;
        if (base64Bytes) {
          return `data:image/jpeg;base64,${base64Bytes}`;
        }
      } else {
        const errTxt = await res.text().catch(() => "");
        console.error(`Imagen model ${model} response ${res.status}:`, errTxt.substring(0, 150));
      }
    } catch (e) {
      console.error(`Error calling ${model}:`, e?.message || e);
    }
  }

  // 2. Try Gemini 2.0 multimodal image generation
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: creativePrompt }] }],
          generationConfig: { responseModalities: ["IMAGE"] },
        }),
      }
    );

    if (res.ok) {
      const data = await res.json();
      const parts = data?.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const mime = part.inlineData.mimeType || "image/jpeg";
          return `data:${mime};base64,${part.inlineData.data}`;
        }
      }
    }
  } catch (e) {
    console.error("Gemini multimodal image gen error:", e?.message || e);
  }

  // 3. Fallback SVG generator
  return generateCustomDynamicPosterSvg(title, excerpt, category);
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

  const prompt = `You are a world-class digital marketing and real estate lead generation expert writing for "Adsrahu". Adsrahu is a premium performance marketing agency in India that helps real estate developers and startups scale their leads and sales.

Write a highly detailed, professional, and actionable SEO-optimized blog post based on these exact requirements:
Topic: "${topic}"
Category: "${category}"
Tone of Voice: "${tone || "Professional and authoritative"}"
Target Audience: "${targetAudience || "Real estate developers, founders, and business owners"}"
Key Points to Include: "${keyPoints || "General high-value industry strategies"}"

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
7. The blog must be comprehensive and well-structured.`;

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
            },
            required: ["title", "slug", "excerpt", "content"],
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

  // Generate creative AI poster
  let posterUrl: string = "";
  try {
    posterUrl = await generatePosterWithAI(
      apiKey,
      parsed.title,
      parsed.excerpt,
      category,
      parsed.content
    );
  } catch (posterErr) {
    console.error("Poster generation failed:", posterErr?.message || posterErr);
    posterUrl = generateCustomDynamicPosterSvg(parsed.title, parsed.excerpt, category);
  }

  return {
    title: parsed.title,
    slug: parsed.slug,
    category,
    excerpt: parsed.excerpt,
    content: parsed.content,
    imageUrl: posterUrl,
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
