import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "TheFootyKits — חולצות כדורגל פרימיום",
  description:
    "גלה, קנה ומכור חולצות כדורגל. חוויית קניה פרימיום לאורך עונות וסיפורים.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className="antialiased">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Providers>
          <header className="fixed top-0 left-0 right-0 z-30 flex flex-col bg-white shadow-sm">
            <AnnouncementBar />
            <Suspense fallback={<div className="h-16 bg-white" />}>
              <Navbar />
            </Suspense>
          </header>
          <div className="min-h-screen pt-[6.25rem]">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
