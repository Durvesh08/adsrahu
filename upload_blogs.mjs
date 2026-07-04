import fs from 'fs';

const API_URL = "https://adsrahu-adsrahu-dmmtm8hma-adsrahu07s-projects.vercel.app/api";

const blogs = [
  {
    title: "10 AI Strategies for Real Estate Lead Generation",
    slug: "ai-strategies-real-estate-leads",
    category: "Real Estate Lead Generation",
    excerpt: "Discover how top-tier real estate agents are utilizing Artificial Intelligence to 10x their incoming qualified buyer and seller leads.",
    content: "![AI Real Estate Growth](/blog/real-estate.jpg)\\n\\nArtificial Intelligence is no longer just a buzzword; it's a foundational tool for the modern real estate agency. From predictive analytics that identify when a homeowner is likely to sell, to conversational AI chatbots that pre-qualify buyers at 3 AM, the landscape of lead generation has completely transformed.\\n\\n## 1. Predictive Analytics\\nBy analyzing thousands of data points—including financial history, life events (like marriage or a new baby), and local market trends—AI can pinpoint homeowners who are most likely to list their properties within the next 6-12 months. This allows you to target them with highly specific marketing campaigns long before your competitors even know they exist.\\n\\n## 2. Automated Follow-Ups\\nSpeed to lead is critical. Studies show that if you don't respond to a lead within 5 minutes, your chances of converting them drop by 400%. AI-driven CRM systems can instantly engage incoming leads with personalized SMS messages and emails, ensuring they feel valued immediately while simultaneously gathering essential qualifying information.\\n\\n## 3. Dynamic Ad Creatives\\nGone are the days of manual A/B testing. AI algorithms can dynamically adjust your ad creatives, headlines, and calls-to-action in real-time based on which variations are converting best for specific demographics. This ensures your ad spend is optimized for maximum ROI.\\n\\nBy integrating these AI strategies into your performance marketing efforts, you can build an automated, scalable machine that generates high-quality real estate leads consistently.",
    published: true
  },
  {
    title: "Scaling Your Business with Facebook Ads",
    slug: "scaling-business-facebook-ads",
    category: "Facebook Ads",
    excerpt: "A deep dive into advanced targeting, dynamic creatives, and lookalike audiences to maximize your Facebook Advertising ROI.",
    content: "![Facebook Ads Growth](/blog/facebook-ads.jpg)\\n\\nFacebook Ads remain one of the most powerful platforms for generating highly targeted leads. However, with rising CPMs (Cost Per Mille) and increasing competition, simple \"boosted posts\" no longer cut it. You need a data-driven, strategic approach to scale successfully.\\n\\n## Advanced Targeting Strategies\\nThe key to Facebook Ads is not just reaching a large audience, but reaching the *right* audience. Utilizing custom audiences based on your existing CRM data allows you to create highly accurate Lookalike Audiences. These audiences consist of users who share similar behaviors and demographics to your best customers, drastically improving your conversion rates.\\n\\n## The Power of Video Creatives\\nStatic images are losing their edge. Video content, particularly short-form vertical videos designed for Reels and Stories, captures attention much more effectively. Your creatives must stop the scroll within the first 3 seconds, clearly articulate the value proposition, and provide a strong, unambiguous Call To Action (CTA).\\n\\n## Retargeting Funnels\\nMost users won't convert on the first touchpoint. A robust retargeting strategy is essential. By tracking user behavior on your website (e.g., page views, form abandons), you can serve specific, sequential ads that guide them further down the funnel. Address their objections, offer testimonials, and provide an irresistible incentive to take action.",
    published: true
  },
  {
    title: "The Ultimate Guide to Google Search Campaigns",
    slug: "ultimate-guide-google-search-campaigns",
    category: "Google Ads",
    excerpt: "Learn how to dominate search engine results pages and capture high-intent leads actively searching for your services.",
    content: "![Google Ads Analytics](/blog/google-ads.jpg)\\n\\nWhile social media advertising is excellent for creating demand, Google Ads is unparalleled for *capturing* demand. When a user types \"best real estate agent near me\" into Google, they have high intent; they are actively looking for a solution. Your goal is to be the first and most compelling option they see.\\n\\n## Keyword Intent is Everything\\nNot all keywords are created equal. Bidding on broad terms like \"real estate\" will drain your budget with low-quality traffic. Focus on long-tail, high-intent keywords. For example, \"sell my house fast in [City Name]\" indicates a strong desire to take immediate action. Group these keywords into tight, thematic Ad Groups for maximum relevance.\\n\\n## Crafting Compelling Ad Copy\\nYour ad copy must directly address the user's search query and offer a clear benefit. Utilize ad extensions (sitelinks, callouts, structured snippets) to dominate more screen real estate and provide additional pathways to conversion. Ensure your headlines are punchy and your descriptions highlight your unique selling proposition (USP).\\n\\n## Landing Page Optimization\\nGenerating a click is only half the battle. Your landing page must seamlessly continue the narrative established in the ad. Ensure fast load times, mobile responsiveness, and a singular, focused Call To Action. The message on the landing page must perfectly match the promise made in the ad copy to maximize your Quality Score and lower your Cost Per Click (CPC).",
    published: true
  }
];

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
  
  for (const blog of blogs) {
    console.log(`Uploading blog: ${blog.title}`);
    const res = await fetch(`${API_URL}/blog`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(blog)
    });
    
    if (res.ok) {
      console.log(`✅ Success: ${blog.title}`);
    } else {
      console.error(`❌ Failed: ${blog.title}`, await res.text());
    }
  }
}

run().catch(console.error);
