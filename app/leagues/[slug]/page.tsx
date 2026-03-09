import Link from "next/link";
import { getLeagueBySlug } from "@/lib/leagues";
import { getJerseysByLeagueSlug } from "@/lib/mock-jerseys";
import { LeagueCatalog } from "@/components/LeagueCatalog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function LeaguePage({ params }: PageProps) {
  const { slug: slugParam } = await params;
  const slug = typeof slugParam === "string" ? slugParam : slugParam?.[0] ?? "";
  const league = getLeagueBySlug(slug);
  const jerseys = await getJerseysByLeagueSlug(slug);

  if (!league) {
    return (
      <main className="min-h-screen bg-black px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-light text-white">הליגה לא נמצאה</h1>
          <Link href="/" className="mt-4 inline-block text-white/60 underline hover:text-white">
            חזרה לבית
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <LeagueCatalog
        jerseys={jerseys}
        leagueLabel={league.label}
        leagueDescription={league.description}
      />
    </main>
  );
}
