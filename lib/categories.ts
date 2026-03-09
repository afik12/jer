/**
 * Categories for the home page quick-nav (lookbook-style blocks).
 * Used by CategoryCircles; links to leagues or dedicated routes.
 * Each category has a lookbook-style image (model in jersey) and accent for hover.
 */

export interface CategoryItem {
  id: string;
  label: string;
  href: string;
  /** Accent color for hover border / depth (hex) */
  accent: string;
  /** Lookbook-style photo: model wearing jersey (or theme-appropriate scene) */
  imageUrl: string;
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: "premier-league",
    label: "פרימייר ליג",
    href: "/leagues/premier-league",
    accent: "#3d195b",
    imageUrl: "/img/Premiere-league.jpg",
  },
  {
    id: "la-liga",
    label: "לה ליגה",
    href: "/leagues/la-liga",
    accent: "#eb1c2d",
    imageUrl: "/img/Laliga.webp",
  },
  {
    id: "serie-a",
    label: "סרייה א'",
    href: "/leagues/serie-a",
    accent: "#024494",
    imageUrl: "/img/Serie-a.png",
  },
  {
    id: "ligue-1",
    label: "ליגה צרפתית",
    href: "/leagues/ligue-1",
    accent: "#091c3e",
    imageUrl: "/img/Ligue-1.png",
  },
  {
    id: "bundesliga",
    label: "ליגה גרמנית",
    href: "/leagues/bundesliga",
    accent: "#d20515",
    imageUrl: "/img/Bundesliga.jpg",
  },
];
