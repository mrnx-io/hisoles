import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  hasHydrated: boolean
  setHasHydrated: (hasHydrated: boolean) => void
  openCart: () => void
  closeCart: () => void
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (newItem) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === newItem.id)
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
              ),
              isOpen: true,
            }
          }
          return {
            items: [...state.items, { ...newItem, quantity: 1 }],
            isOpen: true,
          }
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((item) => item.id !== id) }
          }
          return {
            items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
          }
        }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "hisoles-cart",
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)

// Computed selectors
export const selectTotalItems = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0)

export const selectTotalPrice = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
