import React, { useState } from "react";
import { Save, Globe, Phone, Mail, MessageSquare, Check } from "lucide-react";

const SETTINGS_KEY = "adsrahu_site_settings";

interface SiteSettings {
  heroHeading: string;
  heroSubheading: string;
  whatsappNumber: string;
  contactEmail: string;
  contactPhone: string;
  totalLeads: string;
  avgCPL: string;
  conversionRate: string;
  metaTitle: string;
  metaDescription: string;
}

const defaults: SiteSettings = {
  heroHeading: "Performance Marketing & Lead Generation Systems For Real Estate",
  heroSubheading: "We help builders, realtors and modern businesses generate qualified leads using Facebook Ads, Google Ads, CRM automation and WhatsApp funnels.",
  whatsappNumber: "+91 74850 22937",
  contactEmail: "contact@adsrahu.com",
  contactPhone: "+91 74850 22937",
  totalLeads: "1,248",
  avgCPL: "₹23",
  conversionRate: "94%",
  metaTitle: "Adsrahu — Real Estate Lead Generation & Performance Marketing",
  metaDescription: "Premium lead generation and growth systems for real estate businesses. Facebook Ads, Google Ads, CRM automation, WhatsApp funnels.",
};

function getSettings(): SiteSettings {
  try { const raw = localStorage.getItem(SETTINGS_KEY); return raw ? JSON.parse(raw) : defaults; }
  catch { return defaults; }
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings>(getSettings());
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function Field({ label, field, multiline = false }: { label: string; field: keyof SiteSettings; multiline?: boolean }) {
    return (
      <div>
        <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">{label}</label>
        {multiline ? (
          <textarea
            value={settings[field]}
            onChange={e => setSettings({...settings, [field]: e.target.value})}
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50 resize-none transition-all"
          />
        ) : (
          <input
            type="text"
            value={settings[field]}
            onChange={e => setSettings({...settings, [field]: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all"
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage website content and contact information</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-2">
            <Check className="w-4 h-4" /> Saved successfully
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="rounded-2xl border border-white/5 bg-[#060912] p-6 space-y-5">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2"><Globe className="w-4 h-4 text-blue-400" />Hero Section</h2>
          <Field label="Main Heading" field="heroHeading" multiline />
          <Field label="Sub Heading" field="heroSubheading" multiline />
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#060912] p-6 space-y-5">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2"><Phone className="w-4 h-4 text-green-400" />Contact Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="WhatsApp Number" field="whatsappNumber" />
            <Field label="Contact Phone" field="contactPhone" />
            <Field label="Email Address" field="contactEmail" />
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#060912] p-6 space-y-5">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2"><MessageSquare className="w-4 h-4 text-indigo-400" />Performance Metrics Display</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Field label="Total Leads (display)" field="totalLeads" />
            <Field label="Avg. CPL (display)" field="avgCPL" />
            <Field label="Conversion Rate" field="conversionRate" />
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#060912] p-6 space-y-5">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2"><Globe className="w-4 h-4 text-purple-400" />SEO / Meta</h2>
          <Field label="Page Title" field="metaTitle" />
          <Field label="Meta Description" field="metaDescription" multiline />
        </div>

        <button type="submit" className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white btn-premium rounded-xl">
          <Save className="w-4 h-4" /> Save Settings
        </button>
      </form>
    </div>
  );
}
