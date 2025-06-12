// src/utils/colorUtils.ts

/**
 * Konvertiert einen Farbstring (Hex: 3-, 6- oder 8-stellig, mit/ohne '#',
 * oder CSS-Funktionen `rgb()`/`rgba()`) in ein RGB-Objekt.
 *
 * Unterstützte Formate:
 * - "#rgb", "#rgba" (Kurzschreibweise)
 * - "#rrggbb", "#rrggbbaa" (Full-Notation, Alpha wird in 8-stelligem Hex ignoriert)
 * - "rgb(r, g, b)", "rgba(r, g, b, a)"
 *
 * @param colorStr - Farbstring in einem der o.g. Formate
 * @returns Objekt mit r, g, b Werten (0–255) oder null bei ungültigem Format
 */
function hexOrRgbToRgb(
  colorStr: string
): { r: number; g: number; b: number } | null {
  let c = colorStr.trim();

  // Prüfe auf rgb()/rgba()-Notation
  const rgbMatch = c.match(
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i
  );
  if (rgbMatch) {
    const [, rs, gs, bs] = rgbMatch;
    return {
      r: Math.min(255, Number(rs)),
      g: Math.min(255, Number(gs)),
      b: Math.min(255, Number(bs)),
    };
  }

  // Entferne führendes '#'
  c = c.replace(/^#/, "");

  // Schneide bei 8-stelligem Hex (RGBA) die Alpha-Komponente ab
  if (c.length === 8) {
    c = c.slice(0, 6);
  }

  // Erweitere Kurznotation (#abc → aabbcc)
  if (c.length === 3) {
    c = c
      .split("")
      .map((ch) => ch + ch)
      .join("");
  }

  // Nur 6-stelliges Hex verbleibt
  if (c.length !== 6 || !/^[0-9A-Fa-f]{6}$/.test(c)) {
    return null;
  }

  const intVal = parseInt(c, 16);
  return {
    r: (intVal >> 16) & 0xff,
    g: (intVal >> 8) & 0xff,
    b: intVal & 0xff,
  };
}

/**
 * Berechnet die relative Luminanz einer Farbe nach WCAG 2.1.
 *
 * L = 0.2126·R_lin + 0.7152·G_lin + 0.0722·B_lin
 * R_lin, G_lin, B_lin sind Gamma-korrigierte Werte.
 *
 * @param colorStr - Farbstring wie in hexOrRgbToRgb
 * @returns Luminanzwert (0 = dunkel, 1 = hell)
 */
function relativeLuminance(colorStr: string): number {
  const rgb = hexOrRgbToRgb(colorStr);
  if (!rgb) {
    console.warn("Ungültiges Farbformat:", colorStr);
    return 0;
  }

  const transform = (c: number) => {
    const cs = c / 255;
    return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
  };

  const R = transform(rgb.r);
  const G = transform(rgb.g);
  const B = transform(rgb.b);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * Bestimmt, ob eine Farbe als "dunkel" einzustufen ist.
 *
 * @param colorStr - Farbstring wie in hexOrRgbToRgb
 * @param threshold - Schwellwert zwischen 0 und 1 (Standard 0.5)
 * @returns true, wenn Luminanz < threshold
 */
export function isColorDark(colorStr: string, threshold = 0.5): boolean {
  const lum = relativeLuminance(colorStr);
  return lum < threshold;
}

/**
 * Gibt die optimal lesbare Textfarbe für einen gegebenen Hintergrund zurück.
 *
 * @param bgColor - Hintergrundfarbe als String
 * @param lightColor - Textfarbe für dunkle Hintergründe (Standard "#FFFFFF")
 * @param darkColor - Textfarbe für helle Hintergründe (Standard "#000000")
 * @returns lightColor oder darkColor je nach Helligkeit
 */
export function readableTextColor(
  bgColor: string,
  lightColor = "#FFFFFF",
  darkColor = "#000000"
): string {
  return isColorDark(bgColor) ? lightColor : darkColor;
}
