const apiKey = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-2.5-flash";

async function test() {
  const prompt = `You are an expert digital marketing blog writer for "Adsrahu", a premium real estate lead generation and performance marketing agency based in India.

Write a complete, professional, SEO-optimized blog post on the following topic:
Topic: "how to get leads for seas service startups"
Category: "Marketing Strategies"

The blog should be written for real estate developers, builders, and business owners who want to grow using digital marketing.
The content should be formatted in Markdown. Include an engaging introduction, 3-5 sections with ## headings, practical tips, statistics, and a conclusion with a CTA to contact Adsrahu. Aim for 800-1200 words.`;

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
              imageQuery: { type: "STRING", description: "A 2-3 word Unsplash search query for a relevant, professional cover image" }
            },
            required: ["title", "slug", "excerpt", "content", "imageQuery"]
          }
        },
      }),
    }
  );

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  
  require('fs').writeFileSync('gemini_output.txt', text || "No text");
  console.log("Output saved to gemini_output.txt");
  
  try {
    JSON.parse(text);
    console.log("JSON.parse succeeded");
  } catch (e) {
    console.log("JSON.parse failed:", e.message);
  }
}

test();
