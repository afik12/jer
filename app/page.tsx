import { LookbookHome } from "@/components/LookbookHome";
import {
  getNewSeasonJerseys,
  getWorldCupJerseys,
  getBestSellersJerseys,
} from "@/lib/mock-jerseys";

export default async function Home() {
  const [newSeasonJerseys, worldCupJerseys, bestSellersJerseys] = await Promise.all([
    getNewSeasonJerseys(),
    getWorldCupJerseys(),
    getBestSellersJerseys(),
  ]);
  return (
    <LookbookHome
      newSeasonJerseys={newSeasonJerseys}
      worldCupJerseys={worldCupJerseys}
      bestSellersJerseys={bestSellersJerseys}
    />
  );
}
