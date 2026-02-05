import { useState, useMemo } from 'react';
import { Input, Button, Chip, ScrollShadow } from "@heroui/react";
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
            <div className="p-4 flex flex-col gap-4 sticky top-0 bg-white dark:bg-background-dark z-10 border-b border-divider">
                <h1 className="text-foreground text-base font-bold">Recipe Library</h1>

                <Input
                    isClearable
                    radius="lg"
                    placeholder="Search recipes..."
                    startContent={
                        <span className="material-symbols-outlined text-default-400 text-lg">search</span>
                    }
                    value={searchTerm}
                    onValueChange={setSearchTerm}
                />

                <div className="flex flex-col gap-2">
                    <Button
                        onPress={handleGeminiClick}
                        disabled={!aiEnabled}
                        color="primary"
                        startContent={<span className="material-symbols-outlined text-lg">magic_button</span>}
                        className="font-bold"
                    >
                        AI Suggest
                    </Button>
                    <Button
                        onPress={handleAddClick}
                        variant="flat"
                        startContent={<span className="material-symbols-outlined text-lg">add</span>}
                        className="font-bold underline-offset-4"
                    >
                        Add Dish
                    </Button>
                </div>

                <div className="flex flex-wrap gap-1 mt-1">
                    {MEAL_TYPES.map(type => (
                        <Chip
                            key={type}
                            variant={activeFilters.includes(type) ? "solid" : "flat"}
                            color={activeFilters.includes(type) ? "primary" : "default"}
                            className="cursor-pointer text-[10px] uppercase font-bold"
                            onClick={() => handleFilterChange(type)}
                            size="sm"
                        >
                            {type}
                        </Chip>
                    ))}
                </div>
            </div>

            <ScrollShadow className="flex-1 px-4 py-4 flex flex-col gap-3">
                {isLoading ? (
                    <div className="text-center py-8 text-default-500">
                        <p className="text-xs">Cargando comidas...</p>
                    </div>
                ) : filteredMeals.length > 0 ? (
                    filteredMeals.map(meal => (
                        <MealCard key={meal.id} meal={meal} />
                    ))
                ) : (
                    <div className="text-center py-8 text-default-500">
                        <p className="text-xs">No recipes found.</p>
                    </div>
                )}
            </ScrollShadow>

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