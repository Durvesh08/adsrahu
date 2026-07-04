"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSql = getSql;
exports.verifyPassword = verifyPassword;
exports.createToken = createToken;
exports.verifyToken = verifyToken;
exports.checkAuth = checkAuth;
exports.cors = cors;
// @ts-nocheck
// @ts-nocheck
var serverless_1 = require("@neondatabase/serverless");
var crypto_1 = require("crypto");
// ── Security Constants ─────────────────────────────────────────────────
// SHA-256 hash of the admin password "ADSRAHU@2025"
var PASSWORD_HASH = "589204b733b84affdf87cb9882ac4bcfa2bdda1ea1ceab12d54aedba281c9520";
// Secret key for signing JWT tokens – randomly generated, kept server-side only
var JWT_SECRET = "aR7$kP9xmW2vQ4nL8bT6jY3hF5dC1gE0sU";
// ── Database ───────────────────────────────────────────────────────────
function getSql() {
    return (0, serverless_1.neon)(process.env.DATABASE_URL);
}
// ── Password Verification ──────────────────────────────────────────────
function verifyPassword(password) {
    var hash = crypto_1.default.createHash("sha256").update(password).digest("hex");
    return crypto_1.default.timingSafeEqual(Buffer.from(hash), Buffer.from(PASSWORD_HASH));
}
// ── JWT Token Creation ─────────────────────────────────────────────────
function createToken() {
    var payload = Buffer.from(JSON.stringify({ sub: "admin", exp: Date.now() + 24 * 60 * 60 * 1000 })).toString("base64url");
    var sig = crypto_1.default
        .createHmac("sha256", JWT_SECRET)
        .update(payload)
        .digest("base64url");
    return "".concat(payload, ".").concat(sig);
}
// ── JWT Token Verification ─────────────────────────────────────────────
function verifyToken(token) {
    try {
        var parts = token.split(".");
        if (parts.length !== 2)
            return false;
        var payload = parts[0], sig = parts[1];
        var expectedSig = crypto_1.default
            .createHmac("sha256", JWT_SECRET)
            .update(payload)
            .digest("base64url");
        if (sig !== expectedSig)
            return false;
        var data = JSON.parse(Buffer.from(payload, "base64url").toString());
        return typeof data.exp === "number" && data.exp > Date.now();
    }
    catch (_a) {
        return false;
    }
}
// ── Auth Check (used by API routes) ────────────────────────────────────
function checkAuth(authHeader) {
    var token = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer ")) ? authHeader.slice(7) : "";
    if (!token)
        return false;
    return verifyToken(token);
}
// ── CORS Headers ───────────────────────────────────────────────────────
function cors(res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
}
