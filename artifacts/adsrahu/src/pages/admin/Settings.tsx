import React, { useState, useEffect } from "react";
import { Save, Globe, Phone, MessageSquare, Check, Loader2 } from "lucide-react";
import { settingsApi, type ApiSettings } from "@/lib/api";
import { SETTINGS_CHANGED } from "@/lib/useSettings";

const defaults: Omit<ApiSettings, "id"> = {
  heroHeading: "Performance Marketing & Lead Generation Systems For Real Estate",
  heroSubheading: "We help builders, realtors and modern businesses generate qualified leads using Facebook Ads, Google Ads, CRM automation and WhatsApp funnels.",
  whatsappNumber: "+91 74850 22937",
  contactEmail: "contact@adsrahu.com",
  contactPhone: "+91 74850 22937",
  totalLeads: "1,248",
  avgCpl: "₹23",
  conversionRate: "94%",
  metaTitle: "Adsrahu — Real Estate Lead Generation & Performance Marketing",
  metaDescription: "Premium lead generation and growth systems for real estate businesses. Facebook Ads, Google Ads, CRM automation, WhatsApp funnels.",
};

interface FieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  multiline?: boolean;
}

function Field({ label, value, onChange, multiline = false }: FieldProps) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50 resize-none transition-all" />
      ) : (
        <input type="text" value={value} onChange={e => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all" />
      )}
    </div>
  );
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<Omit<ApiSettings, "id">>(defaults);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    settingsApi.get()
      .then(data => { setSettings(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  function set(field: keyof Omit<ApiSettings, "id">) {
    return (val: string) => setSettings(prev => ({ ...prev, [field]: val }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await settingsApi.save(settings);
      window.dispatchEvent(new CustomEvent(SETTINGS_CHANGED));
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Changes save to the database and update the live website for all visitors</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="rounded-2xl border border-white/5 bg-[#060912] p-6 space-y-5">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" />Hero Section
          </h2>
          <Field label="Main Heading" value={settings.heroHeading} onChange={set("heroHeading")} multiline />
          <Field label="Sub Heading" value={settings.heroSubheading} onChange={set("heroSubheading")} multiline />
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#060912] p-6 space-y-5">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Phone className="w-4 h-4 text-green-400" />Contact Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="WhatsApp Number" value={settings.whatsappNumber} onChange={set("whatsappNumber")} />
            <Field label="Contact Phone" value={settings.contactPhone} onChange={set("contactPhone")} />
            <Field label="Email Address" value={settings.contactEmail} onChange={set("contactEmail")} />
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#060912] p-6 space-y-5">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-400" />Performance Metrics Display
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Field label="Total Leads (display)" value={settings.totalLeads} onChange={set("totalLeads")} />
            <Field label="Avg. CPL (display)" value={settings.avgCpl} onChange={set("avgCpl")} />
            <Field label="Conversion Rate" value={settings.conversionRate} onChange={set("conversionRate")} />
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#060912] p-6 space-y-5">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-400" />SEO / Meta
          </h2>
          <Field label="Page Title" value={settings.metaTitle} onChange={set("metaTitle")} />
          <Field label="Meta Description" value={settings.metaDescription} onChange={set("metaDescription")} multiline />
        </div>

        <div className="flex items-center gap-4">
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white btn-premium rounded-xl disabled:opacity-60">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving…" : "Save Settings"}
          </button>
          {saved && (
            <div className="flex items-center gap-2 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-2.5">
              <Check className="w-4 h-4" /> Saved — live website updated
            </div>
          )}
          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
      </form>
    </div>
  );
}
