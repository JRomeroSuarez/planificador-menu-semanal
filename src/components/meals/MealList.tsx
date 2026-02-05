import { useState, useMemo } from 'react';
import { Meal, MealType } from '../../types';
import { MEAL_TYPES } from '../../config/constants';
import MealCard from '../planner/MealCard';
import AddMealModal from './AddMealModal';
import GeminiMealSuggest from './GeminiMealSuggest';
import { isAiAvailable } from '../../services/geminiService';
import { useAuth } from '../../context/AuthContext';

interface MealListProps {
    meals: Meal[];
    addMeal: (meal: Omit<Meal, 'id'>) => void;
    onLoginClick: () => void;
    isLoading: boolean;
}

const MealList = ({ meals, addMeal, onLoginClick, isLoading }: MealListProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState<MealType[]>([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isGeminiModalOpen, setGeminiModalOpen] = useState(false);
    const aiEnabled = isAiAvailable();
    const { isAuthenticated } = useAuth();

    const handleFilterChange = (type: MealType) => {
        setActiveFilters(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const handleAddClick = () => {
        if (isAuthenticated) {
            setAddModalOpen(true);
        } else {
            onLoginClick();
        }
    };

    const handleGeminiClick = () => {
        if (isAuthenticated) {
            setGeminiModalOpen(true);
        } else {
            onLoginClick();
        }
    };

    const filteredMeals = useMemo(() => {
        return meals.filter(meal => {
            const matchesSearch = meal.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = activeFilters.length === 0 || activeFilters.every(filter => meal.type.includes(filter));
            return matchesSearch && matchesFilter;
        });
    }, [meals, searchTerm, activeFilters]);

    return (
        <div className="flex flex-col h-full bg-white dark:bg-background-dark">
            <div className="p-4 flex flex-col gap-4 sticky top-0 bg-white dark:bg-background-dark z-10 border-b border-[#f1f0f4] dark:border-white/10">
                <h1 className="text-[#121118] dark:text-white text-base font-bold">Recipe Library</h1>

                <div className="px-0 py-1">
                    <label className="flex flex-col min-w-0 h-9 w-full">
                        <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                            <div className="text-[#686189] dark:text-gray-400 flex border-none bg-[#f1f0f4] dark:bg-white/5 items-center justify-center pl-3 rounded-l-lg">
                                <span className="material-symbols-outlined text-[18px]">search</span>
                            </div>
                            <input
                                className="form-input flex w-full min-w-0 flex-1 rounded-lg text-[#121118] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#f1f0f4] dark:bg-white/5 h-full placeholder:text-[#686189] px-3 rounded-l-none pl-1 text-xs font-normal"
                                placeholder="Search recipes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </label>
                </div>

                <div className="flex flex-col gap-2">
                    <button
                        onClick={handleGeminiClick}
                        disabled={!aiEnabled}
                        className="flex items-center justify-center gap-2 rounded-lg h-9 px-3 bg-primary text-white text-xs font-bold transition-opacity hover:opacity-90 disabled:opacity-50"
                    >
                        <span className="material-symbols-outlined text-[18px]">magic_button</span>
                        <span className="truncate">AI Suggest</span>
                    </button>
                    <button
                        onClick={handleAddClick}
                        className="flex items-center justify-center gap-2 rounded-lg h-9 px-3 bg-[#f1f0f4] dark:bg-white/5 text-[#121118] dark:text-white text-xs font-bold hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        <span className="truncate">Add Dish</span>
                    </button>
                </div>

                <div className="flex flex-wrap gap-1 mt-1">
                    {MEAL_TYPES.map(type => (
                        <button
                            key={type}
                            onClick={() => handleFilterChange(type)}
                            className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase transition-colors ${activeFilters.includes(type) ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400'}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 px-4 py-4 flex flex-col gap-3 overflow-y-auto">
                {isLoading ? (
                    <div className="text-center py-8 text-gray-500">
                        <p className="text-xs">Cargando comidas...</p>
                    </div>
                ) : filteredMeals.length > 0 ? (
                    filteredMeals.map(meal => (
                        <MealCard key={meal.id} meal={meal} />
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <p className="text-xs">No recipes found.</p>
                    </div>
                )}
            </div>

            <AddMealModal
                isOpen={isAddModalOpen}
                onClose={() => setAddModalOpen(false)}
                onAddMeal={addMeal}
            />

            <GeminiMealSuggest
                isOpen={isGeminiModalOpen}
                onClose={() => setGeminiModalOpen(false)}
                onAddMeal={addMeal}
            />
        </div>
    );
};

export default MealList;