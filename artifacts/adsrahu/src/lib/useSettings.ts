import { useState, useEffect } from "react";
import { settingsStore, type SiteSettings } from "@/lib/admin-store";

export function useSettings(): SiteSettings {
  const [settings, setSettings] = useState<SiteSettings>(settingsStore.get);

  useEffect(() => {
    function refresh() {
      setSettings(settingsStore.get());
    }
    function onStorage(e: StorageEvent) {
      if (e.key === "adsrahu_site_settings") refresh();
    }

    // Same-tab updates (admin saves while you're on the same page)
    window.addEventListener(settingsStore.EVENT, refresh);
    // Cross-tab updates (admin open in one tab, public page in another)
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener(settingsStore.EVENT, refresh);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return settings;
}
