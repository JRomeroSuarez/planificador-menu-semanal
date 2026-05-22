import { Meal, WeeklyPlan } from '@/types';

export interface DerivedIngredient {
    name: string;
    quantities: string[];
}

export const deriveShoppingList = (
    weeklyPlan: WeeklyPlan,
    ignoredIngredients: string[]
): DerivedIngredient[] => {
    const ingredientsMap = new Map<string, string[]>();
    const allMeals = Object.values(weeklyPlan).flatMap(
        (day: WeeklyPlan[string]) => [...day.lunch, ...day.dinner]
    );

    allMeals.forEach((meal: Meal) => {
        meal.ingredients.forEach((ingredient) => {
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
        .filter((ing) => !ignoredIngredients.includes(ing.name.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name));
};
