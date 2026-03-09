"use client";

const BADGES = [
  {
    id: "secure",
    label: "תשלום מאובטח",
    icon: "🔒",
  },
  {
    id: "shipping",
    label: "משלוח חינם",
    icon: "📦",
  },
  {
    id: "support",
    label: "תמיכה מהירה",
    icon: "💬",
  },
  {
    id: "returns",
    label: "החזרות קלות",
    icon: "↩",
  },
];

/**
 * Trust badges row (Secure Checkout, Free Shipping, Fast Support, Returns). Classic e-commerce.
 */
export function TrustBadges() {
  return (
    <section className="w-full border-t border-gray-200 bg-gray-50 py-8 sm:py-10" aria-label="יתרונות">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
          {BADGES.map((badge) => (
            <div
              key={badge.id}
              className="flex flex-col items-center gap-2 text-center"
            >
              <span className="text-2xl" aria-hidden>
                {badge.icon}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
