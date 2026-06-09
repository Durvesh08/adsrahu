import { eq } from "drizzle-orm";
import { getDb, checkAuth, cors, settingsTable } from "./_lib/db";

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === "OPTIONS") { res.status(200).end(); return; }

  const db = getDb();

  // GET /api/settings
  if (req.method === "GET") {
    const rows = await db.select().from(settingsTable).limit(1);
    if (rows.length === 0) {
      const [row] = await db.insert(settingsTable).values({}).returning();
      res.status(200).json(row);
    } else {
      res.status(200).json(rows[0]);
    }
    return;
  }

  // PUT /api/settings
  if (req.method === "PUT") {
    if (!checkAuth(req.headers["authorization"])) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const { heroHeading, heroSubheading, whatsappNumber, contactEmail, contactPhone,
            totalLeads, avgCpl, conversionRate, metaTitle, metaDescription } = req.body ?? {};

    const rows = await db.select().from(settingsTable).limit(1);
    if (rows.length === 0) {
      const [row] = await db.insert(settingsTable).values({
        heroHeading, heroSubheading, whatsappNumber, contactEmail, contactPhone,
        totalLeads, avgCpl, conversionRate, metaTitle, metaDescription,
      }).returning();
      res.status(200).json(row);
    } else {
      const [row] = await db.update(settingsTable)
        .set({ heroHeading, heroSubheading, whatsappNumber, contactEmail, contactPhone,
               totalLeads, avgCpl, conversionRate, metaTitle, metaDescription })
        .where(eq(settingsTable.id, rows[0].id))
        .returning();
      res.status(200).json(row);
    }
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
