import { useState, useMemo, useCallback, useEffect } from 'react';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { Meal, WeeklyPlan, Ingredient } from '@/types';
import { DAYS_OF_WEEK } from '@/utils/constants';
import { useAuth } from '@/features/auth/context/AuthContext';
import * as mealService from '@/features/meals/api/mealService';

const initialWeeklyPlan: WeeklyPlan = DAYS_OF_WEEK.reduce((acc: WeeklyPlan, day: string) => ({
    ...acc,
    [day]: { lunch: [], dinner: [] }
}), {});

interface UsePlannerProps {
    onLoginClick: () => void;
}

export const usePlanner = ({ onLoginClick }: UsePlannerProps) => {
    const { user } = useAuth();
    const [meals, setMeals] = useState<Meal[]>([]);
    const [isLoadingMeals, setIsLoadingMeals] = useState(true);
    const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>(initialWeeklyPlan);
    const [manualIngredients, setManualIngredients] = useState<Ingredient[]>([]);
    const [ignoredIngredients, setIgnoredIngredients] = useState<string[]>([]);
    const [activeMeal, setActiveMeal] = useState<Meal | null>(null);

    useEffect(() => {
        setIsLoadingMeals(true);
        mealService.getMeals(user?.username || null)
            .then((userMeals: Meal[]) => {
                setMeals(userMeals);
            })
            .catch((error: Error) => console.error("Failed to load meals:", error))
            .finally(() => setIsLoadingMeals(false));
    }, [user]);

    const findMealById = useCallback((id: number): Meal | undefined =>
        meals.find(m => m.id === id), [meals]);

    const addMeal = async (mealData: Omit<Meal, 'id'>) => {
        if (!user) {
            onLoginClick();
            return;
        }
        try {
            const newMeal = await mealService.addMeal(user.username, mealData);
            setMeals(prev => [...prev, newMeal]);
        } catch (error) {
            console.error("Failed to add meal:", error);
            alert("Hubo un error al añadir la comida.");
        }
    };

    const handleDragStart = (event: DragStartEvent) => {
        const meal = findMealById(Number(event.active.id));
        if (meal) setActiveMeal(meal);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveMeal(null);
        const { active, over } = event;
        const overId = over?.id.toString();

        if (overId && overId.startsWith('day-')) {
            const [, day, mealTime] = overId.split('-') as [string, string, 'lunch' | 'dinner'];
            if (day && mealTime) {
                const mealId = Number(active.id);
                const meal = findMealById(mealId);
                if (meal && !weeklyPlan[day][mealTime].find(m => m.id === mealId)) {
                    setWeeklyPlan(prev => ({
                        ...prev,
                        [day]: { ...prev[day], [mealTime]: [...prev[day][mealTime], meal] }
                    }));
                }
            }
        }
    };

    const removeMealFromDay = (day: string, mealTime: 'lunch' | 'dinner', mealId: number) => {
        setWeeklyPlan(prev => ({
            ...prev,
            [day]: { ...prev[day], [mealTime]: prev[day][mealTime].filter(meal => meal.id !== mealId) }
        }));
    };

    const derivedShoppingList = useMemo(() => {
        const ingredientsMap = new Map<string, string[]>();
        const allMeals = Object.values(weeklyPlan).flatMap((day: WeeklyPlan[string]) => [...day.lunch, ...day.dinner]);

        allMeals.forEach((meal: Meal) => {
            meal.ingredients.forEach(ingredient => {
                const name = ingredient.name.toLowerCase().trim();
                const quantity = ingredient.quantity.trim();
                if (!ingredientsMap.has(name)) {
                    ingredientsMap.set(name, []);
                }
                ingredientsMap.get(name)!.push(quantity);
            });
        });

        return Array.from(ingredientsMap.entries())
            .map(([name, quantities]) => ({
                name: name.charAt(0).toUpperCase() + name.slice(1),
                quantities,
            }))
            .filter(ing => !ignoredIngredients.includes(ing.name.toLowerCase()))
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [weeklyPlan, ignoredIngredients]);

    const addManualIngredient = (ingredient: Ingredient) => {
        setManualIngredients(prev => [...prev, ingredient]);
    };

    const removeManualIngredient = (index: number) => {
        setManualIngredients(prev => prev.filter((_, i) => i !== index));
    };

    const removeDerivedIngredient = (name: string) => {
        setIgnoredIngredients(prev => [...prev, name.toLowerCase()]);
    };

    const savePlan = () => {
        localStorage.setItem('weeklyMealPlan', JSON.stringify(weeklyPlan));
        alert('¡Plan guardado con éxito!');
    };

    const loadPlan = () => {
        const savedPlan = localStorage.getItem('weeklyMealPlan');
        if (savedPlan) {
            setWeeklyPlan(JSON.parse(savedPlan) as WeeklyPlan);
            alert('¡Plan cargado correctamente!');
        } else {
            alert('No se encontró ningún plan guardado.');
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return {
        meals,
        isLoadingMeals,
        weeklyPlan,
        manualIngredients,
        activeMeal,
        derivedShoppingList,
        addMeal,
        handleDragStart,
        handleDragEnd,
        removeMealFromDay,
        addManualIngredient,
        removeManualIngredient,
        removeDerivedIngredient,
        savePlan,
        loadPlan,
        handlePrint
    };
};
