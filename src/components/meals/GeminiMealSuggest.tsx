import { useState } from 'react';
import { suggestMeal } from '../../services/geminiService';
import { Meal, MealType } from '../../types';
import { MealTypeColors, MEAL_TYPES } from '../../config/constants';
import Modal from '../common/Modal';

interface GeminiMealSuggestProps {
    isOpen: boolean;
    onClose: () => void;
    onAddMeal: (meal: Omit<Meal, 'id'>) => void;
}

const GeminiMealSuggest = ({ isOpen, onClose, onAddMeal }: GeminiMealSuggestProps) => {
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
            const mealTypesAreValid = result.type.every(t => MEAL_TYPES.includes(t as MealType));
            const finalMealTypes = mealTypesAreValid && result.type.length > 0 ? result.type as MealType[] : [MealType.Otro];

            setSuggestion({ ...result, type: finalMealTypes });
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

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="text-center p-8">
                    <p className="text-lg font-semibold text-gray-700">Buscando una receta deliciosa...</p>
                    <p className="text-gray-500 mt-2">Esto puede tardar unos segundos.</p>
                </div>
            );
        }

        if (suggestion) {
            return (
                <div className="space-y-4">
                    <h4 className="text-xl font-bold text-gray-900">{suggestion.name}</h4>
                    <div className="flex flex-wrap gap-2">
                        {suggestion.type.map(t => {
                            const colors = MealTypeColors[t as MealType] || MealTypeColors.Otro;
                            return (
                                <span key={t} className={`px-2 py-1 text-xs font-medium rounded-full ${colors.bg} ${colors.text}`}>
                                    {t.toUpperCase()}
                                </span>
                            );
                        })}
                    </div>
                    <div>
                        <h5 className="font-semibold mb-2 text-gray-700">Ingredientes:</h5>
                        <ul className="list-disc list-inside bg-gray-50 p-3 rounded-md space-y-1">
                            {suggestion.ingredients.map((item, index) => (
                                <li key={index} className="text-gray-800">
                                    <span className="font-medium">{item.name}:</span> {item.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                <p className="text-sm text-gray-600">Introduce algunos ingredientes que tengas y la IA te sugerirá una receta.</p>
                <textarea
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    rows={3}
                    placeholder="Ej: pollo, arroz, pimiento..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-slate-800 placeholder:text-slate-400"
                />
                {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
            </div>
        );
    };

    const footer = suggestion ? (
        <>
            <button onClick={handleSuggest} disabled={isLoading} className="px-4 py-2 bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-white/10 disabled:opacity-50 transition-colors text-sm font-semibold">
                Probar de nuevo
            </button>
            <button onClick={handleAddMeal} className="px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity text-sm font-semibold shadow-md shadow-primary/20">
                Añadir a mi lista
            </button>
        </>
    ) : (
        <>
            <button onClick={handleClose} className="px-4 py-2 bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-sm font-semibold">
                Cancelar
            </button>
            <button onClick={handleSuggest} disabled={isLoading} className="px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 disabled:opacity-50 transition-colors text-sm font-semibold shadow-md shadow-primary/20">
                {isLoading ? 'Buscando...' : 'Obtener Sugerencia'}
            </button>
        </>
    );

    return (
        <Modal
            title="Sugerir Comida con IA"
            isOpen={isOpen}
            onClose={handleClose}
            footer={footer}
        >
            {renderContent()}
        </Modal>
    );
};

export default GeminiMealSuggest;