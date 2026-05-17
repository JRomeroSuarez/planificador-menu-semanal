import { Meal } from '@/types';
import { apiFetch } from '@/lib/api';

export const getMeals = async (): Promise<Meal[]> => {
    const response = await apiFetch('/recipes');
    if (!response.ok) throw new Error('Error al obtener recetas');
    return response.json();
};

export const addMeal = async (mealData: Omit<Meal, 'id'>): Promise<Meal> => {
    const response = await apiFetch('/recipes', {
        method: 'POST',
        body: JSON.stringify(mealData),
    });
    if (!response.ok) throw new Error('Error al crear receta');
    return response.json();
};

export const getMealById = async (id: number): Promise<Meal | undefined> => {
    const response = await apiFetch(`/recipes/${id}`);
    if (!response.ok) {
        if (response.status === 404) return undefined;
        throw new Error('Error al obtener receta');
    }
    return response.json();
};

export const deleteMeal = async (id: number): Promise<void> => {
    const response = await apiFetch(`/recipes/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Error al eliminar receta');
};

export const updateMeal = async (id: number, mealData: Omit<Meal, 'id'>): Promise<Meal> => {
    const response = await apiFetch(`/recipes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(mealData),
    });
    if (!response.ok) throw new Error('Error al actualizar receta');
    return response.json();
};
