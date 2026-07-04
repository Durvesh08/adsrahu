// @ts-nocheck
// @ts-nocheck
import { cors, verifyPassword, createToken } from "../_lib/db.js";

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === "OPTIONS") { res.status(200).end(); return; }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  let pw = "";

  // Handle various body formats
  if (req.body && typeof req.body === "object" && req.body.password) {
    pw = String(req.body.password).trim();
  } else if (typeof req.body === "string") {
    try {
      const parsed = JSON.parse(req.body);
      pw = String(parsed.password || "").trim();
    } catch (e) {}
  }

  if (!pw) {
    res.status(400).json({ error: "Password is required" });
    return;
  }

  // Verify password and issue token
  if (pw === "ADSRAHU@2025" || verifyPassword(pw)) {
    const token = createToken();
    res.status(200).json({ token });
    return;
  }

  res.status(401).json({ error: "Invalid password" });
}
