import fs from 'fs';

// Let's import or copy the generateSelfGeneratedPosterCard function and run it with sample data
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

function generateSelfGeneratedPosterCard(title, excerpt, category, posterInfo) {
  const safeTitle = escapeXml(title);
  const safeExcerpt = escapeXml(excerpt);
  const safeCategory = escapeXml(category || "INSIGHTS");

  const themes = {
    "dark-tech": {
      bgStart: "#020817", bgMid: "#0a1628", bgEnd: "#111d35",
      accent1: "#38bdf8", accent2: "#0ea5e9", accent3: "#7dd3fc",
      cardBg: "rgba(8, 20, 42, 0.85)", cardStroke: "rgba(56, 189, 248, 0.25)",
      gridColor: "rgba(56, 189, 248, 0.05)", pillBg: "rgba(56, 189, 248, 0.12)"
    }
  };

  const t = themes["dark-tech"];
  const icons = { "zap": `<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>` };
  const selectedIcon = icons["zap"];

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

  const titleLines = wrapText(escapeXml(safeTitle), 20).slice(0, 3);
  const subLines = wrapText(escapeXml(safeExcerpt), 36).slice(0, 2);
  const points = ["Point 1", "Point 2", "Point 3"].map(pt => escapeXml(pt));
  const statBadgeText = "PERFORMANCE GUIDE";

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
        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="${t.gridColor}" stroke-width="0.8"/>
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
        <rect x="0" y="0" width="${categoryBadgeWidth}" height="34" rx="17" fill="${t.pillBg}" stroke="${t.accent1}" stroke-width="1.2" stroke-opacity="0.5"/>
        <circle cx="18" cy="17" r="4" fill="${t.accent1}" opacity="0.6"/>
        <text x="30" y="22" fill="${t.accent1}" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="800" letter-spacing="2.5">${safeCategory.toUpperCase()}</text>
      </g>

      <g transform="translate(${categoryBadgeWidth + 16}, 65)">
        <rect x="0" y="0" width="${statBadgeWidth}" height="34" rx="17" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
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
        <rect width="76" height="76" rx="22" fill="${t.pillBg}" stroke="${t.cardStroke}" stroke-width="1.5"/>
        <rect x="3" y="3" width="70" height="70" rx="19" fill="url(#accent-grad)" opacity="0.1"/>
        <g transform="translate(18, 18) scale(1.65)" color="${t.accent1}">
          ${selectedIcon}
        </g>
      </g>

      <line x1="95" y1="458" x2="460" y2="458" stroke="${t.accent1}" stroke-width="0.5" opacity="0.15"/>
    </g>

    <g transform="translate(620, 55)">
      <rect width="510" height="510" rx="24" fill="${t.cardBg}"/>
      <rect width="510" height="510" rx="24" fill="url(#card-glass)"/>
      <rect width="510" height="510" rx="24" fill="none" stroke="${t.cardStroke}" stroke-width="1.5"/>

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
          <rect x="0" y="0" width="454" height="108" rx="16" fill="${t.pillBg}"/>
          <rect x="0" y="0" width="454" height="108" rx="16" fill="none" stroke="${t.cardStroke}" stroke-width="1"/>
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
      <rect x="0" y="0" width="150" height="38" rx="19" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      <text x="22" y="24" fill="#cbd5e1" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="800" letter-spacing="1.5">READ ARTICLE</text>
      <path d="M 130 19 L 136 19 M 133 15 L 137 19 L 133 23" fill="none" stroke="${t.accent1}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </g>

    <g transform="translate(600, 614)">
      <text x="0" y="0" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="700" letter-spacing="2" text-anchor="middle">ADSRAHU.COM</text>
    </g>
  </svg>`;

  return svg;
}

const svgString = generateSelfGeneratedPosterCard("Strategic Automation", "Excerpt text", "BUSINESS GROWTH", {});
fs.writeFileSync('test_output.svg', svgString);
console.log('SVG generated successfully, length:', svgString.length);
