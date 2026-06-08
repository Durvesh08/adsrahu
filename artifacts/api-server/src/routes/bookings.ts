import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, bookingsTable } from "@workspace/db";
import { adminAuth } from "../middlewares/adminAuth";

const router: IRouter = Router();

router.get("/bookings", adminAuth, async (req, res): Promise<void> => {
  const rows = await db.select().from(bookingsTable).orderBy(desc(bookingsTable.createdAt));
  res.json(rows);
});

router.post("/bookings", async (req, res): Promise<void> => {
  const { name, phone, email, date, time, status, notes } = req.body;
  if (!name || !phone || !date || !time) {
    res.status(400).json({ error: "name, phone, date and time are required" });
    return;
  }
  const [row] = await db.insert(bookingsTable).values({
    name, phone,
    email: email ?? "",
    date, time,
    status: status ?? "pending",
    notes: notes ?? "",
  }).returning();
  res.status(201).json(row);
});

router.patch("/bookings/:id", adminAuth, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const { name, phone, email, date, time, status, notes } = req.body;
  const [row] = await db.update(bookingsTable)
    .set({ name, phone, email, date, time, status, notes })
    .where(eq(bookingsTable.id, id))
    .returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
});

router.delete("/bookings/:id", adminAuth, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  await db.delete(bookingsTable).where(eq(bookingsTable.id, id));
  res.sendStatus(204);
});

export default router;
