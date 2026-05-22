import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { Meal, WeeklyPlan } from '@/types';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';
import * as mealService from '@/features/meals/api/mealService';
import * as planService from '@/features/planner/api/planService';
import { usePlannerStore } from '@/features/planner/store/usePlannerStore';

export const usePlanner = () => {
    const { user, isAuthenticated } = useAuthStore();
    const { openLogin } = useUIStore();
    const weeklyPlan = usePlannerStore(state => state.weeklyPlan);
    const setWeeklyPlan = usePlannerStore(state => state.setWeeklyPlan);
    const [meals, setMeals] = useState<Meal[]>([]);
    const [isLoadingMeals, setIsLoadingMeals] = useState(true);
    const [activeMeal, setActiveMeal] = useState<Meal | null>(null);
    const [isSyncing, setIsSyncing] = useState(false);
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
                setTimeout(() => { isFirstLoad.current = false; }, 0);
            });
    }, [user, isAuthenticated, setWeeklyPlan]);

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
                    setWeeklyPlan((prev: WeeklyPlan) => ({
                        ...prev,
                        [day]: { ...prev[day], [mealTime]: [...prev[day][mealTime], meal] }
                    }));
                }
            }
        }
    };

    const removeMealFromDay = (day: string, mealTime: 'lunch' | 'dinner', mealId: number) => {
        setWeeklyPlan((prev: WeeklyPlan) => ({
            ...prev,
            [day]: { ...prev[day], [mealTime]: prev[day][mealTime].filter(meal => meal.id !== mealId) }
        }));
    };

    const handlePrint = () => window.print();

    return {
        meals,
        isLoadingMeals,
        isSyncing,
        weeklyPlan,
        activeMeal,
        addMeal,
        handleDragStart,
        handleDragEnd,
        removeMealFromDay,
        handlePrint,
    };
};
