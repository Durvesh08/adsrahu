// @ts-nocheck
import { cors } from "./_lib/db.js";

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === "OPTIONS") { res.status(200).end(); return; }
  res.status(200).json({ status: "ok" });
}
