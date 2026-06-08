import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, blogPostsTable } from "@workspace/db";
import { adminAuth } from "../middlewares/adminAuth";

const router: IRouter = Router();

router.get("/blog", async (req, res): Promise<void> => {
  const onlyPublished = req.query.published === "true";
  const rows = await db.select().from(blogPostsTable).orderBy(desc(blogPostsTable.createdAt));
  res.json(onlyPublished ? rows.filter(r => r.published) : rows);
});

router.post("/blog", adminAuth, async (req, res): Promise<void> => {
  const { title, slug, category, excerpt, content, published } = req.body;
  if (!title || !slug) {
    res.status(400).json({ error: "title and slug are required" });
    return;
  }
  const [row] = await db.insert(blogPostsTable).values({
    title, slug,
    category: category ?? "General",
    excerpt: excerpt ?? "",
    content: content ?? "",
    published: published ?? false,
  }).returning();
  res.status(201).json(row);
});

router.put("/blog/:id", adminAuth, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const { title, slug, category, excerpt, content, published } = req.body;
  const [row] = await db.update(blogPostsTable)
    .set({ title, slug, category, excerpt, content, published })
    .where(eq(blogPostsTable.id, id))
    .returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.delete("/blog/:id", adminAuth, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  await db.delete(blogPostsTable).where(eq(blogPostsTable.id, id));
  res.sendStatus(204);
});

export default router;
