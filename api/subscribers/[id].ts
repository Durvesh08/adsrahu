import { eq } from "drizzle-orm";
import { getDb, checkAuth, cors, subscribersTable } from "../_lib/db";

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

  // DELETE /api/subscribers/:id
  if (req.method === "DELETE") {
    await db.delete(subscribersTable).where(eq(subscribersTable.id, id));
    res.status(204).end();
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
