// @ts-nocheck
import { getSql, checkAuth, cors } from "./_lib/db.js";

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === "OPTIONS") { res.status(200).end(); return; }

  const sql = getSql();

  if (req.method === "GET") {
    if (!checkAuth(req.headers["authorization"])) { res.status(401).json({ error: "Unauthorized" }); return; }
    const rows = await sql`SELECT * FROM leads ORDER BY created_at DESC`;
    res.status(200).json(rows.map(toCamel));
    return;
  }

  if (req.method === "POST") {
    const b = req.body ?? {};
    if (!b.name || !b.phone) { res.status(400).json({ error: "name and phone are required" }); return; }
    const rows = await sql`
      INSERT INTO leads (name, phone, email, city, source, status, notes)
      VALUES (${b.name}, ${b.phone}, ${b.email ?? ""}, ${b.city ?? ""}, ${b.source ?? "Website"}, ${b.status ?? "new"}, ${b.notes ?? ""})
      RETURNING *`;
    res.status(201).json(toCamel(rows[0]));
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}

function toCamel(row: any) {
  return { id: row.id, name: row.name, phone: row.phone, email: row.email, city: row.city, source: row.source, status: row.status, notes: row.notes, createdAt: row.created_at };
}
