import { getSql, checkAuth, cors } from "../_lib/db";

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
      UPDATE bookings SET
        name = COALESCE(${b.name ?? null}, name),
        phone = COALESCE(${b.phone ?? null}, phone),
        email = COALESCE(${b.email ?? null}, email),
        date = COALESCE(${b.date ?? null}, date),
        time = COALESCE(${b.time ?? null}, time),
        status = COALESCE(${b.status ?? null}, status),
        notes = COALESCE(${b.notes ?? null}, notes)
      WHERE id = ${id} RETURNING *`;
    if (!rows[0]) { res.status(404).json({ error: "Not found" }); return; }
    res.status(200).json(toCamel(rows[0]));
    return;
  }

  if (req.method === "DELETE") {
    await sql`DELETE FROM bookings WHERE id = ${id}`;
    res.status(204).end();
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}

function toCamel(row: any) {
  return { id: row.id, name: row.name, phone: row.phone, email: row.email, date: row.date, time: row.time, status: row.status, notes: row.notes, createdAt: row.created_at };
}
