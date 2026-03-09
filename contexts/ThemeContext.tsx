"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { JerseyTheme } from "@/types/jersey";

interface ThemeContextValue {
  /** Current theme (from selected jersey or default) */
  theme: JerseyTheme | null;
  setTheme: (theme: JerseyTheme | null) => void;
}

const defaultTheme: JerseyTheme = {
  primary: "#71717a",
  secondary: "#3f3f46",
  bgStart: "#0a0a0b",
  bgEnd: "#18181b",
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: defaultTheme,
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<JerseyTheme | null>(null);
  const setTheme = useCallback((t: JerseyTheme | null) => setThemeState(t), []);

  const value: ThemeContextValue = {
    theme: theme ?? defaultTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
