import { desc } from "drizzle-orm";
import { getDb, checkAuth, cors, bookingsTable } from "./_lib/db";

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === "OPTIONS") { res.status(200).end(); return; }

  const db = getDb();

  // GET /api/bookings
  if (req.method === "GET") {
    if (!checkAuth(req.headers["authorization"])) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const rows = await db.select().from(bookingsTable).orderBy(desc(bookingsTable.createdAt));
    res.status(200).json(rows);
    return;
  }

  // POST /api/bookings  (public — book-a-call form)
  if (req.method === "POST") {
    const { name, phone, email = "", date, time, status = "pending", notes = "" } = req.body ?? {};
    if (!name || !phone || !date || !time) {
      res.status(400).json({ error: "name, phone, date, and time are required" });
      return;
    }
    const [row] = await db.insert(bookingsTable).values({ name, phone, email, date, time, status, notes }).returning();
    res.status(201).json(row);
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
