export enum MealType {
    Carne = 'Carne',
    Pescado = 'Pescado',
    Pasta = 'Pasta',
    Verdura = 'Verdura',
    Legumbre = 'Legumbre',
    Ensalada = 'Ensalada',
    Otro = 'Otro',
}

export interface Ingredient {
    name: string;
    quantity: string;
}

export interface Meal {
    id: number;
    name:string;
    type: MealType[];
    ingredients: Ingredient[];
}

export interface WeeklyPlan {
    [day: string]: {
        lunch: Meal[];
        dinner: Meal[];
    };
}

export interface User {
    username: string;
}
