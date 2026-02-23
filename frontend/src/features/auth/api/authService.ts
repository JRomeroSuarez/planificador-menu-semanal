import { User } from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const login = async (username: string, password: string): Promise<User> => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        throw new Error('Error en login');
    }

    const data = await response.json();
    return data.user;
};

export const register = async (username: string, password: string): Promise<User> => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        throw new Error('Error en registro');
    }

    const data = await response.json();
    return data.user;
};
