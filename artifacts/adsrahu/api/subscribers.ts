// @ts-nocheck
import { getSql, checkAuth, cors } from "./_lib/db.js";

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === "OPTIONS") { res.status(200).end(); return; }

  const sql = getSql();

  if (req.method === "GET") {
    if (!checkAuth(req.headers["authorization"])) { res.status(401).json({ error: "Unauthorized" }); return; }
    const rows = await sql`SELECT * FROM subscribers ORDER BY created_at DESC`;
    res.status(200).json(rows.map(toCamel));
    return;
  }

  if (req.method === "POST") {
    const b = req.body ?? {};
    if (!b.email) { res.status(400).json({ error: "email is required" }); return; }
    try {
      const rows = await sql`
        INSERT INTO subscribers (email, name) VALUES (${b.email}, ${b.name ?? ""}) RETURNING *`;
      res.status(201).json(toCamel(rows[0]));
    } catch {
      res.status(409).json({ error: "Email already subscribed" });
    }
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}

function toCamel(row: any) {
  return { id: row.id, email: row.email, name: row.name, createdAt: row.created_at };
}
