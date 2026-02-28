import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';
import * as authService from '@/features/auth/api/authService';

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            login: async (username, password) => {
                const userData = await authService.login(username, password);
                set({ user: userData, isAuthenticated: true });
            },
            logout: () => {
                set({ user: null, isAuthenticated: false });
            },
        }),
        {
            name: 'auth-storage',
            onRehydrateStorage: (state) => {
                return (rehydratedState) => {
                    if (rehydratedState) {
                        // Update isAuthenticated based on rehydrated user
                        rehydratedState.isAuthenticated = !!rehydratedState.user;
                    }
                };
            },
        }
    )
);
