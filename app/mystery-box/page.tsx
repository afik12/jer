import Link from "next/link";
import { MysteryBoxConfig } from "@/components/MysteryBoxConfig";

export default function MysteryBoxPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900 sm:px-6 lg:py-10">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
      >
        ← Back to store
      </Link>
      <MysteryBoxConfig />
    </main>
  );
}
