import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const settingsTable = pgTable("settings", {
  id: serial("id").primaryKey(),
  heroHeading: text("hero_heading").notNull().default("Performance Marketing & Lead Generation Systems For Real Estate"),
  heroSubheading: text("hero_subheading").notNull().default("We help builders, realtors and modern businesses generate qualified leads using Facebook Ads, Google Ads, CRM automation and WhatsApp funnels."),
  whatsappNumber: text("whatsapp_number").notNull().default("+91 74850 22937"),
  contactEmail: text("contact_email").notNull().default("contact@adsrahu.com"),
  contactPhone: text("contact_phone").notNull().default("+91 74850 22937"),
  totalLeads: text("total_leads").notNull().default("1,248"),
  avgCpl: text("avg_cpl").notNull().default("₹23"),
  conversionRate: text("conversion_rate").notNull().default("94%"),
  metaTitle: text("meta_title").notNull().default("Adsrahu — Real Estate Lead Generation & Performance Marketing"),
  metaDescription: text("meta_description").notNull().default("Premium lead generation and growth systems for real estate businesses."),
});

export const insertSettingsSchema = createInsertSchema(settingsTable).omit({ id: true });
export type InsertSettings = z.infer<typeof insertSettingsSchema>;
export type Settings = typeof settingsTable.$inferSelect;
