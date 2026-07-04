// @ts-nocheck
import { getSql, checkAuth, cors } from "../_lib/db.js";

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === "OPTIONS") { res.status(200).end(); return; }
  if (!checkAuth(req.headers["authorization"])) { res.status(401).json({ error: "Unauthorized" }); return; }

  const id = parseInt(req.query?.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const sql = getSql();

  if (req.method === "PATCH") {
    const b = req.body ?? {};
    const rows = await sql`
      UPDATE leads SET
        name = COALESCE(${b.name}, name),
        phone = COALESCE(${b.phone}, phone),
        email = COALESCE(${b.email}, email),
        city = COALESCE(${b.city}, city),
        source = COALESCE(${b.source}, source),
        status = COALESCE(${b.status}, status),
        notes = COALESCE(${b.notes}, notes)
      WHERE id = ${id} RETURNING *`;
    if (!rows[0]) { res.status(404).json({ error: "Not found" }); return; }
    res.status(200).json(toCamel(rows[0]));
    return;
  }

  if (req.method === "DELETE") {
    await sql`DELETE FROM leads WHERE id = ${id}`;
    res.status(204).end();
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}

function toCamel(row: any) {
  return { id: row.id, name: row.name, phone: row.phone, email: row.email, city: row.city, source: row.source, status: row.status, notes: row.notes, createdAt: row.created_at };
}
