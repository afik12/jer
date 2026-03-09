import type { Jersey } from "./jersey";

/** Patch option: champions-league | league (jersey's league) | none */
export type PatchId = "champions-league" | "league" | "none";

/** Extra price per item when a paid patch is selected (₪) */
export const PATCH_PRICE = 10;

/**
 * Cart line item: jersey + quantity + optional size, personalization, patch.
 * Shared types for web and future React Native app.
 */
export interface CartLineItem {
  jersey: Jersey;
  quantity: number;
  /** Selected size (e.g. S, M, L, XL, XXL) */
  size?: string;
  /** Custom name for printing (e.g. player name) */
  customName?: string;
  /** Custom number for printing (e.g. squad number) */
  customNumber?: string;
  /** League patch: champions-league | league (jersey's league) | none */
  patch?: PatchId;
  /** Mystery Box tier (e.g. Classic Box, Retro Box) */
  tier?: string;
  /** Mystery Box: teams/leagues to avoid (free text) */
  exclusions?: string;
}
