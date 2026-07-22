import fs from 'fs';

function escapeXml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const ADSRAHU_LOGO_SVG = `
  <g transform="translate(0, 0) scale(1)">
    <circle cx="22" cy="22" r="21" fill="#0c0c14" stroke="url(#logo-gold)" stroke-width="1.8"/>
    <circle cx="22" cy="21" r="12" fill="#FF8C00" opacity="0.08"/>
    <path d="M 9 22 C 8 19, 10 16, 13 15 C 15 14.5, 17 15.5, 18 16.5"
          stroke="url(#logo-gold)" stroke-width="2" stroke-linecap="round" fill="none"/>
    <path d="M 10.5 22.5 C 10 20, 11 18, 14 17 C 16 16.5, 17 17.2, 18 18"
          stroke="url(#logo-gold)" stroke-width="1.3" stroke-linecap="round" fill="none" opacity="0.7"/>
    <rect x="20.5" y="11" width="3" height="5.5" rx="1" fill="url(#logo-gold-shine)"/>
    <rect x="17.5" y="17.5" width="9.5" height="2.8" rx="1.2" fill="url(#logo-gold)"/>
    <circle cx="23.5" cy="23.5" r="5.5" fill="none" stroke="url(#logo-gold-shine)" stroke-width="2.8"/>
    <line x1="14" y1="20" x2="17.5" y2="20" stroke="url(#logo-gold)" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="14.5" y1="23" x2="17.5" y2="23" stroke="url(#logo-gold)" stroke-width="1" stroke-linecap="round" opacity="0.7"/>
  </g>
`;

function generateSelfGeneratedPosterCard(
  title,
  excerpt,
  category,
  posterInfo
) {
  const safeTitle = escapeXml(title);
  const safeExcerpt = escapeXml(excerpt);
  const safeCategory = escapeXml(category || "INSIGHTS");

  const themes = {
    "dark-tech": {
      bgStart: "#020817", bgMid: "#0a1628", bgEnd: "#111d35",
      accent1: "#38bdf8", accent2: "#0ea5e9", accent3: "#7dd3fc",
      cardBg: "#08142a", cardBgOpacity: "0.85",
      cardStroke: "#38bdf8", cardStrokeOpacity: "0.25",
      gridColor: "#38bdf8", gridColorOpacity: "0.05",
      pillBg: "#38bdf8", pillBgOpacity: "0.12"
    },
    "emerald-growth": {
      bgStart: "#011c14", bgMid: "#042d1f", bgEnd: "#064e3b",
      accent1: "#34d399", accent2: "#10b981", accent3: "#6ee7b7",
      cardBg: "#04281c", cardBgOpacity: "0.85",
      cardStroke: "#34d399", cardStrokeOpacity: "0.25",
      gridColor: "#34d399", gridColorOpacity: "0.05",
      pillBg: "#34d399", pillBgOpacity: "0.12"
    },
    "neon-purple": {
      bgStart: "#0a0118", bgMid: "#150830", bgEnd: "#1e0b48",
      accent1: "#c084fc", accent2: "#a855f7", accent3: "#e9d5ff",
      cardBg: "#160834", cardBgOpacity: "0.85",
      cardStroke: "#a855f7", cardStrokeOpacity: "0.25",
      gridColor: "#a855f7", gridColorOpacity: "0.05",
      pillBg: "#a855f7", pillBgOpacity: "0.12"
    },
    "royal-blue": {
      bgStart: "#020620", bgMid: "#071340", bgEnd: "#0c1d5e",
      accent1: "#60a5fa", accent2: "#3b82f6", accent3: "#93c5fd",
      cardBg: "#070f37", cardBgOpacity: "0.85",
      cardStroke: "#3b82f6", cardStrokeOpacity: "0.25",
      gridColor: "#3b82f6", gridColorOpacity: "0.05",
      pillBg: "#3b82f6", pillBgOpacity: "0.12"
    },
    "amber-glow": {
      bgStart: "#120800", bgMid: "#231004", bgEnd: "#3a1c08",
      accent1: "#fbbf24", accent2: "#f59e0b", accent3: "#fde68a",
      cardBg: "#2a1606", cardBgOpacity: "0.85",
      cardStroke: "#f59e0b", cardStrokeOpacity: "0.25",
      gridColor: "#f59e0b", gridColorOpacity: "0.05",
      pillBg: "#f59e0b", pillBgOpacity: "0.12"
    },
    "rose-premium": {
      bgStart: "#1a0510", bgMid: "#2a0a1a", bgEnd: "#3d1028",
      accent1: "#fb7185", accent2: "#f43f5e", accent3: "#fda4af",
      cardBg: "#2d0a1c", cardBgOpacity: "0.85",
      cardStroke: "#f43f5e", cardStrokeOpacity: "0.25",
      gridColor: "#f43f5e", gridColorOpacity: "0.05",
      pillBg: "#f43f5e", pillBgOpacity: "0.12"
    },
    "cyber-teal": {
      bgStart: "#021215", bgMid: "#042028", bgEnd: "#063040",
      accent1: "#2dd4bf", accent2: "#14b8a6", accent3: "#99f6e4",
      cardBg: "#041c23", cardBgOpacity: "0.85",
      cardStroke: "#14b8a6", cardStrokeOpacity: "0.25",
      gridColor: "#14b8a6", gridColorOpacity: "0.05",
      pillBg: "#14b8a6", pillBgOpacity: "0.12"
    },
    "midnight-indigo": {
      bgStart: "#080420", bgMid: "#0f0838", bgEnd: "#180e55",
      accent1: "#818cf8", accent2: "#6366f1", accent3: "#c7d2fe",
      cardBg: "#0f0832", cardBgOpacity: "0.85",
      cardStroke: "#6366f1", cardStrokeOpacity: "0.25",
      gridColor: "#6366f1", gridColorOpacity: "0.05",
      pillBg: "#6366f1", pillBgOpacity: "0.12"
    },
    "solar-orange": {
      bgStart: "#150600", bgMid: "#251000", bgEnd: "#3b1a02",
      accent1: "#fb923c", accent2: "#f97316", accent3: "#fdba74",
      cardBg: "#281002", cardBgOpacity: "0.85",
      cardStroke: "#f97316", cardStrokeOpacity: "0.25",
      gridColor: "#f97316", gridColorOpacity: "0.05",
      pillBg: "#f97316", pillBgOpacity: "0.12"
    },
    "arctic-slate": {
      bgStart: "#0c0f1a", bgMid: "#141828", bgEnd: "#1c2238",
      accent1: "#94a3b8", accent2: "#64748b", accent3: "#cbd5e1",
      cardBg: "#121626", cardBgOpacity: "0.85",
      cardStroke: "#64748b", cardStrokeOpacity: "0.25",
      gridColor: "#64748b", gridColorOpacity: "0.05",
      pillBg: "#64748b", pillBgOpacity: "0.12"
    }
  };

  const themeName = posterInfo?.theme || "dark-tech";
  const t = themes[themeName] || themes["dark-tech"];

  const icons = {
    "zap": `<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>`,
    "chart": `<path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M3 20h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
    "trending": `<path d="M23 6l-9.5 9.5-5-5L1 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M17 6h6v6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    "target": `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="2.5" fill="currentColor"/>`,
    "shield": `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    "layers": `<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    "cpu": `<rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor"/><line x1="9" y1="1" x2="9" y2="4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="15" y1="1" x2="15" y2="4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="9" y1="20" x2="9" y2="23" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="15" y1="20" x2="15" y2="23" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`
  };

  const selectedIcon = icons[posterInfo?.icon || "zap"] || icons["zap"];

  const wrapText = (str, maxChar) => {
    const words = (str || "").split(" ");
    const lines = [];
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

  const categoryBadgeWidth = Math.max(safeCategory.length * 10 + 36, 140);
  const statBadgeWidth = Math.max(statBadgeText.length * 8 + 32, 160);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
    <defs>
      <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${t.bgStart}"/>
        <stop offset="45%" stop-color="${t.bgMid}"/>
        <stop offset="100%" stop-color="${t.bgEnd}"/>
      </linearGradient>

      <linearGradient id="accent-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${t.accent1}"/>
        <stop offset="100%" stop-color="${t.accent2}"/>
      </linearGradient>

      <linearGradient id="accent-v" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${t.accent1}" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="${t.accent2}" stop-opacity="0.1"/>
      </linearGradient>

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

      <linearGradient id="card-glass" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${t.accent1}" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="${t.accent2}" stop-opacity="0.02"/>
      </linearGradient>

      <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="${t.gridColor}" stroke-opacity="${t.gridColorOpacity}" stroke-width="0.8"/>
      </pattern>

      <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="${t.accent1}" opacity="0.08"/>
      </pattern>
    </defs>

    <rect width="1200" height="630" fill="url(#bg-grad)"/>
    <rect width="1200" height="630" fill="url(#grid)"/>

    <circle cx="120" cy="80" r="280" fill="${t.accent2}" opacity="0.15"/>
    <circle cx="1100" cy="550" r="320" fill="${t.accent1}" opacity="0.10"/>
    <circle cx="650" cy="320" r="200" fill="${t.accent3}" opacity="0.05"/>

    <rect x="0" y="0" width="1200" height="5" fill="url(#accent-grad)"/>
    <rect x="60" y="50" width="3" height="530" rx="1.5" fill="url(#accent-v)"/>

    <line x1="1050" y1="30" x2="1170" y2="30" stroke="${t.accent1}" stroke-width="1" opacity="0.15"/>
    <line x1="1070" y1="50" x2="1170" y2="50" stroke="${t.accent1}" stroke-width="1" opacity="0.1"/>
    <line x1="1090" y1="70" x2="1170" y2="70" stroke="${t.accent1}" stroke-width="1" opacity="0.07"/>

    <path d="M 80 590 L 80 610 L 120 610" fill="none" stroke="${t.accent1}" stroke-width="2" opacity="0.2" stroke-linecap="round"/>

    <circle cx="1100" cy="140" r="45" fill="none" stroke="${t.accent1}" stroke-width="1" opacity="0.08"/>
    <circle cx="1100" cy="140" r="30" fill="none" stroke="${t.accent2}" stroke-width="0.8" opacity="0.06"/>
    <circle cx="200" cy="560" r="35" fill="none" stroke="${t.accent1}" stroke-width="0.8" opacity="0.06"/>

    <rect x="950" y="180" width="200" height="200" fill="url(#dots)" opacity="0.5"/>

    <g transform="translate(90, 0)">
      <g transform="translate(0, 65)">
        <rect x="0" y="0" width="${categoryBadgeWidth}" height="34" rx="17" fill="${t.pillBg}" fill-opacity="${t.pillBgOpacity}" stroke="${t.accent1}" stroke-width="1.2" stroke-opacity="0.5"/>
        <circle cx="18" cy="17" r="4" fill="${t.accent1}" opacity="0.6"/>
        <text x="30" y="22" fill="${t.accent1}" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="800" letter-spacing="2.5">${safeCategory.toUpperCase()}</text>
      </g>

      <g transform="translate(${categoryBadgeWidth + 16}, 65)">
        <rect x="0" y="0" width="${statBadgeWidth}" height="34" rx="17" fill="#ffffff" fill-opacity="0.03" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1"/>
        <text x="${statBadgeWidth / 2}" y="22" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="800" letter-spacing="2" text-anchor="middle">${statBadgeText}</text>
      </g>

      <g transform="translate(0, 148)">
        ${titleLines.map((line, idx) => `<text x="0" y="${idx * 68}" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="50" font-weight="900" letter-spacing="-1">${line}</text>`).join("")}
      </g>

      <g transform="translate(0, ${156 + titleLines.length * 68})">
        <rect x="0" y="0" width="80" height="4" rx="2" fill="url(#accent-grad)"/>
      </g>

      <g transform="translate(0, ${180 + titleLines.length * 68})">
        ${subLines.map((line, idx) => `<text x="0" y="${idx * 28}" fill="${t.accent1}" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600" opacity="0.95">${line}</text>`).join("")}
      </g>

      <g transform="translate(0, 420)">
        <circle cx="38" cy="38" r="42" fill="${t.accent1}" opacity="0.05"/>
        <rect width="76" height="76" rx="22" fill="${t.pillBg}" fill-opacity="${t.pillBgOpacity}" stroke="${t.cardStroke}" stroke-opacity="${t.cardStrokeOpacity}" stroke-width="1.5"/>
        <rect x="3" y="3" width="70" height="70" rx="19" fill="url(#accent-grad)" opacity="0.1"/>
        <g transform="translate(18, 18) scale(1.65)" color="${t.accent1}">
          ${selectedIcon}
        </g>
      </g>

      <line x1="95" y1="458" x2="460" y2="458" stroke="${t.accent1}" stroke-width="0.5" opacity="0.15"/>
    </g>

    <g transform="translate(620, 55)">
      <rect width="510" height="510" rx="24" fill="${t.cardBg}" fill-opacity="${t.cardBgOpacity}"/>
      <rect width="510" height="510" rx="24" fill="url(#card-glass)"/>
      <rect width="510" height="510" rx="24" fill="none" stroke="${t.cardStroke}" stroke-opacity="${t.cardStrokeOpacity}" stroke-width="1.5"/>

      <rect x="0" y="0" width="510" height="4" rx="2" fill="url(#accent-grad)" opacity="0.8"/>

      <circle cx="28" cy="28" r="3" fill="${t.accent1}" opacity="0.2"/>
      <circle cx="482" cy="28" r="3" fill="${t.accent2}" opacity="0.2"/>

      <g transform="translate(40, 48)">
        <text x="0" y="0" fill="${t.accent1}" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="900" letter-spacing="3">KEY TAKEAWAYS</text>
        <rect x="0" y="12" width="120" height="3" rx="1.5" fill="url(#accent-grad)" opacity="0.8"/>
      </g>

      ${points.map((pt, idx) => {
        const ptLines = wrapText(pt, 28).slice(0, 2);
        const yOffset = 95 + idx * 130;
        return `<g transform="translate(28, ${yOffset})">
          <rect x="0" y="0" width="454" height="108" rx="16" fill="${t.pillBg}" fill-opacity="${t.pillBgOpacity}"/>
          <rect x="0" y="0" width="454" height="108" rx="16" fill="none" stroke="${t.cardStroke}" stroke-opacity="${t.cardStrokeOpacity}" stroke-width="1"/>
          <rect x="0" y="20" width="4" height="68" rx="2" fill="url(#accent-grad)"/>

          <g transform="translate(22, 28)">
            <circle cx="24" cy="24" r="22" fill="url(#accent-grad)" opacity="0.15"/>
            <circle cx="24" cy="24" r="22" fill="none" stroke="${t.accent1}" stroke-width="2" opacity="0.6"/>
            <text x="24" y="31" fill="${t.accent1}" font-family="system-ui, -apple-system, sans-serif" font-size="19" font-weight="900" text-anchor="middle">0${idx + 1}</text>
          </g>

          <g transform="translate(80, 0)">
            ${ptLines.map((line, lIdx) => `<text x="0" y="${ptLines.length === 1 ? 60 : 44 + lIdx * 26}" fill="#f1f5f9" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600">${line}</text>`).join("")}
          </g>
        </g>`;
      }).join("")}

      <line x1="40" y1="480" x2="470" y2="480" stroke="${t.accent1}" stroke-width="0.5" opacity="0.15"/>
    </g>

    <g transform="translate(90, 546)">
      ${ADSRAHU_LOGO_SVG}
      <text x="52" y="28" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="900" letter-spacing="-0.3">Adsrahu</text>
      <text x="52" y="44" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="800" letter-spacing="2.5">PERFORMANCE AGENCY</text>
    </g>

    <g transform="translate(1090, 20) scale(0.9)">
      ${ADSRAHU_LOGO_SVG}
    </g>

    <g transform="translate(1000, 562)">
      <rect x="0" y="0" width="150" height="38" rx="19" fill="#ffffff" fill-opacity="0.05" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1"/>
      <text x="22" y="24" fill="#cbd5e1" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="800" letter-spacing="1.5">READ ARTICLE</text>
      <path d="M 130 19 L 136 19 M 133 15 L 137 19 L 133 23" fill="none" stroke="${t.accent1}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </g>

    <g transform="translate(600, 614)">
      <text x="0" y="0" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="700" letter-spacing="2" text-anchor="middle">ADSRAHU.COM</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

const res = generateSelfGeneratedPosterCard("Strategic Automation", "Excerpt text", "BUSINESS GROWTH", {});
console.log('Contains rgba:', res.includes('rgba'));
console.log('Base64 length:', res.length);
