import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Ingredient, WeeklyPlan } from '@/types';
import { DAYS_OF_WEEK } from '@/utils/constants';

const initialWeeklyPlan: WeeklyPlan = DAYS_OF_WEEK.reduce(
    (acc: WeeklyPlan, day: string) => ({
        ...acc,
        [day]: { lunch: [], dinner: [] },
    }),
    {}
);

interface PlannerState {
    weeklyPlan: WeeklyPlan;
    manualIngredients: Ingredient[];
    ignoredIngredients: string[];
    setWeeklyPlan: (plan: WeeklyPlan | ((prev: WeeklyPlan) => WeeklyPlan)) => void;
    addManualIngredient: (ingredient: Ingredient) => void;
    removeManualIngredient: (index: number) => void;
    ignoreDerivedIngredient: (name: string) => void;
    resetIgnored: () => void;
}

export const usePlannerStore = create<PlannerState>()(
    persist(
        (set) => ({
            weeklyPlan: initialWeeklyPlan,
            manualIngredients: [],
            ignoredIngredients: [],
            setWeeklyPlan: (plan) =>
                set((state) => ({
                    weeklyPlan: typeof plan === 'function' ? plan(state.weeklyPlan) : plan,
                })),
            addManualIngredient: (ingredient) =>
                set((state) => ({ manualIngredients: [...state.manualIngredients, ingredient] })),
            removeManualIngredient: (index) =>
                set((state) => ({
                    manualIngredients: state.manualIngredients.filter((_, i) => i !== index),
                })),
            ignoreDerivedIngredient: (name) =>
                set((state) => ({
                    ignoredIngredients: [...state.ignoredIngredients, name.toLowerCase()],
                })),
            resetIgnored: () => set({ ignoredIngredients: [] }),
        }),
        {
            name: 'planner-storage',
            partialize: (state) => ({
                manualIngredients: state.manualIngredients,
                ignoredIngredients: state.ignoredIngredients,
            }),
        }
    )
);
