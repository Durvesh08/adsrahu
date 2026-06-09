import { desc } from "drizzle-orm";
import { getDb, checkAuth, cors, blogPostsTable } from "./_lib/db";

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === "OPTIONS") { res.status(200).end(); return; }

  const db = getDb();

  // GET /api/blog  (public)
  if (req.method === "GET") {
    const onlyPublished = req.query?.published === "true";
    const rows = await db.select().from(blogPostsTable).orderBy(desc(blogPostsTable.createdAt));
    res.status(200).json(onlyPublished ? rows.filter((r: any) => r.published) : rows);
    return;
  }

  // POST /api/blog
  if (req.method === "POST") {
    if (!checkAuth(req.headers["authorization"])) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const { title, slug, category = "General", excerpt = "", content = "", published = false } = req.body ?? {};
    if (!title || !slug) {
      res.status(400).json({ error: "title and slug are required" });
      return;
    }
    const [row] = await db.insert(blogPostsTable).values({ title, slug, category, excerpt, content, published }).returning();
    res.status(201).json(row);
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
