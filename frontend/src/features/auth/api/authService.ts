import { User } from '@/types';
import { apiFetch } from '@/lib/api';

export const login = async (username: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await apiFetch('/auth/login', {
        method: 'POST',
        skipAuth: true,
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Error en login');
    }

    return response.json();
};

export const register = async (username: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await apiFetch('/auth/register', {
        method: 'POST',
        skipAuth: true,
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Error en registro');
    }

    return response.json();
};
