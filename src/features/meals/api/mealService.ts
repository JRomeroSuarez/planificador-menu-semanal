import { Meal, MealType } from '@/types';

const initialMeals: Meal[] = [
    { id: 1, name: 'Lentejas con chorizo', type: [MealType.Legumbre], ingredients: [{ name: 'lentejas pardinas', quantity: '400g' }, { name: 'chorizo', quantity: '1 ud' }, { name: 'zanoria', quantity: '2 uds' }, { name: 'patata', quantity: '2 uds' }] },
    { id: 2, name: 'Salmón con espárragos', type: [MealType.Pescado], ingredients: [{ name: 'lomo de salmón', quantity: '2 uds' }, { name: 'limón', quantity: '1 ud' }, { name: 'aceite de oliva', quantity: 'un chorrito' }, { name: 'espárragos', quantity: '1 manojo' }] },
    { id: 3, name: 'Pollo al curry', type: [MealType.Carne], ingredients: [{ name: 'pechuga de pollo', quantity: '400g' }, { name: 'leche de coco', quantity: '1 lata' }, { name: 'curry en polvo', quantity: '2 cdas' }, { name: 'arroz basmati', quantity: '200g' }, { name: 'cebolla', quantity: '1 ud' }] },
    { id: 4, name: 'Ensalada César con Pollo', type: [MealType.Ensalada, MealType.Carne], ingredients: [{ name: 'lechuga romana', quantity: '1 ud' }, { name: 'pechuga de pollo', quantity: '200g' }, { name: 'pan de molde', quantity: '2 rebanadas' }, { name: 'queso parmesano', quantity: '50g' }, { name: 'salsa césar', quantity: 'al gusto' }] },
];

const getMealsFromStorage = (username: string): Meal[] => {
    try {
        const key = `userMeals_${username}`;
        const savedMeals = localStorage.getItem(key);
        if (savedMeals) {
            return JSON.parse(savedMeals);
        }
        // If no meals for this user, start them with the initial list
        localStorage.setItem(key, JSON.stringify(initialMeals));
        return initialMeals;
    } catch (error) {
        console.error("Error loading meals from localStorage:", error);
        return initialMeals;
    }
};

const saveMealsToStorage = (username: string, meals: Meal[]) => {
    try {
        localStorage.setItem(`userMeals_${username}`, JSON.stringify(meals));
    } catch (error) {
        console.error("Error saving meals to localStorage:", error);
    }
};

/**
 * Simula la obtención de comidas de un backend.
 * @param username El nombre de usuario. Si es null, devuelve comidas de prueba.
 * @returns Una Promesa que se resuelve con la lista de comidas.
 */
export const getMeals = (username: string | null): Promise<Meal[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (username) {
                resolve(getMealsFromStorage(username));
            } else {
                resolve(initialMeals);
            }
        }, 300); // Simula retraso de red
    });
};

/**
 * Simula añadir una nueva comida para un usuario autenticado.
 * @param username El nombre de usuario.
 * @param mealData Los datos de la nueva comida.
 * @returns Una Promesa que se resuelve con la comida recién creada.
 */
export const addMeal = (username: string, mealData: Omit<Meal, 'id'>): Promise<Meal> => {
    return new Promise((resolve, reject) => {
        if (!username) {
            return reject(new Error("Usuario no autenticado."));
        }
        setTimeout(() => {
            const userMeals = getMealsFromStorage(username);
            const newMeal: Meal = { ...mealData, id: Date.now() };
            const updatedMeals = [...userMeals, newMeal];
            saveMealsToStorage(username, updatedMeals);
            resolve(newMeal);
        }, 300); // Simula retraso de red
    });
};
