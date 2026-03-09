/**
 * Shared types for jerseys and eras.
 * Kept in /types for reuse in future React Native app.
 */

export type DecadeId = "70s" | "80s" | "90s" | "00s" | "10s" | "20s";

export interface Decade {
  id: DecadeId;
  label: string;
  startYear: number;
  endYear: number;
  /** Optional theme accent for this era (hex or CSS color) */
  accent?: string;
}

export interface JerseyTheme {
  /** Primary brand color (e.g. Blaugrana, Sky Blue) */
  primary: string;
  /** Secondary or gradient end */
  secondary?: string;
  /** Optional background gradient start */
  bgStart?: string;
  /** Optional background gradient end */
  bgEnd?: string;
}

export interface Jersey {
  id: string;
  title: string;
  club: string;
  /** League for navigation and filtering (e.g. Premier League, La Liga, Retro) */
  league: string;
  era: string;
  decade: DecadeId;
  story?: string;
  theme: JerseyTheme;
  /** Single image fallback when images array is not used */
  imageUrl?: string;
  /** Multiple images for gallery (front, back, detail); takes priority over imageUrl */
  images?: string[];
  price?: number;
  /** Available sizes for filter (e.g. S, M, L, XL) */
  sizes?: string[];
  /** Show in Trending Jerseys section on home */
  trending?: boolean;
  /** נבחרת לאומית (למונדיאל) — לא קבוצה */
  isNationalTeam?: boolean;
}
