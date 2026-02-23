import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ShoppingItem {
    id: string;
    name: string;
    quantity?: string;
    checked: boolean;
    source: 'manual' | 'meal-plan';
}

interface ShoppingListState {
    items: ShoppingItem[];
    addItem: (name: string, quantity?: string) => void;
    removeItem: (id: string) => void;
    toggleItem: (id: string) => void;
    clearList: () => void;
}

export const useShoppingListStore = create<ShoppingListState>()(
    persist(
        (set) => ({
            items: [],
            addItem: (name, quantity = '') => set((state) => ({
                items: [
                    ...state.items,
                    {
                        id: crypto.randomUUID(),
                        name,
                        quantity,
                        checked: false,
                        source: 'manual'
                    }
                ]
            })),
            removeItem: (id) => set((state) => ({
                items: state.items.filter((item) => item.id !== id)
            })),
            toggleItem: (id) => set((state) => ({
                items: state.items.map((item) =>
                    item.id === id ? { ...item, checked: !item.checked } : item
                )
            })),
            clearList: () => set({ items: [] }),
        }),
        {
            name: 'shopping-list-storage', // name of the item in the storage (must be unique)
        }
    )
);
