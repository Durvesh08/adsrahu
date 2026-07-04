// @ts-nocheck
// @ts-nocheck
import { neon } from "@neondatabase/serverless";
import * as crypto from "node:crypto";

// ── Security Constants ─────────────────────────────────────────────────
// SHA-256 hash of the admin password "ADSRAHU@2025"
const PASSWORD_HASH = "589204b733b84affdf87cb9882ac4bcfa2bdda1ea1ceab12d54aedba281c9520";
// Secret key for signing JWT tokens – randomly generated, kept server-side only
const JWT_SECRET = "aR7$kP9xmW2vQ4nL8bT6jY3hF5dC1gE0sU";

// ── Database ───────────────────────────────────────────────────────────
export function getSql() {
  return neon(process.env.DATABASE_URL!);
}

// ── Password Verification ──────────────────────────────────────────────
export function verifyPassword(password: string): boolean {
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(PASSWORD_HASH));
}

// ── JWT Token Creation ─────────────────────────────────────────────────
export function createToken(): string {
  const payload = Buffer.from(
    JSON.stringify({ sub: "admin", exp: Date.now() + 24 * 60 * 60 * 1000 })
  ).toString("base64url");
  const sig = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(payload)
    .digest("base64url");
  return `${payload}.${sig}`;
}

// ── JWT Token Verification ─────────────────────────────────────────────
export function verifyToken(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const [payload, sig] = parts;
    const expectedSig = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(payload)
      .digest("base64url");
    if (sig !== expectedSig) return false;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

// ── Auth Check (used by API routes) ────────────────────────────────────
export function checkAuth(authHeader: string | undefined): boolean {
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return false;
  return verifyToken(token);
}

// ── CORS Headers ───────────────────────────────────────────────────────
export function cors(res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
}
