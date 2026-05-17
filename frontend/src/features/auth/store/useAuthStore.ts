import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';
import * as authService from '@/features/auth/api/authService';

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            login: async (username, password) => {
                const { user, token } = await authService.login(username, password);
                set({ user, token, isAuthenticated: true });
            },
            logout: () => {
                set({ user: null, token: null, isAuthenticated: false });
            },
        }),
        {
            name: 'auth-storage',
            onRehydrateStorage: () => (rehydratedState) => {
                if (rehydratedState) {
                    rehydratedState.isAuthenticated = !!rehydratedState.token;
                }
            },
        }
    )
);
