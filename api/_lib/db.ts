import { neon } from "@neondatabase/serverless";

const ADMIN_PASSWORD = "adsrahu@2024";

export function getSql() {
  return neon(process.env.DATABASE_URL!);
}

export function checkAuth(authHeader: string | undefined): boolean {
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : "";
  return token === ADMIN_PASSWORD;
}

export function cors(res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
}
