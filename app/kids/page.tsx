import Link from "next/link";

export default function KidsPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-2xl font-semibold text-gray-900">חולצות ילדים</h1>
        <p className="mt-2 text-gray-500">
          מידות נוער וקולקציית ילדים בקרוב.
        </p>
        <Link href="/" className="mt-6 inline-block text-gray-600 underline hover:text-gray-900">
          חזרה לבית
        </Link>
      </div>
    </main>
  );
}
