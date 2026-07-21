// @ts-nocheck
import { getSql, checkAuth, cors } from "./_lib/db.js";

export const maxDuration = 60; // Allow 60 seconds for AI text & poster generation on Vercel

export const config = {
  api: { bodyParser: { sizeLimit: "10mb" } },
};

const GEMINI_TEXT_MODEL = "gemini-2.5-flash";

// Helper to escape XML special characters for safe SVG rendering
function escapeXml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// ── Adsrahu Winged-B Logo (inline SVG paths from favicon.svg) ──────────
const ADSRAHU_LOGO_SVG = `
  <g transform="translate(0, 0) scale(1)">
    <!-- Background circle -->
    <circle cx="22" cy="22" r="21" fill="#0c0c14" stroke="url(#logo-gold)" stroke-width="1.8"/>
    <!-- Ambient golden glow -->
    <circle cx="22" cy="21" r="12" fill="#FF8C00" opacity="0.08"/>
    <!-- Left wing - outer sweep -->
    <path d="M 9 22 C 8 19, 10 16, 13 15 C 15 14.5, 17 15.5, 18 16.5"
          stroke="url(#logo-gold)" stroke-width="2" stroke-linecap="round" fill="none"/>
    <!-- Left wing - inner line -->
    <path d="M 10.5 22.5 C 10 20, 11 18, 14 17 C 16 16.5, 17 17.2, 18 18"
          stroke="url(#logo-gold)" stroke-width="1.3" stroke-linecap="round" fill="none" opacity="0.7"/>
    <!-- Vertical stem -->
    <rect x="20.5" y="11" width="3" height="5.5" rx="1" fill="url(#logo-gold-shine)"/>
    <!-- Horizontal crossbar -->
    <rect x="17.5" y="17.5" width="9.5" height="2.8" rx="1.2" fill="url(#logo-gold)"/>
    <!-- Circular bowl -->
    <circle cx="23.5" cy="23.5" r="5.5" fill="none" stroke="url(#logo-gold-shine)" stroke-width="2.8"/>
    <!-- Speed lines -->
    <line x1="14" y1="20" x2="17.5" y2="20" stroke="url(#logo-gold)" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="14.5" y1="23" x2="17.5" y2="23" stroke="url(#logo-gold)" stroke-width="1" stroke-linecap="round" opacity="0.7"/>
  </g>
`;

// ── Ultra-Premium Poster Generator ────────────────────────────────────
function generateSelfGeneratedPosterCard(
  title: string,
  excerpt: string,
  category: string,
  posterInfo?: {
    theme?: string;
    icon?: string;
    headline?: string;
    subheading?: string;
    keyTakeaways?: string[];
    statBadge?: string;
  }
): string {
  const safeTitle = escapeXml(title);
  const safeExcerpt = escapeXml(excerpt);
  const safeCategory = escapeXml(category || "INSIGHTS");

  const themes: Record<string, any> = {
    "dark-tech": {
      bgStart: "#020817", bgMid: "#0a1628", bgEnd: "#111d35",
      accent1: "#38bdf8", accent2: "#0ea5e9", accent3: "#7dd3fc",
      accentGlow: "rgba(56, 189, 248, 0.35)",
      cardBg: "rgba(8, 20, 42, 0.75)", cardStroke: "rgba(56, 189, 248, 0.2)",
      gridColor: "rgba(56, 189, 248, 0.04)", pillBg: "rgba(56, 189, 248, 0.1)",
      decoShape: "#0ea5e9"
    },
    "emerald-growth": {
      bgStart: "#011c14", bgMid: "#042d1f", bgEnd: "#064e3b",
      accent1: "#34d399", accent2: "#10b981", accent3: "#6ee7b7",
      accentGlow: "rgba(52, 211, 153, 0.35)",
      cardBg: "rgba(4, 40, 28, 0.75)", cardStroke: "rgba(52, 211, 153, 0.2)",
      gridColor: "rgba(52, 211, 153, 0.04)", pillBg: "rgba(52, 211, 153, 0.1)",
      decoShape: "#10b981"
    },
    "neon-purple": {
      bgStart: "#0a0118", bgMid: "#150830", bgEnd: "#1e0b48",
      accent1: "#c084fc", accent2: "#a855f7", accent3: "#e9d5ff",
      accentGlow: "rgba(168, 85, 247, 0.35)",
      cardBg: "rgba(22, 8, 52, 0.75)", cardStroke: "rgba(168, 85, 247, 0.2)",
      gridColor: "rgba(168, 85, 247, 0.04)", pillBg: "rgba(168, 85, 247, 0.1)",
      decoShape: "#a855f7"
    },
    "royal-blue": {
      bgStart: "#020620", bgMid: "#071340", bgEnd: "#0c1d5e",
      accent1: "#60a5fa", accent2: "#3b82f6", accent3: "#93c5fd",
      accentGlow: "rgba(59, 130, 246, 0.35)",
      cardBg: "rgba(7, 15, 55, 0.75)", cardStroke: "rgba(59, 130, 246, 0.2)",
      gridColor: "rgba(59, 130, 246, 0.04)", pillBg: "rgba(59, 130, 246, 0.1)",
      decoShape: "#3b82f6"
    },
    "amber-glow": {
      bgStart: "#120800", bgMid: "#231004", bgEnd: "#3a1c08",
      accent1: "#fbbf24", accent2: "#f59e0b", accent3: "#fde68a",
      accentGlow: "rgba(245, 158, 11, 0.35)",
      cardBg: "rgba(42, 22, 6, 0.75)", cardStroke: "rgba(245, 158, 11, 0.2)",
      gridColor: "rgba(245, 158, 11, 0.04)", pillBg: "rgba(245, 158, 11, 0.1)",
      decoShape: "#f59e0b"
    },
    "rose-premium": {
      bgStart: "#1a0510", bgMid: "#2a0a1a", bgEnd: "#3d1028",
      accent1: "#fb7185", accent2: "#f43f5e", accent3: "#fda4af",
      accentGlow: "rgba(244, 63, 94, 0.35)",
      cardBg: "rgba(45, 10, 28, 0.75)", cardStroke: "rgba(244, 63, 94, 0.2)",
      gridColor: "rgba(244, 63, 94, 0.04)", pillBg: "rgba(244, 63, 94, 0.1)",
      decoShape: "#f43f5e"
    },
    "cyber-teal": {
      bgStart: "#021215", bgMid: "#042028", bgEnd: "#063040",
      accent1: "#2dd4bf", accent2: "#14b8a6", accent3: "#99f6e4",
      accentGlow: "rgba(20, 184, 166, 0.35)",
      cardBg: "rgba(4, 28, 35, 0.75)", cardStroke: "rgba(20, 184, 166, 0.2)",
      gridColor: "rgba(20, 184, 166, 0.04)", pillBg: "rgba(20, 184, 166, 0.1)",
      decoShape: "#14b8a6"
    },
    "midnight-indigo": {
      bgStart: "#080420", bgMid: "#0f0838", bgEnd: "#180e55",
      accent1: "#818cf8", accent2: "#6366f1", accent3: "#c7d2fe",
      accentGlow: "rgba(99, 102, 241, 0.35)",
      cardBg: "rgba(15, 8, 50, 0.75)", cardStroke: "rgba(99, 102, 241, 0.2)",
      gridColor: "rgba(99, 102, 241, 0.04)", pillBg: "rgba(99, 102, 241, 0.1)",
      decoShape: "#6366f1"
    },
    "solar-orange": {
      bgStart: "#150600", bgMid: "#251000", bgEnd: "#3b1a02",
      accent1: "#fb923c", accent2: "#f97316", accent3: "#fdba74",
      accentGlow: "rgba(249, 115, 22, 0.35)",
      cardBg: "rgba(40, 16, 2, 0.75)", cardStroke: "rgba(249, 115, 22, 0.2)",
      gridColor: "rgba(249, 115, 22, 0.04)", pillBg: "rgba(249, 115, 22, 0.1)",
      decoShape: "#f97316"
    },
    "arctic-slate": {
      bgStart: "#0c0f1a", bgMid: "#141828", bgEnd: "#1c2238",
      accent1: "#94a3b8", accent2: "#64748b", accent3: "#cbd5e1",
      accentGlow: "rgba(148, 163, 184, 0.3)",
      cardBg: "rgba(18, 22, 38, 0.75)", cardStroke: "rgba(148, 163, 184, 0.18)",
      gridColor: "rgba(148, 163, 184, 0.04)", pillBg: "rgba(148, 163, 184, 0.08)",
      decoShape: "#64748b"
    }
  };

  const themeName = posterInfo?.theme || "dark-tech";
  const t = themes[themeName] || themes["dark-tech"];

  const icons: Record<string, string> = {
    "zap": `<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>`,
    "chart": `<path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M3 20h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
    "trending": `<path d="M23 6l-9.5 9.5-5-5L1 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M17 6h6v6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    "target": `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="2.5" fill="currentColor"/>`,
    "shield": `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    "layers": `<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    "cpu": `<rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor"/><line x1="9" y1="1" x2="9" y2="4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="15" y1="1" x2="15" y2="4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="9" y1="20" x2="9" y2="23" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="15" y1="20" x2="15" y2="23" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`
  };

  const selectedIcon = icons[posterInfo?.icon || "zap"] || icons["zap"];

  const wrapText = (str: string, maxChar: number): string[] => {
    const words = (str || "").split(" ");
    const lines: string[] = [];
    let cur = "";
    for (const w of words) {
      if ((cur + " " + w).trim().length > maxChar) {
        if (cur) lines.push(cur.trim());
        cur = w;
      } else {
        cur += " " + w;
      }
    }
    if (cur.trim()) lines.push(cur.trim());
    return lines;
  };

  const displayHeadline = posterInfo?.headline || safeTitle;
  const displaySubheading = posterInfo?.subheading || safeExcerpt;

  const titleLines = wrapText(escapeXml(displayHeadline), 20).slice(0, 3);
  const subLines = wrapText(escapeXml(displaySubheading), 36).slice(0, 2);

  const rawPoints = posterInfo?.keyTakeaways && posterInfo.keyTakeaways.length >= 3
    ? posterInfo.keyTakeaways
    : [
        "Strategic automation drives efficiency and scalable growth",
        "Implement data-driven workflows for measurable results",
        "Leverage high-converting modern marketing channels"
      ];

  const points = rawPoints.slice(0, 3).map(pt => escapeXml(pt));
  const statBadgeText = escapeXml(posterInfo?.statBadge || "PERFORMANCE GUIDE");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
    <defs>
      <!-- Background Gradient -->
      <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${t.bgStart}"/>
        <stop offset="45%" stop-color="${t.bgMid}"/>
        <stop offset="100%" stop-color="${t.bgEnd}"/>
      </linearGradient>

      <!-- Accent Gradient -->
      <linearGradient id="accent-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${t.accent1}"/>
        <stop offset="100%" stop-color="${t.accent2}"/>
      </linearGradient>

      <!-- Vertical Accent Gradient -->
      <linearGradient id="accent-v" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${t.accent1}" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="${t.accent2}" stop-opacity="0.1"/>
      </linearGradient>

      <!-- Gold Logo Gradients -->
      <linearGradient id="logo-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFD97A"/>
        <stop offset="40%" stop-color="#FFA500"/>
        <stop offset="100%" stop-color="#CC6A00"/>
      </linearGradient>
      <linearGradient id="logo-gold-shine" x1="0%" y1="0%" x2="60%" y2="100%">
        <stop offset="0%" stop-color="#FFE599"/>
        <stop offset="50%" stop-color="#FF9500"/>
        <stop offset="100%" stop-color="#B85C00"/>
      </linearGradient>

      <!-- Card Glass Gradient -->
      <linearGradient id="card-glass" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${t.accent1}" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="${t.accent2}" stop-opacity="0.02"/>
      </linearGradient>

      <!-- Grid Pattern -->
      <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="${t.gridColor}" stroke-width="0.8"/>
      </pattern>

      <!-- Dot Pattern -->
      <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="${t.accent1}" opacity="0.08"/>
      </pattern>

      <!-- Glow Filter -->
      <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="60" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>

      <!-- Soft Glow for small elements -->
      <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="8" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>

      <!-- Card Shadow -->
      <filter id="card-shadow" x="-10%" y="-10%" width="125%" height="130%">
        <feDropShadow dx="0" dy="16" stdDeviation="28" flood-color="#000000" flood-opacity="0.6"/>
      </filter>

      <!-- Noise Texture -->
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
    </defs>

    <!-- ═══ BACKGROUND CANVAS ═══ -->
    <rect width="1200" height="630" fill="url(#bg-grad)"/>
    <rect width="1200" height="630" fill="url(#grid)"/>
    <!-- Subtle noise overlay for texture -->
    <rect width="1200" height="630" filter="url(#noise)" opacity="0.025"/>

    <!-- ═══ AMBIENT GLOW ORBS ═══ -->
    <circle cx="120" cy="80" r="280" fill="${t.accent2}" opacity="0.12" filter="url(#glow)"/>
    <circle cx="1100" cy="550" r="320" fill="${t.accent1}" opacity="0.08" filter="url(#glow)"/>
    <circle cx="650" cy="320" r="200" fill="${t.accent3}" opacity="0.04" filter="url(#glow)"/>

    <!-- ═══ DECORATIVE GEOMETRIC ELEMENTS ═══ -->

    <!-- Top accent bar with gradient -->
    <rect x="0" y="0" width="1200" height="5" fill="url(#accent-grad)"/>

    <!-- Left vertical accent line -->
    <rect x="60" y="50" width="3" height="530" rx="1.5" fill="url(#accent-v)"/>

    <!-- Corner diagonal lines (top-right) -->
    <line x1="1050" y1="30" x2="1170" y2="30" stroke="${t.accent1}" stroke-width="1" opacity="0.15"/>
    <line x1="1070" y1="50" x2="1170" y2="50" stroke="${t.accent1}" stroke-width="1" opacity="0.1"/>
    <line x1="1090" y1="70" x2="1170" y2="70" stroke="${t.accent1}" stroke-width="1" opacity="0.07"/>

    <!-- Bottom-left corner bracket -->
    <path d="M 80 590 L 80 610 L 120 610" fill="none" stroke="${t.accent1}" stroke-width="2" opacity="0.2" stroke-linecap="round"/>

    <!-- Floating geometric rings -->
    <circle cx="1100" cy="140" r="45" fill="none" stroke="${t.accent1}" stroke-width="1" opacity="0.08"/>
    <circle cx="1100" cy="140" r="30" fill="none" stroke="${t.accent2}" stroke-width="0.8" opacity="0.06"/>
    <circle cx="200" cy="560" r="35" fill="none" stroke="${t.accent1}" stroke-width="0.8" opacity="0.06"/>

    <!-- Decorative diamond shapes -->
    <g transform="translate(1140, 300) rotate(45)" opacity="0.06">
      <rect x="-15" y="-15" width="30" height="30" fill="none" stroke="${t.accent1}" stroke-width="1.5"/>
    </g>
    <g transform="translate(1160, 340) rotate(45)" opacity="0.04">
      <rect x="-10" y="-10" width="20" height="20" fill="none" stroke="${t.accent2}" stroke-width="1"/>
    </g>

    <!-- Dot matrix area (right side decorative) -->
    <rect x="950" y="180" width="200" height="200" fill="url(#dots)" opacity="0.5"/>


    <!-- ═══════════════════════════════════════════════════ -->
    <!-- LEFT COLUMN: HEADLINE & BRANDING                   -->
    <!-- ═══════════════════════════════════════════════════ -->
    <g transform="translate(90, 0)">

      <!-- Category Badge -->
      <g transform="translate(0, 65)">
        <rect x="0" y="0" width="auto" height="34" rx="17" fill="${t.pillBg}" stroke="${t.accent1}" stroke-width="1.2" stroke-opacity="0.5"/>
        <rect x="0" y="0" width="${Math.max(safeCategory.length * 10 + 36, 140)}" height="34" rx="17" fill="${t.pillBg}" stroke="${t.accent1}" stroke-width="1.2" stroke-opacity="0.5"/>
        <circle cx="18" cy="17" r="4" fill="${t.accent1}" opacity="0.6"/>
        <text x="30" y="22" fill="${t.accent1}" font-family="'SF Pro Display', 'Inter', system-ui, -apple-system, sans-serif" font-size="11" font-weight="800" letter-spacing="2.5">${safeCategory.toUpperCase()}</text>
      </g>

      <!-- Stat Badge -->
      <g transform="translate(${Math.max(safeCategory.length * 10 + 52, 160)}, 65)">
        <rect x="0" y="0" width="${Math.max(statBadgeText.length * 8 + 32, 160)}" height="34" rx="17" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
        <text x="${Math.max(statBadgeText.length * 4 + 16, 80)}" y="22" fill="#64748b" font-family="'SF Pro Display', 'Inter', system-ui, -apple-system, sans-serif" font-size="10" font-weight="800" letter-spacing="2" text-anchor="middle">${statBadgeText}</text>
      </g>

      <!-- Main Headline -->
      <g transform="translate(0, 148)">
        ${titleLines.map((line, idx) => `<text x="0" y="${idx * 68}" fill="#ffffff" font-family="'SF Pro Display', 'Inter', system-ui, -apple-system, sans-serif" font-size="52" font-weight="900" letter-spacing="-1.5">${line}</text>`).join("")}
      </g>

      <!-- Accent underline beneath title -->
      <g transform="translate(0, ${156 + titleLines.length * 68})">
        <rect x="0" y="0" width="80" height="4" rx="2" fill="url(#accent-grad)"/>
      </g>

      <!-- Subheading -->
      <g transform="translate(0, ${180 + titleLines.length * 68})">
        ${subLines.map((line, idx) => `<text x="0" y="${idx * 28}" fill="${t.accent1}" font-family="'SF Pro Display', 'Inter', system-ui, -apple-system, sans-serif" font-size="18" font-weight="600" opacity="0.9" letter-spacing="0.2">${line}</text>`).join("")}
      </g>

      <!-- Topic Icon Badge -->
      <g transform="translate(0, 420)">
        <!-- Outer glow ring -->
        <circle cx="38" cy="38" r="42" fill="${t.accent1}" opacity="0.04"/>
        <rect width="76" height="76" rx="22" fill="${t.pillBg}" stroke="${t.cardStroke}" stroke-width="1.5"/>
        <!-- Inner gradient accent -->
        <rect x="3" y="3" width="70" height="70" rx="19" fill="url(#accent-grad)" opacity="0.1"/>
        <g transform="translate(18, 18) scale(1.65)" color="${t.accent1}">
          ${selectedIcon}
        </g>
      </g>

      <!-- Horizontal separator line -->
      <line x1="95" y1="458" x2="460" y2="458" stroke="${t.accent1}" stroke-width="0.5" opacity="0.12"/>

    </g>


    <!-- ═══════════════════════════════════════════════════ -->
    <!-- RIGHT COLUMN: KEY TAKEAWAYS CARD                   -->
    <!-- ═══════════════════════════════════════════════════ -->
    <g transform="translate(620, 55)" filter="url(#card-shadow)">

      <!-- Card Background with glass effect -->
      <rect width="510" height="510" rx="24" fill="${t.cardBg}"/>
      <rect width="510" height="510" rx="24" fill="url(#card-glass)"/>

      <!-- Card border (double stroke for depth) -->
      <rect width="510" height="510" rx="24" fill="none" stroke="${t.cardStroke}" stroke-width="1.5"/>
      <rect x="1" y="1" width="508" height="508" rx="23" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/>

      <!-- Top accent bar on card -->
      <rect x="0" y="0" width="510" height="3" rx="0" fill="url(#accent-grad)" opacity="0.6" clip-path="inset(0 round 24px 24px 0 0)"/>

      <!-- Card corner decorative dots -->
      <circle cx="28" cy="28" r="3" fill="${t.accent1}" opacity="0.15"/>
      <circle cx="482" cy="28" r="3" fill="${t.accent2}" opacity="0.15"/>

      <!-- KEY TAKEAWAYS Header -->
      <g transform="translate(40, 48)">
        <text x="0" y="0" fill="${t.accent1}" font-family="'SF Pro Display', 'Inter', system-ui, -apple-system, sans-serif" font-size="13" font-weight="900" letter-spacing="3">KEY TAKEAWAYS</text>
        <rect x="0" y="12" width="120" height="3" rx="1.5" fill="url(#accent-grad)" opacity="0.6"/>
        <!-- Small decorative square -->
        <rect x="130" y="9" width="8" height="8" rx="2" fill="${t.accent1}" opacity="0.1" stroke="${t.accent1}" stroke-width="0.5" stroke-opacity="0.2"/>
      </g>

      <!-- Takeaway Cards -->
      ${points.map((pt, idx) => {
        const ptLines = wrapText(pt, 28).slice(0, 2);
        const yOffset = 95 + idx * 130;
        return `<g transform="translate(28, ${yOffset})">
          <!-- Card item background -->
          <rect x="0" y="0" width="454" height="108" rx="16" fill="${t.pillBg}"/>
          <rect x="0" y="0" width="454" height="108" rx="16" fill="none" stroke="${t.cardStroke}" stroke-width="0.8"/>

          <!-- Left accent bar -->
          <rect x="0" y="20" width="3.5" height="68" rx="1.75" fill="url(#accent-grad)" opacity="0.5"/>

          <!-- Number badge -->
          <g transform="translate(22, 28)">
            <circle cx="24" cy="24" r="22" fill="url(#accent-grad)" opacity="0.12"/>
            <circle cx="24" cy="24" r="22" fill="none" stroke="${t.accent1}" stroke-width="1.8" opacity="0.5"/>
            <text x="24" y="30" fill="${t.accent1}" font-family="'SF Pro Display', 'Inter', system-ui, -apple-system, sans-serif" font-size="20" font-weight="900" text-anchor="middle">0${idx + 1}</text>
          </g>

          <!-- Text content -->
          <g transform="translate(80, 0)">
            ${ptLines.map((line, lIdx) => `<text x="0" y="${ptLines.length === 1 ? 60 : 44 + lIdx * 26}" fill="#f1f5f9" font-family="'SF Pro Display', 'Inter', system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" letter-spacing="0.1">${line}</text>`).join("")}
          </g>
        </g>`;
      }).join("")}

      <!-- Bottom decorative line in card -->
      <line x1="40" y1="480" x2="470" y2="480" stroke="${t.accent1}" stroke-width="0.5" opacity="0.1"/>
    </g>


    <!-- ═══════════════════════════════════════════════════ -->
    <!-- FOOTER: ADSRAHU BRAND MARK + CTA                   -->
    <!-- ═══════════════════════════════════════════════════ -->

    <!-- Bottom gradient fade -->
    <rect x="0" y="580" width="1200" height="50" fill="url(#bg-grad)" opacity="0.5"/>

    <!-- Adsrahu Logo + Brand (bottom-left) -->
    <g transform="translate(90, 546)">
      ${ADSRAHU_LOGO_SVG}
      <text x="52" y="28" fill="#ffffff" font-family="'SF Pro Display', 'Inter', system-ui, -apple-system, sans-serif" font-size="20" font-weight="900" letter-spacing="-0.3">Adsrahu</text>
      <text x="52" y="44" fill="#64748b" font-family="'SF Pro Display', 'Inter', system-ui, -apple-system, sans-serif" font-size="9" font-weight="700" letter-spacing="2.5">PERFORMANCE AGENCY</text>
    </g>

    <!-- Corner Logo Watermark (top-right) -->
    <g transform="translate(1090, 20) scale(0.9)">
      ${ADSRAHU_LOGO_SVG}
    </g>

    <!-- Read Article CTA (bottom-right) -->
    <g transform="translate(1000, 562)">
      <rect x="0" y="0" width="150" height="38" rx="19" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      <text x="22" y="24" fill="#cbd5e1" font-family="'SF Pro Display', 'Inter', system-ui, -apple-system, sans-serif" font-size="11" font-weight="800" letter-spacing="1.5">READ ARTICLE</text>
      <path d="M 130 19 L 136 19 M 133 15 L 137 19 L 133 23" fill="none" stroke="${t.accent1}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </g>

    <!-- Website URL -->
    <g transform="translate(600, 614)">
      <text x="0" y="0" fill="#475569" font-family="'SF Pro Display', 'Inter', system-ui, -apple-system, sans-serif" font-size="10" font-weight="600" letter-spacing="1.5" text-anchor="middle">ADSRAHU.COM</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

// ── AI Blog Content & Poster Generation Handler ─────────────────────────
async function generateBlogWithAI(
  topic: string,
  category: string,
  tone: string,
  targetAudience: string,
  keyPoints: string
) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY not configured. Set it in Vercel Environment Variables."
    );
  }

  const prompt = `You are a world-class performance marketing, growth, and content expert writing for "Adsrahu". Adsrahu is a high-growth performance marketing agency and media platform.

Write a highly detailed, professional, and actionable SEO-optimized blog post based on these exact requirements:
Topic: "${topic}"
Category: "${category || "General"}"
Tone of Voice: "${tone || "Professional and authoritative"}"
Target Audience: "${targetAudience || "Business owners, founders, and industry professionals"}"
Key Points to Include: "${keyPoints || "High-value, actionable strategies"}"

CRITICAL INSTRUCTIONS:
1. Adapt fully to the specified Topic, Category, and Target Audience. Do NOT inject unmentioned niches or industries unless specified in the topic!
2. Provide specific, actionable strategies (e.g., mention specific ad strategies, automation flows, analytics, tool integrations relevant to the topic).
3. Avoid generic fluff. Use realistic data points, market trends, and modern digital marketing methodologies.
4. Format the content beautifully in Markdown:
   - Start with an engaging hook.
   - Use 3-5 clearly defined ## headings.
   - Include bullet points, numbered lists, and bold text for readability.
5. End with a strong Call-To-Action (CTA) encouraging the reader to implement these strategies or consult with Adsrahu.
6. Design a sleek 16:9 social poster card for this blog. Choose the most relevant theme and icon, and extract exactly 3 distinct key takeaways from the blog post.`;

  const textResponse = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_TEXT_MODEL}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 4096,
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              title: {
                type: "STRING",
                description: "An SEO-friendly, compelling blog title (50-70 chars)",
              },
              slug: {
                type: "STRING",
                description: "url-friendly-slug-with-hyphens",
              },
              excerpt: {
                type: "STRING",
                description: "A compelling 1-2 sentence summary for the blog card (under 160 chars)",
              },
              content: {
                type: "STRING",
                description: "The full blog body in Markdown format. Use \\n for newlines.",
              },
              poster: {
                type: "OBJECT",
                properties: {
                  theme: {
                    type: "STRING",
                    description: "Theme name for poster card. One of: 'dark-tech', 'emerald-growth', 'neon-purple', 'royal-blue', 'amber-glow', 'rose-premium', 'cyber-teal', 'midnight-indigo', 'solar-orange', 'arctic-slate'",
                  },
                  icon: {
                    type: "STRING",
                    description: "Icon representing topic. One of: 'zap', 'chart', 'trending', 'target', 'shield', 'layers', 'cpu'",
                  },
                  headline: {
                    type: "STRING",
                    description: "Short punchy headline for the poster (2-5 words max)",
                  },
                  subheading: {
                    type: "STRING",
                    description: "Punchy 1-sentence subtitle explaining the core value proposition",
                  },
                  keyTakeaways: {
                    type: "ARRAY",
                    items: { type: "STRING" },
                    description: "Exactly 3 distinct, specific key takeaway sentences from this blog (each 6-12 words).",
                  },
                  statBadge: {
                    type: "STRING",
                    description: "Short 2-3 word badge label (e.g. '10X GROWTH', 'AI STRATEGY', 'SCALE GUIDE')",
                  },
                },
                required: ["theme", "icon", "headline", "subheading", "keyTakeaways", "statBadge"],
              },
            },
            required: ["title", "slug", "excerpt", "content", "poster"],
          },
        },
      }),
    }
  );

  if (!textResponse.ok) {
    const errBody = await textResponse.text();
    throw new Error(`Gemini API error: ${textResponse.status} - ${errBody}`);
  }

  const data = await textResponse.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("No content generated by Gemini");

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (e1) {
    try {
      const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (match) {
        parsed = JSON.parse(match[1].trim());
      } else {
        const firstBrace = text.indexOf("{");
        const lastBrace = text.lastIndexOf("}");
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
          parsed = JSON.parse(text.substring(firstBrace, lastBrace + 1));
        } else {
          throw new Error("No JSON structure found");
        }
      }
    } catch (e2) {
      throw new Error(
        "Failed to parse Gemini response as JSON. Snippet: " +
          text.substring(0, 150)
      );
    }
  }

  // Generate ultra-premium infographic poster card
  const posterSvgUrl = generateSelfGeneratedPosterCard(
    parsed.title,
    parsed.excerpt,
    category,
    parsed.poster
  );

  return {
    title: parsed.title,
    slug: parsed.slug,
    category,
    excerpt: parsed.excerpt,
    content: parsed.content,
    imageUrl: posterSvgUrl,
  };
}

// ── API Router ───────────────────────────────────────────────────────────
export default async function handler(req: any, res: any) {
  cors(res);
  if (req.method === "OPTIONS") { res.status(200).end(); return; }

  const sql = getSql();

  if (req.method === "GET") {
    const onlyPublished = req.query?.published === "true";
    const rows = onlyPublished
      ? await sql`SELECT * FROM blog_posts WHERE published = true ORDER BY created_at DESC`
      : await sql`SELECT * FROM blog_posts ORDER BY created_at DESC`;
    res.status(200).json(rows.map(toCamel));
    return;
  }

  if (req.method === "POST") {
    if (!checkAuth(req.headers["authorization"])) { res.status(401).json({ error: "Unauthorized" }); return; }

    // AI Blog Generation
    if (req.query?.action === "generate") {
      let b = req.body ?? {};
      if (typeof b === "string") { try { b = JSON.parse(b); } catch (e) {} }
      const topic = b.topic || b.title || "";
      const category = b.category || "General";
      const tone = b.tone || "";
      const targetAudience = b.targetAudience || "";
      const keyPoints = b.keyPoints || "";

      if (!topic) { res.status(400).json({ error: "topic is required" }); return; }
      try {
        const generated = await generateBlogWithAI(topic, category, tone, targetAudience, keyPoints);
        res.status(200).json(generated);
      } catch (err) {
        res.status(500).json({ error: err.message || "AI generation failed" });
      }
      return;
    }

    // Normal blog creation
    let b = req.body ?? {};
    if (typeof b === "string") {
      try { b = JSON.parse(b); } catch (e) {}
    }
    if (!b.title || !b.slug) { res.status(400).json({ error: "title and slug required" }); return; }
    const rows = await sql`
      INSERT INTO blog_posts (title, slug, category, excerpt, content, published, image_url)
      VALUES (${b.title}, ${b.slug}, ${b.category ?? "General"}, ${b.excerpt ?? ""}, ${b.content ?? ""}, ${b.published ?? false}, ${b.imageUrl ?? null})
      RETURNING *`;
    res.status(201).json(toCamel(rows[0]));
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}

function toCamel(row: any) {
  if (!row) return row;
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    excerpt: row.excerpt,
    content: row.content,
    published: row.published,
    createdAt: row.created_at,
    imageUrl: row.image_url,
  };
}
