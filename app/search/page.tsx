import Link from "next/link";
import { searchJerseys } from "@/lib/mock-jerseys";
import { ProductCard } from "@/components/ProductCard";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = "" } = await searchParams;
  const query = typeof q === "string" ? q : q?.[0] ?? "";
  const jerseys = await searchJerseys(query);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-gray-500 transition hover:text-gray-900"
        >
          ← חזרה לחנות
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {query.trim() ? `תוצאות חיפוש עבור "${query}"` : "חיפוש חולצות"}
        </h1>
        <p className="mt-1 text-gray-600">
          {query.trim()
            ? `נמצאו ${jerseys.length} חולצות`
            : "הזן מילות חיפוש בסרגל למעלה (למשל: ברצלונה, ארסנל, פרימייר ליג)."}
        </p>

        {query.trim() && jerseys.length === 0 && (
          <p className="mt-8 text-center text-gray-500">
            לא נמצאו חולצות התואמות את החיפוש. נסה מילים אחרות.
          </p>
        )}

        {jerseys.length > 0 && (
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
            {jerseys.map((jersey, i) => (
              <li key={jersey.id}>
                <ProductCard jersey={jersey} index={i} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
