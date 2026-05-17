import { WeeklyPlan } from '@/types';
import { apiFetch } from '@/lib/api';

export const getPlan = async (): Promise<WeeklyPlan> => {
    const response = await apiFetch('/plans');
    if (!response.ok) throw new Error('Error al obtener el plan');
    return response.json();
};

export const syncPlan = async (plan: WeeklyPlan): Promise<void> => {
    const response = await apiFetch('/plans/sync', {
        method: 'POST',
        body: JSON.stringify({ plan }),
    });
    if (!response.ok) throw new Error('Error al sincronizar el plan');
};
