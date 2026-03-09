"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Jersey } from "@/types/jersey";

interface ProductGalleryProps {
  jersey: Jersey;
}

export function ProductGallery({ jersey }: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const imageList = useMemo(() => {
    if (jersey.images?.length) return jersey.images;
    if (jersey.imageUrl) return [jersey.imageUrl];
    return [];
  }, [jersey.images, jersey.imageUrl]);

  const currentSrc = imageList[selectedImageIndex];

  return (
    <div className="flex flex-col gap-3">
      {/* Main image — רקע לבן */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-white border border-gray-100">
        {currentSrc ? (
          <AnimatePresence mode="wait">
            <motion.img
              key={selectedImageIndex}
              src={currentSrc}
              alt={`${jersey.title} — תצוגה ${selectedImageIndex + 1}`}
              className="h-full w-full object-contain object-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          </AnimatePresence>
        ) : null}
      </div>

      {/* Thumbnails — only when multiple images */}
      {imageList.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {imageList.map((src, index) => {
            const isActive = index === selectedImageIndex;
            return (
              <button
                key={`${src}-${index}`}
                type="button"
                onClick={() => setSelectedImageIndex(index)}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${isActive ? "border-gray-400 opacity-100" : "border-gray-200 opacity-70"}`}
                aria-label={`תמונה ${index + 1} מתוך ${imageList.length}`}
                aria-pressed={isActive}
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
