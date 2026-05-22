import { MealType } from '@/types';

export const DAYS_OF_WEEK = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
export const MEAL_TYPES = Object.values(MealType);

export const MealTypeColors: Record<MealType, { bg: string; text: string }> = {
    [MealType.Carne]: { bg: "bg-[#F4D9D0] dark:bg-[#E07A5F]/20", text: "text-[#B5543A] dark:text-[#E8A593]" },
    [MealType.Pescado]: { bg: "bg-[#D6E2E8] dark:bg-[#6B8A99]/20", text: "text-[#4A6B7A] dark:text-[#9CBBC9]" },
    [MealType.Verdura]: { bg: "bg-[#DDE8CF] dark:bg-[#81A263]/20", text: "text-[#5A7341] dark:text-[#A8C48A]" },
    [MealType.Pasta]: { bg: "bg-[#F7E6C4] dark:bg-[#F2CC8F]/20", text: "text-[#A37B36] dark:text-[#E5C485]" },
    [MealType.Legumbre]: { bg: "bg-[#F0DCC4] dark:bg-[#C99A5B]/20", text: "text-[#9A6B33] dark:text-[#D9B380]" },
    [MealType.Ensalada]: { bg: "bg-[#D9E8D3] dark:bg-[#81A263]/20", text: "text-[#567A47] dark:text-[#A8C48A]" },
    [MealType.Otro]: { bg: "bg-[#ECE5D8] dark:bg-white/10", text: "text-[#857A5F] dark:text-[#C9BCA0]" },
};
