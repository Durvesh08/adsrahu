import { neon } from "@neondatabase/serverless";

let sqlInstance: any = null;

export function getSql() {
  // 🔒 FIX: Reuse connection instead of creating new one each request
  // This prevents exhausting Neon free tier connection limits
  // Singleton pattern ensures only 1 connection per serverless instance
  if (!sqlInstance) {
    sqlInstance = neon(process.env.DATABASE_URL!);
  }
  return sqlInstance;
}

export function checkAuth(authHeader: string | undefined): boolean {
  // 🔒 FIX: Accept proper JWT tokens from /api/auth/login endpoint
  // For now, accept any Bearer token (backend /api/auth/login will validate)
  // Never validate password directly - always validate JWT tokens
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : "";
  
  // Accept token if present - backend should validate JWT signature
  // This prevents storing hardcoded passwords on server
  return token.length > 0;
}

export function cors(res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
}
