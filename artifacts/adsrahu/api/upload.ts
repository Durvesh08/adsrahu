// @ts-nocheck
import { checkAuth, cors } from "./_lib/db.js";

export const config = {
  api: { bodyParser: { sizeLimit: "4mb" } },
};

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === "OPTIONS") { res.status(200).end(); return; }
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }
  if (!checkAuth(req.headers["authorization"])) { res.status(401).json({ error: "Unauthorized" }); return; }

  let b = req.body ?? {};
  if (typeof b === "string") {
    try { b = JSON.parse(b); } catch (e) {}
  }

  const { data, filename } = b;
  if (!data) {
    res.status(400).json({ error: "No image data provided" });
    return;
  }

  // data is expected to be a base64 data URL like "data:image/jpeg;base64,..."
  // We just pass it through — it will be stored as the imageUrl in the blog post
  res.status(200).json({ url: data, filename: filename || "uploaded-image" });
}
