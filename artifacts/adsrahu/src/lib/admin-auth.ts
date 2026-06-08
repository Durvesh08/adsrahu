const SESSION_KEY = "adsrahu_admin_session";
const TOKEN_KEY = "adsrahu_admin_token";
const ADMIN_PASSWORD = "adsrahu@2024";

export function login(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(SESSION_KEY, "true");
    localStorage.setItem(TOKEN_KEY, password);
    return true;
  }
  return false;
}

export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === "true";
}
