"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useMotionValue, PanInfo } from "framer-motion";
import { DECADES } from "@/lib/constants";
import type { DecadeId } from "@/types/jersey";

interface DecadeTimelineSliderProps {
  /** Currently selected decade */
  selectedDecade: DecadeId;
  /** Called when user selects a decade (touch or click) */
  onDecadeChange: (decade: DecadeId) => void;
  /** Optional class name for container */
  className?: string;
}

const CARD_WIDTH = 120;
const GAP = 12;

export function DecadeTimelineSlider({
  selectedDecade,
  onDecadeChange,
  className = "",
}: DecadeTimelineSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const selectedIndex = DECADES.findIndex((d) => d.id === selectedDecade);

  const handleSelect = useCallback(
    (id: DecadeId) => {
      if (isDragging) return;
      onDecadeChange(id);
    },
    [isDragging, onDecadeChange]
  );

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      setIsDragging(false);
      const velocity = info.velocity.x;
      const offset = info.offset.x;
      if (Math.abs(velocity) > 200 || Math.abs(offset) > 60) {
        const direction = velocity > 0 || offset > 0 ? -1 : 1;
        const next = Math.max(
          0,
          Math.min(DECADES.length - 1, selectedIndex + direction)
        );
        onDecadeChange(DECADES[next].id);
      }
    },
    [selectedIndex, onDecadeChange]
  );

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden touch-pan-y select-none ${className}`}
    >
      <motion.div
        className="flex cursor-grab active:cursor-grabbing"
        style={{ gap: GAP, x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
      >
        {DECADES.map((decade) => (
          <motion.button
            key={decade.id}
            type="button"
            onClick={() => handleSelect(decade.id)}
            className="shrink-0 rounded-xl border-2 px-5 py-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-locker-dark"
            style={{
              width: CARD_WIDTH,
              minHeight: 72,
              borderColor:
                selectedDecade === decade.id
                  ? decade.accent ?? "var(--locker-border)"
                  : "var(--locker-border)",
              backgroundColor:
                selectedDecade === decade.id
                  ? `${decade.accent ?? "#27272a"}20`
                  : "var(--locker-panel)",
            }}
            whileTap={{ scale: 0.98 }}
            aria-pressed={selectedDecade === decade.id}
            aria-label={`Explore ${decade.label}`}
          >
            <span
              className="block text-lg font-semibold tracking-tight"
              style={{
                color: selectedDecade === decade.id ? decade.accent : "#a1a1aa",
              }}
            >
              {decade.label}
            </span>
            <span className="mt-0.5 block text-xs text-zinc-500">
              {decade.startYear}–{decade.endYear}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
