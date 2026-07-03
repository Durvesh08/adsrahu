import { cors, verifyPassword, createToken } from "../_lib/db";

export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === "OPTIONS") { res.status(200).end(); return; }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { password } = req.body ?? {};

  if (!password || typeof password !== "string") {
    res.status(400).json({ error: "Password is required" });
    return;
  }

  if (!verifyPassword(password)) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }

  const token = createToken();
  res.status(200).json({ token });
}
