import { eq } from "drizzle-orm";
import { getDb, checkAuth, cors, blogPostsTable } from "../_lib/db";

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === "OPTIONS") { res.status(200).end(); return; }
  if (!checkAuth(req.headers["authorization"])) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const id = parseInt(req.query?.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const db = getDb();

  // PUT /api/blog/:id
  if (req.method === "PUT") {
    const { title, slug, category, excerpt, content, published } = req.body ?? {};
    const [row] = await db.update(blogPostsTable)
      .set({ title, slug, category, excerpt, content, published })
      .where(eq(blogPostsTable.id, id))
      .returning();
    if (!row) { res.status(404).json({ error: "Not found" }); return; }
    res.status(200).json(row);
    return;
  }

  // DELETE /api/blog/:id
  if (req.method === "DELETE") {
    await db.delete(blogPostsTable).where(eq(blogPostsTable.id, id));
    res.status(204).end();
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
