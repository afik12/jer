import type { Decade } from "@/types/jersey";

/**
 * Decade definitions for the timeline slider.
 * Shared constants for web and future RN app.
 */
export const DECADES: Decade[] = [
  { id: "70s", label: "70s", startYear: 1970, endYear: 1979, accent: "#c9a227" },
  { id: "80s", label: "80s", startYear: 1980, endYear: 1989, accent: "#e11d48" },
  { id: "90s", label: "90s", startYear: 1990, endYear: 1999, accent: "#22c55e" },
  { id: "00s", label: "00s", startYear: 2000, endYear: 2009, accent: "#3b82f6" },
  { id: "10s", label: "10s", startYear: 2010, endYear: 2019, accent: "#8b5cf6" },
  { id: "20s", label: "20s", startYear: 2020, endYear: 2029, accent: "#06b6d4" },
];
