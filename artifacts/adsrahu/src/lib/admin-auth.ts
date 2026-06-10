const SESSION_KEY = "adsrahu_admin_session";
const TOKEN_KEY   = "adsrahu_admin_token";
const EXPIRY_KEY  = "adsrahu_admin_expiry";
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export async function login(password: string): Promise<boolean> {
  try {
    // Always validate with backend - never trust client-side password validation
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    if (data.token) {
      sessionStorage.setItem(SESSION_KEY, "true");
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(EXPIRY_KEY, String(Date.now() + TOKEN_EXPIRY_MS));
      return true;
    }
    return false;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
}

export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRY_KEY);
}

export function isAuthenticated(): boolean {
  // Check if token exists
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return false;

  // Check if token has expired
  const expiry = localStorage.getItem(EXPIRY_KEY);
  if (expiry && Date.now() > parseInt(expiry)) {
    logout();
    return false;
  }

  // Check active session
  if (sessionStorage.getItem(SESSION_KEY) === "true") return true;

  // Re-authenticate if session lost but token valid
  sessionStorage.setItem(SESSION_KEY, "true");
  return true;
}

export function getToken(): string {
  return localStorage.getItem(TOKEN_KEY) ?? "";
}
