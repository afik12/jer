"use client";

/**
 * Customer reviews / gallery — 4–6 square placeholder images (Instagram style). Classic e-commerce trust.
 */
const PLACEHOLDERS = [
  "https://placehold.co/400x400/f5f5f5/e5e5e5?text=1",
  "https://placehold.co/400x400/f5f5f5/e5e5e5?text=2",
  "https://placehold.co/400x400/f5f5f5/e5e5e5?text=3",
  "https://placehold.co/400x400/f5f5f5/e5e5e5?text=4",
  "https://placehold.co/400x400/f5f5f5/e5e5e5?text=5",
  "https://placehold.co/400x400/f5f5f5/e5e5e5?text=6",
];

export function ReviewsGallery() {
  return (
    <section className="w-full border-t border-gray-200 bg-gray-50 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14" aria-label="גלריית לקוחות">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-6 text-lg font-semibold tracking-tight text-gray-900 sm:text-xl">
          לובשים אצלנו
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:gap-4">
          {PLACEHOLDERS.map((src, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-lg bg-gray-200"
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
