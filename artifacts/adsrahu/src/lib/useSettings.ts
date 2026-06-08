import { useState, useEffect } from "react";
import { settingsApi, type ApiSettings } from "@/lib/api";

export type Settings = ApiSettings;

const defaults: ApiSettings = {
  id: 1,
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

export const SETTINGS_CHANGED = "adsrahu-settings-changed";

export function useSettings(): ApiSettings {
  const [settings, setSettings] = useState<ApiSettings>(defaults);

  useEffect(() => {
    settingsApi.get().then(setSettings).catch(() => {});

    function onChanged() {
      settingsApi.get().then(setSettings).catch(() => {});
    }
    window.addEventListener(SETTINGS_CHANGED, onChanged);
    return () => window.removeEventListener(SETTINGS_CHANGED, onChanged);
  }, []);

  return settings;
}
