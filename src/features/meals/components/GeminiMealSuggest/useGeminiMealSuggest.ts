import { useState } from 'react';
import { suggestMeal } from '@/features/meals/api/geminiService';
import { Meal, MealType } from '@/types';
import { MEAL_TYPES } from '@/utils/constants';

interface UseGeminiMealSuggestProps {
    onClose: () => void;
    onAddMeal: (meal: Omit<Meal, 'id'>) => void;
}

export const useGeminiMealSuggest = ({ onClose, onAddMeal }: UseGeminiMealSuggestProps) => {
    const [ingredients, setIngredients] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [suggestion, setSuggestion] = useState<Omit<Meal, 'id'> | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSuggest = async () => {
        if (!ingredients) {
            setError('Por favor, introduce algunos ingredientes.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setSuggestion(null);
        try {
            const result = await suggestMeal(ingredients);
            const mealTypesAreValid = result.type.every((t: string) => MEAL_TYPES.includes(t as MealType));
            const finalMealTypes = mealTypesAreValid && result.type.length > 0 ? result.type as MealType[] : [MealType.Otro];

            setSuggestion({
                name: result.name,
                type: finalMealTypes,
                ingredients: result.ingredients
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'No se pudo obtener una sugerencia. Inténtalo de nuevo.');
            console.error(err);
        }
        setIsLoading(false);
    };

    const handleAddMeal = () => {
        if (suggestion) {
            onAddMeal(suggestion);
            handleClose();
        }
    };

    const handleClose = () => {
        setIngredients('');
        setSuggestion(null);
        setError(null);
        setIsLoading(false);
        onClose();
    };

    return {
        ingredients,
        setIngredients,
        isLoading,
        suggestion,
        error,
        handleSuggest,
        handleAddMeal,
        handleClose
    };
};
