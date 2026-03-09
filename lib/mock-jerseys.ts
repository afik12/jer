import type { Jersey } from "@/types/jersey";
import { LEAGUES } from "./leagues";
import { connectDB } from "./mongodb";
import { JerseyModel } from "@/models/Jersey";

const SIZES = ["S", "M", "L", "XL"];
const J = "/img/jerseys"; // base path for jersey images from img_jer

/**
 * Only jerseys that have at least one image (from img_jer).
 * Some have 2 or 3 images for the product gallery.
 */
export const MOCK_JERSEYS: Jersey[] = [
  {
    id: "ac-milan-home-kit",
    title: "מילאן בית 2025/26",
    club: "AC Milan",
    league: "Serie A",
    era: "Rossoneri",
    decade: "20s",
    story: "חולצת בית מילאן.",
    theme: { primary: "#FB090B", secondary: "#000000", bgStart: "#0f0a0a", bgEnd: "#1a0d0d" },
    imageUrl: `${J}/ac-milan-home-kit.png`,
    images: [`${J}/ac-milan-home-kit.png`, `${J}/ac-milan-home-kit-back.png`],
    price: 119.9,
    sizes: SIZES,
    trending: true,
  },
  {
    id: "argentina-home",
    title: "ארגנטינה בית 2025/26",
    club: "Argentina",
    league: "נבחרות",
    era: "נבחרת ארגנטינה",
    decade: "20s",
    isNationalTeam: true,
    story: "חולצת נבחרת ארגנטינה.",
    theme: { primary: "#75AADB", secondary: "#FFFFFF", bgStart: "#0a1628", bgEnd: "#0d1f33" },
    imageUrl: `${J}/argentina-home.png`,
    images: [`${J}/argentina-home.png`, `${J}/argentina-home-back.png`],
    price: 119.9,
    sizes: SIZES,
    trending: true,
  },
  {
    id: "arsenal-home",
    title: "ארסנל בית 2025/26",
    club: "Arsenal",
    league: "פרימייר ליג",
    era: "הגunners",
    decade: "20s",
    story: "חולצת בית ארסנל.",
    theme: { primary: "#EF0107", secondary: "#063672", bgStart: "#0f0a0a", bgEnd: "#1a0d0d" },
    imageUrl: `${J}/arsenal-home.png`,
    images: [`${J}/arsenal-home.png`, `${J}/arsenal-home-back.png`],
    price: 119.9,
    sizes: SIZES,
    trending: true,
  },
  {
    id: "barca-home-25-26",
    title: "ברצלונה בית 2025/26",
    club: "FC Barcelona",
    league: "La Liga",
    era: "בלאוגרנה",
    decade: "20s",
    story: "חולצת בית ברצלונה.",
    theme: { primary: "#A50044", secondary: "#004D98", bgStart: "#0d0a0c", bgEnd: "#1a1520" },
    imageUrl: `${J}/barca-home-25-26.png`,
    images: [`${J}/barca-home-25-26.png`, `${J}/barca-home-25-26-back.png`],
    price: 119.9,
    sizes: SIZES,
    trending: true,
  },
  {
    id: "bayern-away-25-26",
    title: "Bayern Munich Away 2025/26",
    club: "Bayern Munich",
    league: "Bundesliga",
    era: "באיירן",
    decade: "20s",
    story: "חולצת חוץ באיירן.",
    theme: { primary: "#DC052D", secondary: "#0066B3", bgStart: "#0f0a0b", bgEnd: "#1a0d12" },
    imageUrl: `${J}/bayern-away-25-26.png`,
    images: [`${J}/bayern-away-25-26.png`, `${J}/bayern-away-back.png`],
    price: 119.9,
    sizes: SIZES,
  },
  {
    id: "bayern-home-25-26",
    title: "באיירן מינכן בית 2025/26",
    club: "Bayern Munich",
    league: "Bundesliga",
    era: "באיירן",
    decade: "20s",
    story: "חולצת בית באיירן.",
    theme: { primary: "#DC052D", secondary: "#0066B3", bgStart: "#0f0a0b", bgEnd: "#1a0d12" },
    imageUrl: `${J}/bayren-home-25-26-2.png`,
    images: [`${J}/bayren-home-25-26-2.png`],
    price: 119.9,
    sizes: SIZES,
  },
  {
    id: "inter-home-25-26",
    title: "אינטר מילאן בית 2025/26",
    club: "Inter Milan",
    league: "Serie A",
    era: "אינטר",
    decade: "20s",
    story: "חולצת בית אינטר.",
    theme: { primary: "#003399", secondary: "#000000", bgStart: "#0a0a0f", bgEnd: "#14141f" },
    imageUrl: `${J}/inter-home-25-26-1.png`,
    images: [`${J}/inter-home-25-26-1.png`, `${J}/inter-home-25-26-back-2.png`],
    price: 119.9,
    sizes: SIZES,
    trending: true,
  },
  {
    id: "man-city-3rd",
    title: "מנצ'סטר סיטי שלישית 2025/26",
    club: "Manchester City",
    league: "פרימייר ליג",
    era: "סיטי",
    decade: "20s",
    story: "חולצת שלישית מנצ'סטר סיטי.",
    theme: { primary: "#6CABDD", secondary: "#1C2C5B", bgStart: "#0a0e1a", bgEnd: "#152238" },
    imageUrl: `${J}/man-city-3rd-1.png`,
    images: [`${J}/man-city-3rd-1.png`, `${J}/man-city-3rd-back.png`, `${J}/man-city-3rd-zoom.png`],
    price: 119.9,
    sizes: SIZES,
    trending: true,
  },
  {
    id: "man-city-home-25-26",
    title: "מנצ'סטר סיטי בית 2025/26",
    club: "Manchester City",
    league: "פרימייר ליג",
    era: "סיטי",
    decade: "20s",
    story: "חולצת בית מנצ'סטר סיטי.",
    theme: { primary: "#6CABDD", secondary: "#1C2C5B", bgStart: "#0a0e1a", bgEnd: "#152238" },
    imageUrl: `${J}/סיטי-בית-25-26.png`,
    images: [`${J}/סיטי-בית-25-26.png`],
    price: 119.9,
    sizes: SIZES,
  },
  {
    id: "man-united-home-25-26",
    title: "מנצ'סטר יונייטד בית 2025/26",
    club: "Manchester United",
    league: "פרימייר ליג",
    era: "יונייטד",
    decade: "20s",
    story: "חולצת בית מנצ'סטר יונייטד.",
    theme: { primary: "#DA291C", secondary: "#FBE122", bgStart: "#140a0a", bgEnd: "#1f0d0d" },
    imageUrl: `${J}/man-united-home-25-26-1.png`,
    images: [`${J}/man-united-home-25-26-1.png`, `${J}/man-united-home-25-26-1-back.png`],
    price: 119.9,
    sizes: SIZES,
    trending: true,
  },
  {
    id: "psg-home-25-26",
    title: "פריז סן-ז'רמן בית 2025/26",
    club: "Paris Saint-Germain",
    league: "Ligue 1",
    era: "פאריס סן ז'רמן",
    decade: "20s",
    story: "חולצת בית PSG.",
    theme: { primary: "#004170", secondary: "#DA291C", bgStart: "#0a0e14", bgEnd: "#0d1520" },
    imageUrl: `${J}/פריז-סן-זרמן-בית-25-26-קדימה.webp`,
    images: [`${J}/פריז-סן-זרמן-בית-25-26-קדימה.webp`],
    price: 119.9,
    sizes: SIZES,
  },
  {
    id: "real-madrid-home-25-26",
    title: "ריאל מדריד בית 2025/26",
    club: "Real Madrid",
    league: "La Liga",
    era: "ריאל מדריד",
    decade: "20s",
    story: "חולצת בית ריאל מדריד.",
    theme: { primary: "#FFFFFF", secondary: "#FEBE10", bgStart: "#141414", bgEnd: "#1f1f1f" },
    imageUrl: `${J}/ריאל-מדריד-בית-25-26.png`,
    images: [`${J}/ריאל-מדריד-בית-25-26.png`],
    price: 119.9,
    sizes: SIZES,
    trending: true,
  },
  {
    id: "spain-home",
    title: "ספרד בית 2025/26",
    club: "Spain",
    league: "נבחרות",
    era: "נבחרת ספרד",
    decade: "20s",
    isNationalTeam: true,
    story: "חולצת נבחרת ספרד.",
    theme: { primary: "#C60B1E", secondary: "#FAB500", bgStart: "#140a0a", bgEnd: "#1f0d0d" },
    imageUrl: `${J}/spain-home.png`,
    images: [`${J}/spain-home.png`, `${J}/spain-home-back.png`],
    price: 119.9,
    sizes: SIZES,
  },
  // רטרו — תמונות חדשות מ-img_jer
  {
    id: "barca-retro",
    title: "ברצלונה רטרו",
    club: "FC Barcelona",
    league: "Retro",
    era: "בלאוגרנה קלאסי",
    decade: "90s",
    story: "חולצת ברצלונה קלאסית.",
    theme: { primary: "#A50044", secondary: "#004D98", bgStart: "#0d0a0c", bgEnd: "#1a1520" },
    imageUrl: `${J}/ברצלונה.png`,
    images: [`${J}/ברצלונה.png`, `${J}/ברצלונה.webp`],
    price: 129.9,
    sizes: SIZES,
  },
  {
    id: "milan-final-retro",
    title: "מילאן גמר רטרו",
    club: "AC Milan",
    league: "Retro",
    era: "רוסונרי קלאסי",
    decade: "90s",
    story: "חולצת גמר מילאן.",
    theme: { primary: "#FB090B", secondary: "#000000", bgStart: "#0f0a0a", bgEnd: "#1a0d0d" },
    imageUrl: `${J}/${encodeURI("מילאן גמר.png")}`,
    images: [`${J}/${encodeURI("מילאן גמר.png")}`, `${J}/${encodeURI("מילאן גמר אחורה.webp")}`],
    price: 129.9,
    sizes: SIZES,
  },
  {
    id: "man-united-retro",
    title: "מנצ'סטר יונייטד רטרו",
    club: "Manchester United",
    league: "Retro",
    era: "יונייטד קלאסי",
    decade: "90s",
    story: "חולצת מנצ'סטר יונייטד קלאסית.",
    theme: { primary: "#DA291C", secondary: "#FBE122", bgStart: "#140a0a", bgEnd: "#1f0d0d" },
    imageUrl: `${J}/${encodeURI("מנצסטר יונייטד.png")}`,
    images: [`${J}/${encodeURI("מנצסטר יונייטד.png")}`, `${J}/${encodeURI("מנצסטר יונייטד..webp")}`],
    price: 129.9,
    sizes: SIZES,
  },
  {
    id: "neymar-retro",
    title: "ניימאר רטרו",
    club: "FC Barcelona",
    league: "Retro",
    era: "עידן ניימאר",
    decade: "90s",
    story: "חולצת ניימאר קלאסית.",
    theme: { primary: "#A50044", secondary: "#004D98", bgStart: "#0d0a0c", bgEnd: "#1a1520" },
    imageUrl: `${J}/ניימאר.png`,
    images: [`${J}/ניימאר.png`, `${J}/ניימאר..png`],
    price: 129.9,
    sizes: SIZES,
  },
  {
    id: "real-madrid-16-17-final",
    title: "ריאל מדריד גמר 16/17",
    club: "Real Madrid",
    league: "Retro",
    era: "גמר ליגת האלופות",
    decade: "90s",
    story: "חולצת גמר ליגת האלופות ריאל מדריד 16/17.",
    theme: { primary: "#FFFFFF", secondary: "#FEBE10", bgStart: "#141414", bgEnd: "#1f1f1f" },
    imageUrl: `${J}/ריאל-מדריד-16-17-גמר.png`,
    images: [`${J}/ריאל-מדריד-16-17-גמר.png`, `${J}/ריאל-מדריד-16-17-גמר..webp`],
    price: 129.9,
    sizes: SIZES,
  },
];

/** Jerseys that have at least one image (imageUrl or images). */
export function hasJerseyImage(j: Jersey): boolean {
  return !!(j.imageUrl || (j.images && j.images.length > 0));
}

function isMongoConfigured(): boolean {
  return !!process.env.MONGODB_URI;
}

export async function getJerseyById(id: string): Promise<Jersey | null> {
  if (!isMongoConfigured()) {
    const j = MOCK_JERSEYS.find((x) => x.id === id);
    return j ?? null;
  }
  await connectDB();
  const doc = await JerseyModel.findOne({ id }).lean();
  return doc ? (doc as Jersey) : null;
}

/** All jerseys (with image) for search/listing. */
export async function getAllJerseys(): Promise<Jersey[]> {
  if (!isMongoConfigured()) return MOCK_JERSEYS.filter(hasJerseyImage);
  await connectDB();
  const docs = await JerseyModel.find({}).lean();
  return (docs as Jersey[]).filter(hasJerseyImage);
}

/** Search jerseys by query (title, club, league, era). Case-insensitive, supports Hebrew. */
export async function searchJerseys(query: string): Promise<Jersey[]> {
  const all = await getAllJerseys();
  const q = query.trim().toLowerCase();
  if (!q) return all;
  const normalized = (s: string) => (s ?? "").toLowerCase();
  return all.filter(
    (j) =>
      normalized(j.title).includes(q) ||
      normalized(j.club).includes(q) ||
      normalized(j.league).includes(q) ||
      normalized(j.era).includes(q)
  );
}

export async function getTrendingJerseys(): Promise<Jersey[]> {
  if (!isMongoConfigured()) return MOCK_JERSEYS.filter((j) => j.trending === true && hasJerseyImage(j));
  await connectDB();
  const docs = await JerseyModel.find({ trending: true }).lean();
  return (docs as Jersey[]).filter(hasJerseyImage);
}

export async function getNewSeasonJerseys(): Promise<Jersey[]> {
  if (!isMongoConfigured()) return MOCK_JERSEYS.filter(hasJerseyImage).slice(0, 8);
  await connectDB();
  const docs = await JerseyModel.find({}).lean();
  return (docs as Jersey[]).filter(hasJerseyImage).slice(0, 8);
}

/** רק נבחרות לאומיות — למונדיאל 2026, בלי חולצות קבוצות */
export async function getWorldCupJerseys(): Promise<Jersey[]> {
  if (!isMongoConfigured()) return MOCK_JERSEYS.filter((j) => hasJerseyImage(j) && j.isNationalTeam === true);
  await connectDB();
  const docs = await JerseyModel.find({ isNationalTeam: true }).lean();
  return (docs as Jersey[]).filter(hasJerseyImage);
}

export async function getBestSellersJerseys(): Promise<Jersey[]> {
  const trending = await getTrendingJerseys();
  if (trending.length >= 4) return trending;
  if (!isMongoConfigured()) return MOCK_JERSEYS.filter(hasJerseyImage).slice(4, 12);
  await connectDB();
  const docs = await JerseyModel.find({}).lean();
  return (docs as Jersey[]).filter(hasJerseyImage).slice(4, 12);
}

export async function getJerseysByDecade(decade: string): Promise<Jersey[]> {
  if (!isMongoConfigured()) return MOCK_JERSEYS.filter((j) => j.decade === decade && hasJerseyImage(j));
  await connectDB();
  const docs = await JerseyModel.find({ decade }).lean();
  return (docs as Jersey[]).filter(hasJerseyImage);
}

function slugToLeagueName(slug: string): string | null {
  const league = LEAGUES.find((l) => l.slug === slug);
  return league ? league.label : null;
}

export async function getJerseysByLeagueSlug(slug: string): Promise<Jersey[]> {
  if (!isMongoConfigured()) {
    if (slug === "retro") return MOCK_JERSEYS.filter((j) => (j.decade === "80s" || j.decade === "90s") && hasJerseyImage(j));
    const leagueName = slugToLeagueName(slug);
    if (!leagueName) return [];
    return MOCK_JERSEYS.filter((j) => j.league === leagueName && hasJerseyImage(j));
  }
  await connectDB();
  if (slug === "retro") {
    const docs = await JerseyModel.find({ decade: { $in: ["80s", "90s"] } }).lean();
    return (docs as Jersey[]).filter(hasJerseyImage);
  }
  const leagueName = slugToLeagueName(slug);
  if (!leagueName) return [];
  const docs = await JerseyModel.find({ league: leagueName }).lean();
  return (docs as Jersey[]).filter(hasJerseyImage);
}
