import { Router, type IRouter } from "express";
import { db, settingsTable } from "@workspace/db";
import { adminAuth } from "../middlewares/adminAuth";

const router: IRouter = Router();

router.get("/settings", async (req, res): Promise<void> => {
  const rows = await db.select().from(settingsTable).limit(1);
  if (rows.length === 0) {
    const [row] = await db.insert(settingsTable).values({}).returning();
    res.json(row);
    return;
  }
  res.json(rows[0]);
});

router.put("/settings", adminAuth, async (req, res): Promise<void> => {
  const {
    heroHeading, heroSubheading, whatsappNumber, contactEmail, contactPhone,
    totalLeads, avgCpl, conversionRate, metaTitle, metaDescription,
  } = req.body;

  const rows = await db.select().from(settingsTable).limit(1);

  if (rows.length === 0) {
    const [row] = await db.insert(settingsTable).values({
      heroHeading, heroSubheading, whatsappNumber, contactEmail, contactPhone,
      totalLeads, avgCpl, conversionRate, metaTitle, metaDescription,
    }).returning();
    res.json(row);
    return;
  }

  const [row] = await db.update(settingsTable)
    .set({ heroHeading, heroSubheading, whatsappNumber, contactEmail, contactPhone,
           totalLeads, avgCpl, conversionRate, metaTitle, metaDescription })
    .returning();
  res.json(row);
});

export default router;
