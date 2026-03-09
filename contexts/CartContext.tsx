"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import type { Jersey } from "@/types/jersey";
import type { CartLineItem, PatchId } from "@/types/cart";
import { PATCH_PRICE } from "@/types/cart";

interface CartContextValue {
  items: CartLineItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (jersey: Jersey, quantity?: number, options?: { size?: string; customName?: string; customNumber?: string; patch?: PatchId; tier?: string; exclusions?: string }) => void;
  removeItem: (jerseyId: string) => void;
  removeItemAt: (index: number) => void;
  updateQuantity: (jerseyId: string, quantity: number) => void;
  updateQuantityAt: (index: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLineItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((o) => !o), []);

  const addItem = useCallback((
    jersey: Jersey,
    quantity = 1,
    options?: { size?: string; customName?: string; customNumber?: string; patch?: PatchId; tier?: string; exclusions?: string }
  ) => {
    setItems((prev) => {
      const match = (i: CartLineItem) =>
        i.jersey.id === jersey.id &&
        (i.size ?? "") === (options?.size ?? "") &&
        (i.customName ?? "") === (options?.customName ?? "") &&
        (i.customNumber ?? "") === (options?.customNumber ?? "") &&
        (i.patch ?? "none") === (options?.patch ?? "none") &&
        (i.tier ?? "") === (options?.tier ?? "") &&
        (i.exclusions ?? "") === (options?.exclusions ?? "");
      const existing = prev.find(match);
      if (existing) {
        return prev.map((i) =>
          match(i) ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { jersey, quantity, ...options }];
    });
  }, []);

  const removeItem = useCallback((jerseyId: string) => {
    setItems((prev) => prev.filter((i) => i.jersey.id !== jerseyId));
  }, []);

  const removeItemAt = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateQuantity = useCallback((jerseyId: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => i.jersey.id !== jerseyId));
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.jersey.id === jerseyId ? { ...i, quantity } : i
      )
    );
  }, []);

  const updateQuantityAt = useCallback((index: number, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((_, i) => i !== index));
      return;
    }
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );
  const subtotal = useMemo(
    () =>
      items.reduce((sum, i) => {
        const base = (i.jersey.price ?? 0) * i.quantity;
        const patchExtra =
          (i.patch === "champions-league" || i.patch === "league")
            ? PATCH_PRICE * i.quantity
            : 0;
        return sum + base + patchExtra;
      }, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    isOpen,
    openCart,
    closeCart,
    toggleCart,
    addItem,
    removeItem,
    removeItemAt,
    updateQuantity,
    updateQuantityAt,
    clearCart,
    totalItems,
    subtotal,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
