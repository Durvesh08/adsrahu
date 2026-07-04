// @ts-nocheck
import { getSql, checkAuth, cors } from "./_lib/db.js";

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === "OPTIONS") { res.status(200).end(); return; }

  const sql = getSql();

  if (req.method === "GET") {
    const rows = await sql`SELECT * FROM settings LIMIT 1`;
    if (rows.length === 0) {
      const inserted = await sql`INSERT INTO settings DEFAULT VALUES RETURNING *`;
      res.status(200).json(toCamel(inserted[0]));
    } else {
      res.status(200).json(toCamel(rows[0]));
    }
    return;
  }

  if (req.method === "PUT") {
    if (!checkAuth(req.headers["authorization"])) { res.status(401).json({ error: "Unauthorized" }); return; }
    const b = req.body ?? {};
    const rows = await sql`
      INSERT INTO settings (id, hero_heading, hero_subheading, whatsapp_number, contact_email, contact_phone, total_leads, avg_cpl, conversion_rate, meta_title, meta_description)
      VALUES (1, ${b.heroHeading}, ${b.heroSubheading}, ${b.whatsappNumber}, ${b.contactEmail}, ${b.contactPhone}, ${b.totalLeads}, ${b.avgCpl}, ${b.conversionRate}, ${b.metaTitle}, ${b.metaDescription})
      ON CONFLICT (id) DO UPDATE SET
        hero_heading = EXCLUDED.hero_heading,
        hero_subheading = EXCLUDED.hero_subheading,
        whatsapp_number = EXCLUDED.whatsapp_number,
        contact_email = EXCLUDED.contact_email,
        contact_phone = EXCLUDED.contact_phone,
        total_leads = EXCLUDED.total_leads,
        avg_cpl = EXCLUDED.avg_cpl,
        conversion_rate = EXCLUDED.conversion_rate,
        meta_title = EXCLUDED.meta_title,
        meta_description = EXCLUDED.meta_description
      RETURNING *`;
    res.status(200).json(toCamel(rows[0]));
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}

function toCamel(row: any) {
  if (!row) return row;
  return {
    id: row.id,
    heroHeading: row.hero_heading,
    heroSubheading: row.hero_subheading,
    whatsappNumber: row.whatsapp_number,
    contactEmail: row.contact_email,
    contactPhone: row.contact_phone,
    totalLeads: row.total_leads,
    avgCpl: row.avg_cpl,
    conversionRate: row.conversion_rate,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
  };
}
