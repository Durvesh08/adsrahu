// @ts-nocheck
import { getSql, checkAuth, cors } from "./_lib/db.js";

export const maxDuration = 60;
export const config = { api: { bodyParser: { sizeLimit: "10mb" } } };

const GEMINI_MODEL = "gemini-2.5-flash";

// ── Robust JSON parser ─────────────────────────────────────────────────────
function safeJsonParse(raw: string): any {
  if (!raw) throw new Error("Empty AI response");
  let s = raw.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  try { return JSON.parse(s); } catch {}
  s = s.replace(/[\u0000-\u001F]+/g, m =>
    m === "\n" ? "\\n" : m === "\r" ? "\\r" : m === "\t" ? "\\t" : " "
  );
  try { return JSON.parse(s); } catch {}
  let a = s;
  const q = (a.match(/"/g) || []).length;
  if (q % 2 !== 0) a += '"';
  const ob = (a.match(/\{/g) || []).length, cb = (a.match(/\}/g) || []).length;
  for (let i = 0; i < ob - cb; i++) a += "}";
  const oB = (a.match(/\[/g) || []).length, cB = (a.match(/\]/g) || []).length;
  for (let i = 0; i < oB - cB; i++) a += "]";
  try { return JSON.parse(a); } catch {}
  const f = raw.indexOf("{"), l = raw.lastIndexOf("}");
  if (f !== -1 && l > f) try { return JSON.parse(raw.substring(f, l + 1)); } catch {}
  throw new Error("Cannot parse AI response. Snippet: " + raw.substring(0, 120));
}

// ── Build Pollinations.ai image URL (free, no API key needed) ─────────────
// Pollinations.ai generates real AI images using Flux model, publicly accessible URLs
function buildPollinationsImageUrl(topic: string, category: string, seed: number): string {
  const prompt = `Ultra-premium professional blog cover for "${topic}" in ${category}. Dark cinematic background, electric blue and gold neon glows, volumetric light rays, 3D abstract geometric shapes, bokeh depth of field, futuristic holographic elements, photorealistic, no text, no letters, 16:9 wide format, magazine quality`;
  const encoded = encodeURIComponent(prompt);
  return `https://image.pollinations.ai/prompt/${encoded}?width=1200&height=675&model=flux&nologo=true&seed=${seed}`;
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

  // Generate a deterministic but unique seed from topic
  const seed = Array.from(topic).reduce((acc, c) => acc + c.charCodeAt(0), 0) % 999999 + 1;

  // 🔥 Fire text generation — image URL is instant (no API call needed)
  const imageUrl = buildPollinationsImageUrl(topic, category, seed);

  const textRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are an expert content strategist and blogger for "Adsrahu" – a premium performance marketing agency.

Write a professional, detailed, SEO-optimized blog post on:
Topic: "${topic}"
Category: "${category || "General"}"
Tone: "${tone || "Professional & Authoritative"}"
Target Audience: "${targetAudience || "Business owners, founders, marketers"}"
Key Points: "${keyPoints || "Actionable, data-driven strategies with real examples"}"

Requirements:
- Engaging hook in the opening paragraph
- 3-5 clear ## headings with actionable content under each
- Use bullet points, bold key terms, and numbered steps where relevant
- Real-world examples and specific data points
- End with a strong CTA to partner with Adsrahu`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 6000,
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              title:   { type: "STRING", description: "Compelling SEO blog title (50-70 chars)" },
              slug:    { type: "STRING", description: "url-friendly-slug-with-hyphens (lowercase, no spaces)" },
              excerpt: { type: "STRING", description: "1-2 sentence blog summary for SEO (max 160 chars)" },
              content: { type: "STRING", description: "Complete blog post in Markdown. Use \\n for line breaks. Use ## for headings." },
            },
            required: ["title", "slug", "excerpt", "content"],
          },
        },
      }),
    }
  );

  if (!textRes.ok) {
    const err = await textRes.text();
    throw new Error(`Gemini API error ${textRes.status}: ${err.substring(0, 300)}`);
  }

  const textData = await textRes.json();
  const rawText = textData?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error("Gemini returned empty blog content.");

  const parsed = safeJsonParse(rawText);

  return {
    title:    parsed.title,
    slug:     parsed.slug,
    category,
    excerpt:  parsed.excerpt,
    content:  parsed.content,
    imageUrl, // Real AI image URL from Pollinations.ai (loads in browser instantly)
  };
}

// ── Vercel API Handler ─────────────────────────────────────────────────────
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
        title = COALESCE(${b.title ?? null}, title),
        slug = COALESCE(${b.slug ?? null}, slug),
        category = COALESCE(${b.category ?? null}, category),
        excerpt = COALESCE(${b.excerpt ?? null}, excerpt),
        content = COALESCE(${b.content ?? null}, content),
        published = COALESCE(${b.published ?? null}, published),
        image_url = COALESCE(${b.imageUrl ?? null}, image_url)
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
    id:        row.id,
    title:     row.title,
    slug:      row.slug,
    category:  row.category,
    excerpt:   row.excerpt,
    content:   row.content,
    published: row.published,
    createdAt: row.created_at,
    imageUrl:  row.image_url,
  };
}
