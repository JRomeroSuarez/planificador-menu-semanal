import { Meal } from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Obtiene las comidas del backend.
 * @param userId El ID del usuario.
 */
export const getMeals = async (userId: number | undefined): Promise<Meal[]> => {
    let url = `${API_URL}/recipes`;

    // Si hay usuario, filtramos por él (o mostramos sus recetas + públicas si implementamos eso)
    // Por ahora, el backend devuelve recetas del usuario si se pasa ID
    if (userId) {
        url += `?userId=${userId}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al obtener recetas');

    return response.json();
};

export const addMeal = async (userId: number, mealData: Omit<Meal, 'id'>): Promise<Meal> => {
    const response = await fetch(`${API_URL}/recipes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...mealData,
            userId
        }),
    });

    if (!response.ok) throw new Error('Error al crear receta');
    return response.json();
};

export const getMealById = async (id: number): Promise<Meal | undefined> => {
    const response = await fetch(`${API_URL}/recipes/${id}`);
    if (!response.ok) {
        if (response.status === 404) return undefined;
        throw new Error('Error al obtener receta');
    }
    return response.json();
};

export const deleteMeal = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/recipes/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) throw new Error('Error al eliminar receta');
};

export const updateMeal = async (id: number, userId: number, mealData: Omit<Meal, 'id'>): Promise<Meal> => {
    const response = await fetch(`${API_URL}/recipes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...mealData,
            userId
        }),
    });

    if (!response.ok) throw new Error('Error al actualizar receta');
    return response.json();
};
