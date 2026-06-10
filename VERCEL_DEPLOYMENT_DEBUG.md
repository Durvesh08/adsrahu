# Vercel Deployment Troubleshooting Guide

## 🚨 Why Vercel Deployment Is Failing

Based on your project structure, here are the **most common reasons** for deployment failures:

---

## **1. TypeScript Errors During Build** ⭐ PRIMARY CAUSE

Your `vercel.json` runs typecheck BEFORE build:

```json
"buildCommand": "pnpm --filter @workspace/adsrahu run build"
```

And your package.json has:
```json
"build": "vite build --config vite.config.ts",
"typecheck": "tsc -p tsconfig.json --noEmit"
```

**Common Errors:**
- Type errors in TypeScript files
- Missing type definitions
- Unused variables (if strict mode enabled)

**Fix:**
```bash
# Run locally to check for errors:
pnpm run typecheck
pnpm --filter @workspace/adsrahu run build
```

---

## **2. Missing Environment Variables** ⭐ LIKELY CAUSE FOR YOU

Vercel needs `DATABASE_URL` for API routes to work.

**Fix in Vercel Dashboard:**
1. Go to **Settings** → **Environment Variables**
2. Add: `DATABASE_URL` = your Neon connection string
3. Make sure it's set for `Production` environment
4. Redeploy

**Your API routes need:**
```typescript
// api/_lib/db.ts
const sql = neon(process.env.DATABASE_URL!);
// ↑ This will be undefined if not set in Vercel!
```

---

## **3. Monorepo Build Command Issues**

Your `vercel.json` specifies:
```json
"buildCommand": "pnpm --filter @workspace/adsrahu run build"
```

But Vercel might not have pnpm installed properly.

**Fix: Update vercel.json**
```json
{
  "buildCommand": "pnpm install && pnpm --filter @workspace/adsrahu run build",
  "outputDirectory": "artifacts/adsrahu/dist",
  "installCommand": "pnpm install --frozen-lockfile",
  "framework": null,
  "rewrites": [
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ]
}
```

---

## **4. API Routes Not Deployed**

Vercel needs API routes in specific directory:

**Current structure may be wrong:**
```
artifacts/adsrahu/api/  ← API files here (NOT deployed by default!)
```

**Correct structure for Vercel:**
```
api/  ← Must be at project root
├── blog.ts
├── leads.ts
├── settings.ts
└── _lib/
    └── db.ts
```

---

## **5. Node.js Version Mismatch**

Your `pnpm-lock.yaml` might require Node 18+, but Vercel using older version.

**Fix in vercel.json:**
```json
{
  "buildCommand": "pnpm --filter @workspace/adsrahu run build",
  "outputDirectory": "artifacts/adsrahu/dist",
  "installCommand": "pnpm install --frozen-lockfile",
  "framework": null,
  "nodeVersion": "18.x",
  "rewrites": [
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ]
}
```

---

## **How to Debug:**

### **Option 1: Check Vercel Logs (Easiest)**
1. Go to https://vercel.com/dashboard
2. Click on your project "adsrahu"
3. Go to **Deployments** tab
4. Click on the failed deployment
5. Scroll to **Build Logs** section
6. Read error message carefully
7. Share the error with me!

### **Option 2: Test Build Locally**
```bash
cd /path/to/repo

# Install dependencies
pnpm install

# Run typecheck
pnpm run typecheck

# Build the project
pnpm --filter @workspace/adsrahu run build

# Check for errors
```

### **Option 3: Verify Environment**
```bash
# Check if DATABASE_URL is accessible
echo $DATABASE_URL

# Make sure all env vars are in Vercel dashboard
# Go to: Settings → Environment Variables
```

---

## **Action Steps to Fix:**

1. **Check Vercel Dashboard logs** for the actual error message
2. **Add DATABASE_URL** to Vercel Environment Variables
3. **Update vercel.json** with proper configuration (see above)
4. **Test build locally** with `pnpm --filter @workspace/adsrahu run build`
5. **Check API routes location** - should they be at root `/api` instead of inside artifacts?
6. **Verify Node.js version** - set to 18.x in vercel.json

---

## **My Analysis of Your Setup:**

Your project structure is unusual:
```
adsrahu/ (root)
├── artifacts/
│   └── adsrahu/
│       ├── src/
│       ├── api/      ← API files buried here
│       ├── package.json
│       └── vercel.json
├── scripts/
└── package.json
```

**This might be the issue!** Vercel API routes should be at the root level, not inside `/artifacts/adsrahu/`.

---

## **Recommended Fix: Move API Routes**

```bash
# Move API to root level
mv artifacts/adsrahu/api ./api

# Update vercel.json at root:
{
  "buildCommand": "pnpm run build",
  "outputDirectory": "artifacts/adsrahu/dist",
  "installCommand": "pnpm install --frozen-lockfile",
  "rewrites": [
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ]
}
```

---

## **Next Steps:**

1. **Share the error message** from Vercel Dashboard logs
2. **Add DATABASE_URL** to Vercel environment variables
3. **Run local build test** to confirm it works
4. **Redeploy** after fixes

Once you share the actual error, I can provide more specific solutions! 🚀
