const API_URL = "https://adsrahu-adsrahu-dmmtm8hma-adsrahu07s-projects.vercel.app/api";

const newImages = {
  "how-to-generate-100-qualified-real-estate-leads-per-month": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
  "the-ultimate-whatsapp-automation-funnel-for-realtors": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
  "google-ads-vs-facebook-ads-for-property-developers": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  "why-your-sales-team-is-losing-80-of-leads": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  "cost-per-lead-is-a-vanity-metric-track-this-instead": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  "scaling-a-luxury-villa-project-in-dubai-using-performance-marketing": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
  "ai-strategies-real-estate-leads": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  "scaling-business-facebook-ads": "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=1200&q=80",
  "ultimate-guide-google-search-campaigns": "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=80"
};

async function run() {
  console.log("Logging in...");
  const loginRes = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: "ADSRAHU@2025" })
  });
  
  if (!loginRes.ok) {
    console.error("Login failed!", await loginRes.text());
    return;
  }
  
  const { token } = await loginRes.json();
  console.log("Got token!");

  console.log("Fetching blogs...");
  const res = await fetch(`${API_URL}/blog`);
  const blogs = await res.json();
  
  for (const blog of blogs) {
    if (newImages[blog.slug]) {
      console.log(`Updating ${blog.slug}...`);
      const updateRes = await fetch(`${API_URL}/blog/${blog.id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ imageUrl: newImages[blog.slug] })
      });
      if (updateRes.ok) {
        console.log(`✅ Success: ${blog.title}`);
      } else {
        console.error(`❌ Failed: ${blog.title}`, await updateRes.text());
      }
    }
  }
  console.log("Done!");
}

run().catch(console.error);
