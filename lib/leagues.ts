/**
 * League definitions for mega-menu and routing.
 * Slug is used in URL: /leagues/[slug]
 */

export interface LeagueItem {
  slug: string;
  label: string;
  description?: string;
  /** League logo URL for navbar dropdown */
  logoUrl?: string;
}

export const LEAGUES: LeagueItem[] = [
  { slug: "premier-league", label: "פרימייר ליג", description: "English top flight", logoUrl: "/img/Premiere-league.jpg" },
  { slug: "la-liga", label: "La Liga", description: "Spanish top flight", logoUrl: "/img/Laliga.webp" },
  { slug: "serie-a", label: "Serie A", description: "Italian top flight", logoUrl: "/img/Serie-a.png" },
  { slug: "retro", label: "Retro", description: "80s & 90s classics" },
  { slug: "ligue-1", label: "Ligue 1", description: "French top flight", logoUrl: "/img/Ligue-1.png" },
  { slug: "bundesliga", label: "Bundesliga", description: "German top flight", logoUrl: "/img/Bundesliga.jpg" },
  { slug: "national-teams", label: "נבחרות", description: "National teams" },
];

export function getLeagueBySlug(slug: string): LeagueItem | undefined {
  return LEAGUES.find((l) => l.slug === slug);
}
