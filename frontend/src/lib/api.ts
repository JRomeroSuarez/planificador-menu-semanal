const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const getToken = (): string | null => {
    try {
        const stored = localStorage.getItem('auth-storage');
        if (!stored) return null;
        const parsed = JSON.parse(stored);
        return parsed?.state?.token ?? null;
    } catch {
        return null;
    }
};

type FetchOptions = RequestInit & { skipAuth?: boolean };

export const apiFetch = async (path: string, options: FetchOptions = {}): Promise<Response> => {
    const { skipAuth, ...fetchOptions } = options;
    const token = skipAuth ? null : getToken();

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(fetchOptions.headers as Record<string, string>),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return fetch(`${API_URL}${path}`, { ...fetchOptions, headers });
};

export const uploadImage = async (file: File): Promise<string> => {
    const token = getToken();
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_URL}/uploads/image`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
    });

    if (!response.ok) throw new Error('Error al subir la imagen');
    const data = await response.json();
    return data.url as string;
};
