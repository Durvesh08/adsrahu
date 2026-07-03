import type { Request, Response, NextFunction } from "express";
import crypto from "crypto";

// SHA-256 hash of the admin password "ADSRAHU@2025"
const PASSWORD_HASH = "589204b733b84affdf87cb9882ac4bcfa2bdda1ea1ceab12d54aedba281c9520";
// Secret key for signing JWT tokens – must match the key in api/_lib/db.ts
const JWT_SECRET = "aR7$kP9xmW2vQ4nL8bT6jY3hF5dC1gE0sU";

function verifyToken(token: string): boolean {
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

export function adminAuth(req: Request, res: Response, next: NextFunction): void {
  const auth = req.headers["authorization"] ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token || !verifyToken(token)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

// Exported for use in the auth route
export { PASSWORD_HASH, JWT_SECRET };
