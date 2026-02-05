import { MealType } from '@/types';

export const DAYS_OF_WEEK = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
export const MEAL_TYPES = Object.values(MealType);

export const MealTypeColors: Record<MealType, { bg: string; text: string }> = {
    [MealType.Carne]: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-300" },
    [MealType.Pescado]: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-300" },
    [MealType.Verdura]: { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-300" },
    [MealType.Pasta]: { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-700 dark:text-yellow-300" },
    [MealType.Legumbre]: { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-300" },
    [MealType.Ensalada]: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-300" },
    [MealType.Otro]: { bg: "bg-gray-100 dark:bg-white/10", text: "text-gray-600 dark:text-gray-400" },
};
