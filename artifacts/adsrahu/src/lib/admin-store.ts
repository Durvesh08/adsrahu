export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  source: string;
  status: "new" | "contacted" | "interested" | "closed" | "lost";
  notes: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  published: boolean;
  createdAt: string;
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes: string;
  createdAt: string;
}

export interface Subscriber {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

function getStore<T>(key: string, defaults: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaults;
  } catch {
    return defaults;
  }
}

function setStore<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

const seed = (): void => {
  if (!localStorage.getItem("adsrahu_leads")) {
    const leads: Lead[] = [
      { id: "1", name: "Rajesh Kumar", phone: "+91 98765 43210", email: "rajesh@email.com", city: "Mumbai", source: "Facebook Ads", status: "interested", notes: "Interested in 3BHK", createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
      { id: "2", name: "Priya Sharma", phone: "+91 87654 32109", email: "priya@email.com", city: "Pune", source: "Google Ads", status: "contacted", notes: "Called once, follow up", createdAt: new Date(Date.now() - 86400000).toISOString() },
      { id: "3", name: "Ahmed Khan", phone: "+971 55 123 4567", email: "ahmed@email.com", city: "Dubai", source: "WhatsApp", status: "new", notes: "NRI investor", createdAt: new Date().toISOString() },
      { id: "4", name: "Meera Nair", phone: "+91 76543 21098", email: "meera@email.com", city: "Bangalore", source: "Facebook Ads", status: "closed", notes: "Booked 2BHK", createdAt: new Date(Date.now() - 86400000 * 5).toISOString() },
    ];
    setStore("adsrahu_leads", leads);
  }
  if (!localStorage.getItem("adsrahu_bookings")) {
    const bookings: Booking[] = [
      { id: "1", name: "Sunita Patel", phone: "+91 90000 12345", email: "sunita@email.com", date: "2026-05-26", time: "11:00 AM", status: "confirmed", notes: "First time buyer", createdAt: new Date().toISOString() },
      { id: "2", name: "Vikram Singh", phone: "+91 81234 56789", email: "vikram@email.com", date: "2026-05-27", time: "3:00 PM", status: "pending", notes: "Investor, looking at commercial", createdAt: new Date().toISOString() },
    ];
    setStore("adsrahu_bookings", bookings);
  }
  if (!localStorage.getItem("adsrahu_subscribers")) {
    const subs: Subscriber[] = [
      { id: "1", email: "info@realestate.in", name: "Real Estate Info", createdAt: new Date().toISOString() },
      { id: "2", email: "investor@nri.com", name: "NRI Investor", createdAt: new Date().toISOString() },
    ];
    setStore("adsrahu_subscribers", subs);
  }
  if (!localStorage.getItem("adsrahu_blogs")) {
    const blogs: BlogPost[] = [
      { id: "1", title: "How to Generate 100 Real Estate Leads in 30 Days", slug: "100-leads-30-days", category: "Real Estate Lead Generation", excerpt: "Proven strategies to flood your pipeline with qualified buyers.", content: "# How to Generate 100 Real Estate Leads in 30 Days\n\nIn today's competitive market...", published: true, createdAt: new Date().toISOString() },
      { id: "2", title: "WhatsApp Automation for Real Estate: The Complete Guide", slug: "whatsapp-automation-real-estate", category: "WhatsApp Funnels", excerpt: "How to set up automated WhatsApp follow-ups that convert.", content: "# WhatsApp Automation for Real Estate\n\nWhatsApp has over 500 million users in India...", published: false, createdAt: new Date().toISOString() },
    ];
    setStore("adsrahu_blogs", blogs);
  }
};

seed();

export const leadsStore = {
  get: (): Lead[] => getStore<Lead>("adsrahu_leads", []),
  save: (leads: Lead[]) => setStore("adsrahu_leads", leads),
  add: (lead: Omit<Lead, "id" | "createdAt">): Lead => {
    const leads = leadsStore.get();
    const newLead: Lead = { ...lead, id: Date.now().toString(), createdAt: new Date().toISOString() };
    leadsStore.save([newLead, ...leads]);
    return newLead;
  },
  update: (id: string, updates: Partial<Lead>): void => {
    leadsStore.save(leadsStore.get().map(l => l.id === id ? { ...l, ...updates } : l));
  },
  delete: (id: string): void => {
    leadsStore.save(leadsStore.get().filter(l => l.id !== id));
  },
};

export const blogsStore = {
  get: (): BlogPost[] => getStore<BlogPost>("adsrahu_blogs", []),
  save: (posts: BlogPost[]) => setStore("adsrahu_blogs", posts),
  add: (post: Omit<BlogPost, "id" | "createdAt">): BlogPost => {
    const posts = blogsStore.get();
    const newPost: BlogPost = { ...post, id: Date.now().toString(), createdAt: new Date().toISOString() };
    blogsStore.save([newPost, ...posts]);
    return newPost;
  },
  update: (id: string, updates: Partial<BlogPost>): void => {
    blogsStore.save(blogsStore.get().map(p => p.id === id ? { ...p, ...updates } : p));
  },
  delete: (id: string): void => {
    blogsStore.save(blogsStore.get().filter(p => p.id !== id));
  },
};

export const bookingsStore = {
  get: (): Booking[] => getStore<Booking>("adsrahu_bookings", []),
  save: (bookings: Booking[]) => setStore("adsrahu_bookings", bookings),
  update: (id: string, updates: Partial<Booking>): void => {
    bookingsStore.save(bookingsStore.get().map(b => b.id === id ? { ...b, ...updates } : b));
  },
  delete: (id: string): void => {
    bookingsStore.save(bookingsStore.get().filter(b => b.id !== id));
  },
};

export const subscribersStore = {
  get: (): Subscriber[] => getStore<Subscriber>("adsrahu_subscribers", []),
  save: (subs: Subscriber[]) => setStore("adsrahu_subscribers", subs),
  add: (email: string, name: string): Subscriber => {
    const subs = subscribersStore.get();
    const newSub: Subscriber = { id: Date.now().toString(), email, name, createdAt: new Date().toISOString() };
    subscribersStore.save([newSub, ...subs]);
    return newSub;
  },
  delete: (id: string): void => {
    subscribersStore.save(subscribersStore.get().filter(s => s.id !== id));
  },
};

export interface SiteSettings {
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

const SETTINGS_KEY = "adsrahu_site_settings";

export const settingsDefaults: SiteSettings = {
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

const SETTINGS_EVENT = "adsrahu-settings-changed";

export const settingsStore = {
  get: (): SiteSettings => {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      return raw ? { ...settingsDefaults, ...JSON.parse(raw) } : settingsDefaults;
    } catch {
      return settingsDefaults;
    }
  },
  save: (s: SiteSettings) => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
    window.dispatchEvent(new CustomEvent(SETTINGS_EVENT));
  },
  /** Strips non-digits for wa.me links (e.g. "+91 74850 22937" → "917485022937") */
  toWaNumber: (phone: string) => phone.replace(/\D/g, ""),
  /** Event name for listening to settings changes */
  EVENT: SETTINGS_EVENT,
};
