import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, subscribersTable } from "@workspace/db";
import { adminAuth } from "../middlewares/adminAuth";

const router: IRouter = Router();

router.get("/subscribers", adminAuth, async (req, res): Promise<void> => {
  const rows = await db.select().from(subscribersTable).orderBy(desc(subscribersTable.createdAt));
  res.json(rows);
});

router.post("/subscribers", async (req, res): Promise<void> => {
  const { email, name } = req.body;
  if (!email) { res.status(400).json({ error: "email is required" }); return; }
  const existing = await db.select().from(subscribersTable).where(eq(subscribersTable.email, email)).limit(1);
  if (existing.length > 0) { res.status(409).json({ error: "Already subscribed" }); return; }
  const [row] = await db.insert(subscribersTable).values({ email, name: name ?? "" }).returning();
  res.status(201).json(row);
});

router.delete("/subscribers/:id", adminAuth, async (req, res): Promise<void> => {
  const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  await db.delete(subscribersTable).where(eq(subscribersTable.id, id));
  res.sendStatus(204);
});

export default router;
