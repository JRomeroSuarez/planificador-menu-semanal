import { useState, useEffect } from 'react';
import { Meal, MealType, Ingredient } from '@/types';

interface UseAddMealModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddMeal: (meal: Omit<Meal, 'id'>) => void;
}

export const useAddMealModal = ({ isOpen, onClose, onAddMeal }: UseAddMealModalProps) => {
    const [name, setName] = useState('');
    const [types, setTypes] = useState<Set<string>>(new Set());
    const [ingredientsText, setIngredientsText] = useState('');

    useEffect(() => {
        if (isOpen) {
            setName('');
            setTypes(new Set());
            setIngredientsText('');
        }
    }, [isOpen]);

    const handleSubmit = () => {
        if (!name || !ingredientsText) {
            return;
        }

        const ingredients: Ingredient[] = ingredientsText.split(',')
            .map(i => {
                const parts = i.split('-').map(p => p.trim());
                if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
                return { name: parts[0], quantity: parts[1] };
            })
            .filter((i): i is Ingredient => i !== null);

        onAddMeal({
            name,
            type: Array.from(types) as MealType[],
            ingredients,
        });
        onClose();
    };

    return {
        name,
        setName,
        types,
        setTypes,
        ingredientsText,
        setIngredientsText,
        handleSubmit
    };
};
