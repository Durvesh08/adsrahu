// @ts-nocheck
import { getSql, checkAuth, cors } from "./_lib/db.js";

export const maxDuration = 60;
export const config = { api: { bodyParser: { sizeLimit: "10mb" } } };

const GEMINI_MODEL = "gemini-2.0-flash";
const GEMINI_IMAGE_MODEL = "gemini-2.0-flash-preview-image-generation";

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

// ── Generate real AI image via Gemini 2.0 Flash Image Generation ──────────
async function generateImageWithGemini(prompt: string): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_IMAGE_MODEL}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseModalities: ["IMAGE", "TEXT"] },
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
      console.error("Gemini Image: no inlineData found", JSON.stringify(data).substring(0, 400));
      return null;
    }

    return `data:${imgPart.inlineData.mimeType};base64,${imgPart.inlineData.data}`;
  } catch (e) {
    console.error("Gemini Image exception:", e);
    return null;
  }
}

// ── Build image prompt from topic/category ────────────────────────────────
function buildImagePrompt(topic: string, category: string): string {
  return `Create a stunning professional blog cover image for an article about: "${topic}" in the "${category}" niche.
Visual style: Ultra-premium dark cinematic background (deep navy/midnight blue), vibrant electric blue and gold neon accent glows, volumetric light beams, photorealistic 3D abstract geometric shapes, floating holographic elements, bokeh depth of field, premium studio lighting.
Composition: Wide 16:9 landscape format. No text or letters anywhere. Clean, modern, magazine-cover quality.
Mood: Futuristic, high-performance, authoritative, business-focused.`;
}

// ── AI Blog + Image Generation (PARALLEL for speed) ──────────────────────
async function generateBlogWithAI(
  topic: string,
  category: string,
  tone: string,
  targetAudience: string,
  keyPoints: string
) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set in Vercel environment variables.");

  const imagePrompt = buildImagePrompt(topic, category);

  // 🔥 Fire BOTH in parallel — total time = max(text, image) not text + image
  const [textRes, imageUrl] = await Promise.all([
    fetch(
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
- Real-world examples and data points
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
                slug:    { type: "STRING", description: "url-friendly-slug-with-hyphens (no spaces, lowercase)" },
                excerpt: { type: "STRING", description: "Compelling 1-2 sentence blog summary for SEO (max 160 chars)" },
                content: { type: "STRING", description: "Complete blog post in Markdown format. Use \\n for line breaks. Use ## for headings." },
              },
              required: ["title", "slug", "excerpt", "content"],
            },
          },
        }),
      }
    ),
    generateImageWithGemini(imagePrompt),
  ]);

  if (!textRes.ok) {
    const err = await textRes.text();
    throw new Error(`Gemini text API error ${textRes.status}: ${err.substring(0, 200)}`);
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
    imageUrl: imageUrl || "",
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

    // AI Generate
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
