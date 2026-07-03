import { Router, type IRouter } from "express";
import crypto from "crypto";
import { PASSWORD_HASH, JWT_SECRET } from "../middlewares/adminAuth";

const router: IRouter = Router();

router.post("/auth/login", (req, res): void => {
  const { password } = req.body ?? {};

  if (!password || typeof password !== "string") {
    res.status(400).json({ error: "Password is required" });
    return;
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const isValid = crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(PASSWORD_HASH));

  if (!isValid) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }

  // Create HMAC-signed token with 24-hour expiry
  const payload = Buffer.from(
    JSON.stringify({ sub: "admin", exp: Date.now() + 24 * 60 * 60 * 1000 })
  ).toString("base64url");
  const sig = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(payload)
    .digest("base64url");
  const token = `${payload}.${sig}`;

  res.status(200).json({ token });
});

export default router;
