const ADMIN_KEY = "adsrahu_admin_session";
const ADMIN_PASSWORD = "adsrahu@2024";

export function login(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(ADMIN_KEY, "true");
    return true;
  }
  return false;
}

export function logout(): void {
  sessionStorage.removeItem(ADMIN_KEY);
}

export function isAuthenticated(): boolean {
  return sessionStorage.getItem(ADMIN_KEY) === "true";
}
