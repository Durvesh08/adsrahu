// @ts-nocheck
import { getSql, checkAuth, cors } from "./_lib/db.js";

export const maxDuration = 60;
export const config = { api: { bodyParser: { sizeLimit: "10mb" } } };

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_IMAGE_MODEL = "gemini-2.0-flash-preview-image-generation";

// ── Robust JSON parser (handles markdown fences, truncation, control chars) ──
function safeJsonParse(raw: string): any {
  if (!raw) throw new Error("Empty AI response");
  let s = raw.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();

  try { return JSON.parse(s); } catch {}

  s = s.replace(/[\u0000-\u001F]+/g, m =>
    m === "\n" ? "\\n" : m === "\r" ? "\\r" : m === "\t" ? "\\t" : " "
  );
  try { return JSON.parse(s); } catch {}

  const q = (s.match(/"/g) || []).length;
  let a = q % 2 !== 0 ? s + '"' : s;
  const ob = (a.match(/\{/g) || []).length, cb = (a.match(/\}/g) || []).length;
  for (let i = 0; i < ob - cb; i++) a += "}";
  const oB = (a.match(/\[/g) || []).length, cB = (a.match(/\]/g) || []).length;
  for (let i = 0; i < oB - cB; i++) a += "]";
  try { return JSON.parse(a); } catch {}

  const f = raw.indexOf("{"), l = raw.lastIndexOf("}");
  if (f !== -1 && l > f) try { return JSON.parse(raw.substring(f, l + 1)); } catch {}

  throw new Error("Cannot parse AI response. Snippet: " + raw.substring(0, 120));
}


// ── Generate real AI image via Gemini 2.0 Flash Image Generation ─────────
async function generateImageWithGemini(prompt: string): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_IMAGE_MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseModalities: ["IMAGE", "TEXT"],
          },
        }),
      }
    );

    if (!res.ok) {
      const errBody = await res.text();
      console.error("Gemini Image API error:", res.status, errBody);
      return null;
    }

    const data = await res.json();
    const parts = data?.candidates?.[0]?.content?.parts ?? [];
    const imgPart = parts.find((p: any) => p.inlineData?.mimeType?.startsWith("image/"));

    if (!imgPart?.inlineData?.data) {
      console.error("Gemini Image: no inlineData in response", JSON.stringify(data).substring(0, 300));
      return null;
    }

    return `data:${imgPart.inlineData.mimeType};base64,${imgPart.inlineData.data}`;
  } catch (e) {
    console.error("Gemini Image generation exception:", e);
    return null;
  }
}

// ── Build a rich, visual image prompt from blog metadata ──────────────────
function buildImagePrompt(title: string, category: string, topic: string): string {
  return `Professional premium blog cover image for "${title}". Category: ${category}. Topic: ${topic}. 
Style: Ultra-modern, cinematic, dark dramatic background with vibrant glowing neon accents in electric blue and gold. 
Photorealistic 3D elements, bokeh depth of field, professional studio lighting with volumetric light beams.
Include abstract geometric shapes, floating data nodes, holographic elements, and sleek tech-inspired visual metaphors.
Text-free clean composition, 16:9 wide format, ultra high quality, magazine cover quality, 4K resolution.
Mood: Futuristic, premium, high-performance, business authority.`;
}

// ── AI Blog + Image Generation ────────────────────────────────────────────
async function generateBlogWithAI(
  topic: string,
  category: string,
  tone: string,
  targetAudience: string,
  keyPoints: string
) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set in Vercel environment variables.");

  // 1️⃣  Generate blog text (JSON) from Gemini
  const textRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a world-class performance marketing expert writing for "Adsrahu" - a premium performance agency.

Write a highly detailed, SEO-optimized blog post:
Topic: "${topic}"
Category: "${category || "General"}"
Tone: "${tone || "Professional & Authoritative"}"
Audience: "${targetAudience || "Business owners, founders, marketers"}"
Key Points: "${keyPoints || "Actionable, data-driven strategies"}"

Rules:
1. Adapt fully to the topic. Do NOT inject unrelated industries.
2. Specific strategies, real data points, modern methodologies.
3. Beautiful Markdown: engaging hook → 3-5 ## headings → bullets/bold → strong CTA for Adsrahu.
4. Also generate image prompt for a cinematic cover image for this blog.`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              title: { type: "STRING", description: "SEO blog title (50-70 chars)" },
              slug: { type: "STRING", description: "url-friendly-slug" },
              excerpt: { type: "STRING", description: "1-2 sentence summary, max 160 chars" },
              content: { type: "STRING", description: "Full blog in Markdown. Use \\n for newlines." },
              imagePrompt: { type: "STRING", description: "Detailed visual prompt for generating a cinematic blog cover image. Be specific about style, lighting, colors, mood, visual elements. No text in image." },
            },
            required: ["title", "slug", "excerpt", "content", "imagePrompt"],
          },
        },
      }),
    }
  );

  if (!textRes.ok) {
    const err = await textRes.text();
    throw new Error(`Gemini text API error ${textRes.status}: ${err.substring(0, 200)}`);
  }

  const textData = await textRes.json();
  const rawText = textData?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error("Gemini returned empty content.");

  const parsed = safeJsonParse(rawText);

  // 2️⃣  Generate real AI image via Gemini Image Generation
  const rawImagePrompt = parsed.imagePrompt || buildImagePrompt(parsed.title, category, topic);
  const richPrompt = `${rawImagePrompt}. Style: Ultra-premium dark cinematic, electric blue and gold neon glows, volumetric lighting, 3D geometric elements, photorealistic, no text, 16:9 wide format, 4K magazine-quality.`;

  const imageUrl = await generateImageWithGemini(richPrompt);

  if (!imageUrl) {
    console.warn("Gemini Image generation returned null – skipping image.");
  }

  return {
    title: parsed.title,
    slug: parsed.slug,
    category,
    excerpt: parsed.excerpt,
    content: parsed.content,
    imageUrl: imageUrl || "",   // empty = UI shows placeholder, never broken ?
  };
}

// ── Premium SVG fallback (used only if Imagen is unavailable) ────────────
function buildSvgFallback(title: string, category: string): string {
  const t = (s: string) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  const words = t(title || "").split(" ");
  const line1 = words.slice(0, 4).join(" ");
  const line2 = words.slice(4, 8).join(" ");
  const cat = t(category || "INSIGHTS").toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020817"/>
      <stop offset="50%" stop-color="#0a1628"/>
      <stop offset="100%" stop-color="#111d35"/>
    </linearGradient>
    <linearGradient id="acc" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#0ea5e9"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFD97A"/>
      <stop offset="100%" stop-color="#FFA500"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <circle cx="150" cy="120" r="300" fill="#38bdf8" opacity="0.12"/>
  <circle cx="1050" cy="555" r="350" fill="#0ea5e9" opacity="0.08"/>
  <rect x="0" y="0" width="1200" height="6" fill="url(#acc)"/>
  <rect x="70" y="60" width="4" height="555" rx="2" fill="#38bdf8" fill-opacity="0.4"/>
  <rect x="0" y="0" width="1200" height="675" fill="#38bdf8" fill-opacity="0.01"/>
  <text x="110" y="120" fill="#38bdf8" font-family="system-ui,sans-serif" font-size="12" font-weight="800" letter-spacing="4" fill-opacity="0.7">${cat}</text>
  <text x="110" y="220" fill="#ffffff" font-family="system-ui,sans-serif" font-size="64" font-weight="900" letter-spacing="-2">${line1}</text>
  ${line2 ? `<text x="110" y="295" fill="#ffffff" font-family="system-ui,sans-serif" font-size="64" font-weight="900" letter-spacing="-2">${line2}</text>` : ""}
  <rect x="110" y="330" width="90" height="5" rx="2.5" fill="url(#acc)"/>
  <circle cx="110" cy="590" r="22" fill="url(#gold)" fill-opacity="0.15" stroke="url(#gold)" stroke-width="2"/>
  <text x="110" y="586" fill="url(#gold)" font-family="system-ui,sans-serif" font-size="18" font-weight="900" letter-spacing="-0.5" dominant-baseline="middle">A</text>
  <text x="142" y="582" fill="#ffffff" font-family="system-ui,sans-serif" font-size="20" font-weight="900">Adsrahu</text>
  <text x="142" y="600" fill="#64748b" font-family="system-ui,sans-serif" font-size="9" font-weight="700" letter-spacing="2.5">PERFORMANCE AGENCY</text>
  </svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

// ── Vercel API handler ─────────────────────────────────────────────────────
export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === "OPTIONS") { res.status(200).end(); return; }

  const sql = getSql();

  // GET – list posts
  if (req.method === "GET") {
    const onlyPublished = req.query?.published === "true";
    const rows = onlyPublished
      ? await sql`SELECT * FROM blog_posts WHERE published = true ORDER BY created_at DESC`
      : await sql`SELECT * FROM blog_posts ORDER BY created_at DESC`;
    res.status(200).json(rows.map(toCamel));
    return;
  }

  // POST
  if (req.method === "POST") {
    if (!checkAuth(req.headers["authorization"])) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    let b = req.body ?? {};
    if (typeof b === "string") { try { b = JSON.parse(b); } catch {} }

    // AI Generate action
    if (req.query?.action === "generate") {
      const topic = b.topic || b.title || "";
      if (!topic) { res.status(400).json({ error: "topic is required" }); return; }
      try {
        const generated = await generateBlogWithAI(
          topic,
          b.category || "General",
          b.tone || "",
          b.targetAudience || "",
          b.keyPoints || ""
        );
        res.status(200).json(generated);
      } catch (err: any) {
        console.error("AI generation error:", err);
        res.status(500).json({ error: err.message || "AI generation failed" });
      }
      return;
    }

    // Create post
    if (!b.title || !b.slug) { res.status(400).json({ error: "title and slug required" }); return; }
    const rows = await sql`
      INSERT INTO blog_posts (title, slug, category, excerpt, content, published, image_url)
      VALUES (${b.title}, ${b.slug}, ${b.category ?? "General"}, ${b.excerpt ?? ""}, ${b.content ?? ""}, ${b.published ?? false}, ${b.imageUrl ?? null})
      RETURNING *`;
    res.status(201).json(toCamel(rows[0]));
    return;
  }

  // PATCH – update post
  if (req.method === "PATCH") {
    if (!checkAuth(req.headers["authorization"])) { res.status(401).json({ error: "Unauthorized" }); return; }
    let b = req.body ?? {};
    if (typeof b === "string") { try { b = JSON.parse(b); } catch {} }
    const id = req.query?.id;
    if (!id) { res.status(400).json({ error: "id required" }); return; }
    const rows = await sql`
      UPDATE blog_posts SET
        title = COALESCE(${b.title}, title),
        slug = COALESCE(${b.slug}, slug),
        category = COALESCE(${b.category}, category),
        excerpt = COALESCE(${b.excerpt}, excerpt),
        content = COALESCE(${b.content}, content),
        published = COALESCE(${b.published}, published),
        image_url = COALESCE(${b.imageUrl}, image_url)
      WHERE id = ${id} RETURNING *`;
    res.status(200).json(toCamel(rows[0]));
    return;
  }

  // DELETE
  if (req.method === "DELETE") {
    if (!checkAuth(req.headers["authorization"])) { res.status(401).json({ error: "Unauthorized" }); return; }
    const id = req.query?.id;
    if (!id) { res.status(400).json({ error: "id required" }); return; }
    await sql`DELETE FROM blog_posts WHERE id = ${id}`;
    res.status(200).json({ success: true });
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
