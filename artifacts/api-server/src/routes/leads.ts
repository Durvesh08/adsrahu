import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, leadsTable } from "@workspace/db";
import { adminAuth } from "../middlewares/adminAuth";

const router: IRouter = Router();

router.get("/leads", adminAuth, async (req, res): Promise<void> => {
  const rows = await db.select().from(leadsTable).orderBy(desc(leadsTable.createdAt));
  res.json(rows);
});

router.post("/leads", async (req, res): Promise<void> => {
  const { name, phone, email, city, source, status, notes } = req.body;
  if (!name || !phone) {
    res.status(400).json({ error: "name and phone are required" });
    return;
  }
  const [row] = await db.insert(leadsTable).values({
    name, phone,
    email: email ?? "",
    city: city ?? "",
    source: source ?? "Website Contact",
    status: status ?? "new",
    notes: notes ?? "",
  }).returning();
  res.status(201).json(row);
});

router.patch("/leads/:id", adminAuth, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const { name, phone, email, city, source, status, notes } = req.body;
  const [row] = await db.update(leadsTable)
    .set({ name, phone, email, city, source, status, notes })
    .where(eq(leadsTable.id, id))
    .returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.delete("/leads/:id", adminAuth, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  await db.delete(leadsTable).where(eq(leadsTable.id, id));
  res.sendStatus(204);
});

export default router;
