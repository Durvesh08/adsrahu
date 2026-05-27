import { useState, useEffect } from "react";
import { settingsStore, type SiteSettings } from "@/lib/admin-store";

export function useSettings(): SiteSettings {
  const [settings, setSettings] = useState<SiteSettings>(settingsStore.get);

  useEffect(() => {
    function onChanged() {
      setSettings(settingsStore.get());
    }
    window.addEventListener(settingsStore.EVENT, onChanged);
    return () => window.removeEventListener(settingsStore.EVENT, onChanged);
  }, []);

  return settings;
}
