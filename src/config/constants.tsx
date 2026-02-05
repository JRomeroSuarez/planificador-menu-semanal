import { MealType } from "../types";

export const MEAL_TYPES = Object.values(MealType);

export const DAYS_OF_WEEK = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export const MealTypeColors: Record<MealType, { bg: string; text: string; border: string }> = {
    [MealType.Carne]: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
    [MealType.Pescado]: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
    [MealType.Pasta]: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
    [MealType.Verdura]: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
    [MealType.Legumbre]: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' },
    [MealType.Ensalada]: { bg: 'bg-lime-100', text: 'text-lime-800', border: 'border-lime-300' },
    [MealType.Otro]: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' },
};

export const MealTypeIcons: Record<MealType, React.ReactNode> = {
    [MealType.Carne]: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M19.707 8.293a1 1 0 00-1.414-1.414l-2.25 2.25a1 1 0 01-1.282.13l-1.93-1.037a1 1 0 00-1.15.293L10 10.586 8.293 8.879a1 1 0 00-1.414 0L4.586 11.25 2.293 8.957a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l1.707-1.707 1.707 1.707a1 1 0 001.414 0l2-2 1.586 1.586a1 1 0 001.282.13l2.5-1.34a1 1 0 00.52-.903V9.5a1 1 0 00-.293-1.207z" clipRule="evenodd" /></svg>,
    [MealType.Pescado]: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3.5a1 1 0 00.02 1.84L9 9.382l-6.98 3.49a1 1 0 00.75 1.84l7-3.5a1 1 0 00.788 0l7 3.5a1 1 0 00.75-1.84L11 9.382l6.98-3.49a1 1 0 00.02-1.84l-7-3.5z" /></svg>,
    [MealType.Pasta]: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 003 15v3a1 1 0 001 1h12a1 1 0 001-1v-3a1 1 0 00-.293-.707L16 11.586V8a6 6 0 00-6-6zM8 8a2 2 0 114 0v5a2 2 0 11-4 0V8z" /></svg>,
    [MealType.Verdura]: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.5 9a.5.5 0 000 1h3v3a.5.5 0 001 0v-3h3a.5.5 0 000-1h-3V6a.5.5 0 00-1 0v3h-3z" clipRule="evenodd" /></svg>,
    [MealType.Legumbre]: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /></svg>,
    [MealType.Ensalada]: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M17.884 5.116a1.5 1.5 0 00-2.062-2.192l-4.22 3.617a1.5 1.5 0 00-.22 2.032l1.938 2.26a1.5 1.5 0 002.121.08L17.884 5.116zM2.116 14.884a1.5 1.5 0 002.062 2.192l4.22-3.617a1.5 1.5 0 00.22-2.032L6.68 9.167a1.5 1.5 0 00-2.121-.08L2.116 14.884z" /></svg>,
    [MealType.Otro]: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v1.586l3.293-3.293a1 1 0 111.414 1.414L12.414 7H14a1 1 0 110 2h-1.586l3.293 3.293a1 1 0 11-1.414 1.414L11 10.414V12a1 1 0 11-2 0v-1.586l-3.293 3.293a1 1 0 01-1.414-1.414L7.586 9H6a1 1 0 110-2h1.586L4.293 3.707a1 1 0 011.414-1.414L9 5.586V4a1 1 0 011-1z" clipRule="evenodd" /></svg>,
};