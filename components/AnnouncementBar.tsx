"use client";

const MESSAGE = "משלוח חינם לכל הארץ | הדפסת שם ומספר בחינם";

/**
 * Blue bar: text runs only between the two lines you marked — starts at 66%, ends at 95%.
 */
export function AnnouncementBar() {
  return (
    <div
      className="relative flex h-9 w-full bg-blue-600 text-white"
      aria-label="Promotion"
    >
      {/* Long strip: marquee runs across most of the bar so it doesn’t “close” too short */}
      <div className="absolute inset-y-0 left-[15%] right-[2%] overflow-hidden">
        <div className="flex h-full w-max shrink-0 animate-marquee items-center py-2 text-xs font-medium tracking-wide sm:text-sm">
          <span className="whitespace-nowrap px-8">{MESSAGE}</span>
          <span className="whitespace-nowrap px-8">{MESSAGE}</span>
          <span className="whitespace-nowrap px-8">{MESSAGE}</span>
        </div>
      </div>
    </div>
  );
}
