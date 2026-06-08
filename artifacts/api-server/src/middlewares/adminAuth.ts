import type { Request, Response, NextFunction } from "express";

const ADMIN_PASSWORD = "adsrahu@2024";

export function adminAuth(req: Request, res: Response, next: NextFunction): void {
  const auth = req.headers["authorization"] ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (token !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}
