import type { JerseyTheme } from "@/types/jersey";

/** Returns true if the hex color is very light (e.g. white), so we need a contrasting button. */
function isLightColor(hex: string): boolean {
  const h = hex.replace("#", "").trim();
  if (h.length !== 3 && h.length !== 6) return false;
  const r = parseInt(h.length === 3 ? h[0] + h[0] : h.slice(0, 2), 16);
  const g = parseInt(h.length === 3 ? h[1] + h[1] : h.slice(2, 4), 16);
  const b = parseInt(h.length === 3 ? h[2] + h[2] : h.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.85;
}

/**
 * For "Add to Cart" and other buttons on white background.
 * When theme.primary is white/very light (e.g. Real Madrid), use secondary so the button is visible.
 */
export function getButtonTheme(theme: JerseyTheme): {
  backgroundColor: string;
  textClassName: string;
  shadowColor: string;
} {
  if (isLightColor(theme.primary) && theme.secondary) {
    return {
      backgroundColor: theme.secondary,
      textClassName: "text-gray-900",
      shadowColor: `${theme.secondary}40`,
    };
  }
  return {
    backgroundColor: theme.primary,
    textClassName: "text-white",
    shadowColor: `${theme.primary}40`,
  };
}

/** For badges / pills when primary is too light. */
export function getAccentColor(theme: JerseyTheme): { bg: string; text: string } {
  if (isLightColor(theme.primary) && theme.secondary) {
    return { bg: `${theme.secondary}20`, text: theme.secondary };
  }
  return { bg: `${theme.primary}18`, text: theme.primary };
}
