// @ts-nocheck
import { getSql, checkAuth, cors } from "../_lib/db.js";

export const config = {
  api: { bodyParser: { sizeLimit: "4mb" } },
};

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === "OPTIONS") { res.status(200).end(); return; }
  if (!checkAuth(req.headers["authorization"])) { res.status(401).json({ error: "Unauthorized" }); return; }

  const id = parseInt(req.query?.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const sql = getSql();

  if (req.method === "PUT") {
    let b = req.body ?? {};
    if (typeof b === "string") {
      try { b = JSON.parse(b); } catch (e) {}
    }
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
    if (!rows[0]) { res.status(404).json({ error: "Not found" }); return; }
    res.status(200).json(toCamel(rows[0]));
    return;
  }

  if (req.method === "DELETE") {
    await sql`DELETE FROM blog_posts WHERE id = ${id}`;
    res.status(204).end();
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}

function toCamel(row: any) {
  return { id: row.id, title: row.title, slug: row.slug, category: row.category, excerpt: row.excerpt, content: row.content, published: row.published, createdAt: row.created_at, imageUrl: row.image_url };
}
