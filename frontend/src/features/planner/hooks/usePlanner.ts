import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { Meal, WeeklyPlan, Ingredient } from '@/types';
import { DAYS_OF_WEEK } from '@/utils/constants';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import * as mealService from '@/features/meals/api/mealService';
import * as planService from '@/features/planner/api/planService';
import { useShoppingListStore } from '@/features/shopping/store/useShoppingListStore';

const initialWeeklyPlan: WeeklyPlan = DAYS_OF_WEEK.reduce((acc: WeeklyPlan, day: string) => ({
    ...acc,
    [day]: { lunch: [], dinner: [] }
}), {});

export const usePlanner = () => {
    const { user, isAuthenticated } = useAuthStore();
    const { openLogin } = useUIStore();
    const [meals, setMeals] = useState<Meal[]>([]);
    const [isLoadingMeals, setIsLoadingMeals] = useState(true);
    const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>(initialWeeklyPlan);
    const [manualIngredients, setManualIngredients] = useState<Ingredient[]>([]);
    const [ignoredIngredients, setIgnoredIngredients] = useState<string[]>([]);
    const [activeMeal, setActiveMeal] = useState<Meal | null>(null);
    const [isSyncing, setIsSyncing] = useState(false);
    const addItem = useShoppingListStore(state => state.addItem);
    const syncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isFirstLoad = useRef(true);

    useEffect(() => {
        if (!isAuthenticated) return;

        isFirstLoad.current = true;
        setIsLoadingMeals(true);
        Promise.all([
            mealService.getMeals(),
            planService.getPlan(),
        ])
            .then(([userMeals, savedPlan]) => {
                setMeals(userMeals);
                setWeeklyPlan(savedPlan);
            })
            .catch((error: Error) => console.error('Failed to load data:', error))
            .finally(() => {
                setIsLoadingMeals(false);
                // Espera un tick para que setWeeklyPlan haya hecho render antes de activar el auto-save
                setTimeout(() => { isFirstLoad.current = false; }, 0);
            });

        const savedManual = localStorage.getItem('manualIngredients');
        if (savedManual) setManualIngredients(JSON.parse(savedManual));

        const savedIgnored = localStorage.getItem('ignoredIngredients');
        if (savedIgnored) setIgnoredIngredients(JSON.parse(savedIgnored));
    }, [user, isAuthenticated]);

    // Auto-save con debounce de 1s tras cada cambio en el plan
    useEffect(() => {
        if (isFirstLoad.current || !isAuthenticated) return;

        if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
        syncTimeoutRef.current = setTimeout(async () => {
            setIsSyncing(true);
            try {
                await planService.syncPlan(weeklyPlan);
            } catch (err) {
                console.error('Error al sincronizar plan:', err);
            } finally {
                setIsSyncing(false);
            }
        }, 1000);

        return () => {
            if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
        };
    }, [weeklyPlan, isAuthenticated]);

    useEffect(() => {
        localStorage.setItem('manualIngredients', JSON.stringify(manualIngredients));
    }, [manualIngredients]);

    useEffect(() => {
        localStorage.setItem('ignoredIngredients', JSON.stringify(ignoredIngredients));
    }, [ignoredIngredients]);

    const findMealById = useCallback((id: number): Meal | undefined =>
        meals.find(m => m.id === id), [meals]);

    const addMeal = async (mealData: Omit<Meal, 'id'>) => {
        if (!user) {
            openLogin();
            return;
        }
        try {
            const newMeal = await mealService.addMeal(mealData);
            setMeals(prev => [...prev, newMeal]);
        } catch (error) {
            console.error('Failed to add meal:', error);
            alert('Hubo un error al añadir la comida.');
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
                if (!ingredientsMap.has(name)) ingredientsMap.set(name, []);
                ingredientsMap.get(name)!.push(quantity);
            });
        });

        return Array.from(ingredientsMap.entries())
            .map(([name, quantities]) => ({
                name: name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Sin nombre',
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

    const handlePrint = () => window.print();

    return {
        meals,
        isLoadingMeals,
        isSyncing,
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
        handlePrint
    };
};
