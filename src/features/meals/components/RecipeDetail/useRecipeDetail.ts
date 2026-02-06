import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Meal } from '@/types';
import * as mealService from '@/features/meals/api/mealService';
import { useAuth } from '@/features/auth/context/AuthContext';

export const useRecipeDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const [meal, setMeal] = useState<Meal | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        setIsLoading(true);
        mealService.getMealById(Number(id))
            .then(data => setMeal(data || null))
            .catch(err => console.error(err))
            .finally(() => setIsLoading(false));
    }, [id, user]);

    return {
        meal,
        isLoading
    };
};
