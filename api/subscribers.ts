import { desc } from "drizzle-orm";
import { getDb, checkAuth, cors, subscribersTable } from "./_lib/db";

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === "OPTIONS") { res.status(200).end(); return; }

  const db = getDb();

  // GET /api/subscribers
  if (req.method === "GET") {
    if (!checkAuth(req.headers["authorization"])) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const rows = await db.select().from(subscribersTable).orderBy(desc(subscribersTable.createdAt));
    res.status(200).json(rows);
    return;
  }

  // POST /api/subscribers  (public)
  if (req.method === "POST") {
    const { email, name = "" } = req.body ?? {};
    if (!email) { res.status(400).json({ error: "email is required" }); return; }
    try {
      const [row] = await db.insert(subscribersTable).values({ email, name }).returning();
      res.status(201).json(row);
    } catch {
      res.status(409).json({ error: "Email already subscribed" });
    }
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
