import { useState } from "react";
import { Ingredient } from "@/types";

interface UseShoppingListProps {
    derivedIngredients: { name: string; quantities: string[]; }[];
    manualIngredients: Ingredient[];
    onAddIngredient: (ingredient: Ingredient) => void;
    onRemoveManualIngredient: (index: number) => void;
    onRemoveDerivedIngredient: (name: string) => void;
}

export const useShoppingList = ({
    derivedIngredients = [],
    manualIngredients = [],
    onAddIngredient,
    onRemoveManualIngredient,
    onRemoveDerivedIngredient
}: UseShoppingListProps) => {
    const [newItem, setNewItem] = useState('');
    const [showCopyAlert, setShowCopyAlert] = useState(false);
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

    const toggleItem = (key: string) => {
        setCheckedItems(prev => {
            const next = new Set(prev);
            next.has(key) ? next.delete(key) : next.add(key);
            return next;
        });
    };

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (newItem.trim() === '') return;

        const [name, quantity] = newItem.split('-').map(p => p.trim());
        onAddIngredient({ name: name, quantity: quantity || '' });
        setNewItem('');
    };

    const handleExport = () => {
        const derived = derivedIngredients.map(i => `- ${i.name} (${i.quantities.join(', ')})`);
        const manual = manualIngredients.map(i => `- ${i.name}${i.quantity ? ` (${i.quantity})` : ''}`);
        const text = [...derived, ...manual].join('\n');

        navigator.clipboard.writeText(text);
        setShowCopyAlert(true);
        setTimeout(() => setShowCopyAlert(false), 3000);
    };

    const totalCount = (derivedIngredients?.length || 0) + (manualIngredients?.length || 0);

    return {
        newItem,
        setNewItem,
        showCopyAlert,
        setShowCopyAlert,
        checkedItems,
        toggleItem,
        handleAddItem,
        handleExport,
        totalCount,
        onRemoveManualIngredient,
        onRemoveDerivedIngredient
    };
};
