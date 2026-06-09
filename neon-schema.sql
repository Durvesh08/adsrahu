-- Run this in your Neon SQL Editor to create all tables
-- Go to: https://console.neon.tech → your project → SQL Editor

CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  hero_heading TEXT NOT NULL DEFAULT 'Performance Marketing & Lead Generation Systems For Real Estate',
  hero_subheading TEXT NOT NULL DEFAULT 'We help builders, realtors and modern businesses generate qualified leads using Facebook Ads, Google Ads, CRM automation and WhatsApp funnels.',
  whatsapp_number TEXT NOT NULL DEFAULT '+91 74850 22937',
  contact_email TEXT NOT NULL DEFAULT 'contact@adsrahu.com',
  contact_phone TEXT NOT NULL DEFAULT '+91 74850 22937',
  total_leads TEXT NOT NULL DEFAULT '1,248',
  avg_cpl TEXT NOT NULL DEFAULT '₹23',
  conversion_rate TEXT NOT NULL DEFAULT '94%',
  meta_title TEXT NOT NULL DEFAULT 'Adsrahu — Real Estate Lead Generation & Performance Marketing',
  meta_description TEXT NOT NULL DEFAULT 'Premium lead generation and growth systems for real estate businesses.'
);

CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  source TEXT NOT NULL DEFAULT 'Website',
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL DEFAULT 'General',
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subscribers (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert default settings row
INSERT INTO settings DEFAULT VALUES
  ON CONFLICT DO NOTHING;
