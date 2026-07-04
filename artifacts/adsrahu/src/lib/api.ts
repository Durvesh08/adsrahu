const BASE = "/api";

function getToken(): string {
  return localStorage.getItem("adsrahu_admin_token") ?? "";
}

function authHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getToken()}`,
  };
}

async function req<T>(method: string, path: string, body?: unknown, auth = false): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: auth ? authHeaders() : { "Content-Type": "application/json" },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  if (res.status === 204) return undefined as T;
  const data = await res.json();
  if (res.status === 401 && auth) {
    // Token expired or invalid — clear session and redirect to login
    localStorage.removeItem("adsrahu_admin_token");
    localStorage.removeItem("adsrahu_admin_expiry");
    sessionStorage.removeItem("adsrahu_admin_session");
    window.location.href = "/admin";
    throw new Error("Session expired. Please log in again.");
  }
  if (!res.ok) throw new Error(data.error ?? "Request failed");
  return data as T;
}

// ── Settings ───────────────────────────────────────────────────────────
export interface ApiSettings {
  id: number;
  heroHeading: string;
  heroSubheading: string;
  whatsappNumber: string;
  contactEmail: string;
  contactPhone: string;
  totalLeads: string;
  avgCpl: string;
  conversionRate: string;
  metaTitle: string;
  metaDescription: string;
}

export const settingsApi = {
  get: () => req<ApiSettings>("GET", "/settings"),
  save: (data: Omit<ApiSettings, "id">) => req<ApiSettings>("PUT", "/settings", data, true),
};

// ── Leads ────────────────────────────────────────────────────────────
export interface ApiLead {
  id: number;
  name: string;
  phone: string;
  email: string;
  city: string;
  source: string;
  status: string;
  notes: string;
  createdAt: string;
}

export const leadsApi = {
  getAll: () => req<ApiLead[]>("GET", "/leads", undefined, true),
  create: (data: Omit<ApiLead, "id" | "createdAt">) => req<ApiLead>("POST", "/leads", data),
  update: (id: number, data: Partial<ApiLead>) => req<ApiLead>("PATCH", `/leads/${id}`, data, true),
  delete: (id: number) => req<void>("DELETE", `/leads/${id}`, undefined, true),
};

// ── Bookings ───────────────────────────────────────────────────────────
export interface ApiBooking {
  id: number;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  status: string;
  notes: string;
  createdAt: string;
}

export const bookingsApi = {
  getAll: () => req<ApiBooking[]>("GET", "/bookings", undefined, true),
  create: (data: Omit<ApiBooking, "id" | "createdAt">) => req<ApiBooking>("POST", "/bookings", data),
  update: (id: number, data: Partial<ApiBooking>) => req<ApiBooking>("PATCH", `/bookings/${id}`, data, true),
  delete: (id: number) => req<void>("DELETE", `/bookings/${id}`, undefined, true),
};

// ── Blog ────────────────────────────────────────────────────────────
export interface ApiPost {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  published: boolean;
  createdAt: string;
  imageUrl?: string;
}

export const blogApi = {
  getAll: (publishedOnly = false) => req<ApiPost[]>("GET", `/blog${publishedOnly ? "?published=true" : ""}`),
  create: (data: Omit<ApiPost, "id" | "createdAt">) => req<ApiPost>("POST", "/blog", data, true),
  update: (id: number, data: Partial<ApiPost>) => req<ApiPost>("PUT", `/blog/${id}`, data, true),
  delete: (id: number) => req<void>("DELETE", `/blog/${id}`, undefined, true),
  generate: (topic: string, category: string, tone?: string, targetAudience?: string, keyPoints?: string) => 
    req<{title:string;slug:string;category:string;excerpt:string;content:string;imageUrl:string}>("POST", "/blog?action=generate", { topic, category, tone, targetAudience, keyPoints }, true),
};

// ── Subscribers ─────────────────────────────────────────────────────────
export interface ApiSubscriber {
  id: number;
  email: string;
  name: string;
  createdAt: string;
}

export const subscribersApi = {
  getAll: () => req<ApiSubscriber[]>("GET", "/subscribers", undefined, true),
  // Public endpoint - newsletter signup doesn't require authentication
  create: (email: string, name: string) => req<ApiSubscriber>("POST", "/subscribers", { email, name }),
  delete: (id: number) => req<void>("DELETE", `/subscribers/${id}`, undefined, true),
};
