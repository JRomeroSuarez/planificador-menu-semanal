import { useState } from 'react';
import { Ingredient } from '@/types';

interface UseShoppingListProps {
    onAddIngredient: (ingredient: Ingredient) => void;
}

export const useShoppingList = ({ onAddIngredient }: UseShoppingListProps) => {
    const [newItem, setNewItem] = useState('');

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (newItem.trim() === '') return;

        const parts = newItem.split('-').map(p => p.trim());
        const ingredient: Ingredient = {
            name: parts[0],
            quantity: parts[1] || '',
        };

        onAddIngredient(ingredient);
        setNewItem('');
    };

    const handleExport = () => {
        alert("Lista exportada al portapapeles (Simulado)");
    };

    return {
        newItem,
        setNewItem,
        handleAddItem,
        handleExport
    };
};
