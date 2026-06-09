import { desc } from "drizzle-orm";
import { getDb, checkAuth, cors, leadsTable } from "./_lib/db";

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === "OPTIONS") { res.status(200).end(); return; }

  const db = getDb();

  // GET /api/leads
  if (req.method === "GET") {
    if (!checkAuth(req.headers["authorization"])) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const rows = await db.select().from(leadsTable).orderBy(desc(leadsTable.createdAt));
    res.status(200).json(rows);
    return;
  }

  // POST /api/leads  (public — contact form)
  if (req.method === "POST") {
    const { name, phone, email = "", city = "", source = "Website", status = "new", notes = "" } = req.body ?? {};
    if (!name || !phone) {
      res.status(400).json({ error: "name and phone are required" });
      return;
    }
    const [row] = await db.insert(leadsTable).values({ name, phone, email, city, source, status, notes }).returning();
    res.status(201).json(row);
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
