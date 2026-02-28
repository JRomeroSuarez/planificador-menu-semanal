import { create } from 'zustand';

interface UIState {
    isLoginModalOpen: boolean;
    isRegisterModalOpen: boolean;
    isShoppingListOpen: boolean;
    openLogin: () => void;
    openRegister: () => void;
    openShoppingList: () => void;
    closeLogin: () => void;
    closeRegister: () => void;
    closeShoppingList: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isLoginModalOpen: false,
    isRegisterModalOpen: false,
    isShoppingListOpen: false,
    openLogin: () => set({ isRegisterModalOpen: false, isLoginModalOpen: true }),
    openRegister: () => set({ isLoginModalOpen: false, isRegisterModalOpen: true }),
    openShoppingList: () => set({ isShoppingListOpen: true }),
    closeLogin: () => set({ isLoginModalOpen: false }),
    closeRegister: () => set({ isRegisterModalOpen: false }),
    closeShoppingList: () => set({ isShoppingListOpen: false }),
}));
