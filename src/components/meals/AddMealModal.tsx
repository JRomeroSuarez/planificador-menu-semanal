import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Modal from '../common/Modal';
import { Meal, MealType, Ingredient } from '../../types';
import { MEAL_TYPES } from '../../config/constants';

interface AddMealModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddMeal: (meal: Omit<Meal, 'id'>) => void;
}

const AddMealModal = ({ isOpen, onClose, onAddMeal }: AddMealModalProps) => {
    const [name, setName] = useState('');
    const [types, setTypes] = useState<MealType[]>([]);
    const [ingredientsText, setIngredientsText] = useState('');

    useEffect(() => {
        if (isOpen) {
            setName('');
            setTypes([]);
            setIngredientsText('');
        }
    }, [isOpen]);

    const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        // Fix: Explicitly type `option` as `HTMLOptionElement` to resolve TypeScript error.
        const selectedOptions = Array.from(e.target.selectedOptions, (option: HTMLOptionElement) => option.value as MealType);
        setTypes(selectedOptions);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!name || !ingredientsText) {
            alert("Por favor, completa el nombre y los ingredientes.");
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
            type: types,
            ingredients,
        });
        onClose();
    };

    const footer = (
        <>
            <button onClick={onClose} className="px-4 py-2 bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-sm font-semibold">
                Cancelar
            </button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity text-sm font-semibold shadow-md shadow-primary/20">
                Añadir Comida
            </button>
        </>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Añadir Nueva Comida" footer={footer}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="meal-name" className="block text-sm font-medium text-gray-700 mb-1">Nombre de la comida</label>
                    <input
                        id="meal-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. Lentejas con chorizo"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-slate-800 placeholder:text-slate-400"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="meal-types" className="block text-sm font-medium text-gray-700 mb-1">Tipo(s)</label>
                    <select
                        id="meal-types"
                        multiple
                        value={types}
                        onChange={handleTypeChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        {MEAL_TYPES.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="meal-ingredients" className="block text-sm font-medium text-gray-700 mb-1">Ingredientes</label>
                    <textarea
                        id="meal-ingredients"
                        rows={3}
                        value={ingredientsText}
                        onChange={(e) => setIngredientsText(e.target.value)}
                        placeholder="Ej: Pollo - 2 filetes, Arroz - 100g"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-slate-800 placeholder:text-slate-400"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1">Separa los ingredientes con comas y usa el formato "Nombre - Cantidad".</p>
                </div>
            </form>
        </Modal>
    );
};

export default AddMealModal;