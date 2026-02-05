import { useState, useMemo, useEffect } from 'react';
import { Meal, MealType } from '@/types';
import * as mealService from '@/features/meals/api/mealService';
import { useAuth } from '@/features/auth/context/AuthContext';

interface UseRecipesCatalogProps {
    onLoginClick: () => void;
}

export const useRecipesCatalog = ({ onLoginClick }: UseRecipesCatalogProps) => {
    const { user, isAuthenticated } = useAuth();
    const [meals, setMeals] = useState<Meal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState<string>('Todos');

    useEffect(() => {
        setIsLoading(true);
        mealService.getMeals(user?.username || null)
            .then(data => setMeals(data))
            .catch(err => console.error(err))
            .finally(() => setIsLoading(false));
    }, [user]);

    const filteredMeals = useMemo(() => {
        return meals.filter(meal => {
            const matchesSearch = meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                meal.ingredients.some(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesCategory = activeFilter === 'Todos' || meal.type.includes(activeFilter as MealType);
            return matchesSearch && matchesCategory;
        });
    }, [meals, searchTerm, activeFilter]);

    return {
        meals,
        filteredMeals,
        isLoading,
        searchTerm,
        setSearchTerm,
        activeFilter,
        setActiveFilter,
        isAuthenticated
    };
};
