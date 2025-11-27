import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/lib/types/cart";

export type { CartItem };

type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (tourId: number) => void;
  updateQuantity: (tourId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.tourId === item.tourId,
          );
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.tourId === item.tourId
                  ? { ...i, quantity: i.quantity + 1 }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),

      removeItem: (tourId) =>
        set((state) => ({
          items: state.items.filter((i) => i.tourId !== tourId),
        })),

      updateQuantity: (tourId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.tourId !== tourId)
              : state.items.map((i) =>
                  i.tourId === tourId ? { ...i, quantity } : i,
                ),
        })),

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + parseFloat(item.price) * item.quantity,
          0,
        );
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "nadair-cart-storage",
    },
  ),
);
