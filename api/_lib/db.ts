import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";

const ADMIN_PASSWORD = "adsrahu@2024";

export function getDb() {
  const sql = neon(process.env.DATABASE_URL!);
  return drizzle(sql);
}

export function checkAuth(authHeader: string | undefined): boolean {
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : "";
  return token === ADMIN_PASSWORD;
}

export function cors(res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
}

// ── Schema ────────────────────────────────────────────────────────────────────

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

export const leadsTable = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull().default(""),
  city: text("city").notNull().default(""),
  source: text("source").notNull().default("Website"),
  status: text("status").notNull().default("new"),
  notes: text("notes").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const bookingsTable = pgTable("bookings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull().default(""),
  date: text("date").notNull(),
  time: text("time").notNull(),
  status: text("status").notNull().default("pending"),
  notes: text("notes").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const blogPostsTable = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull().default("General"),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content").notNull().default(""),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const subscribersTable = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
