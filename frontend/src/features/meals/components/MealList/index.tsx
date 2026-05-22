import { Input, Button, ScrollShadow, Tabs, Tab, CircularProgress } from "@heroui/react";
import { Meal, MealType } from '@/types';
import { MEAL_TYPES } from '@/utils/constants';
import MealCard from '@/features/planner/components/MealCard';
import AddMealModal from '../AddMealModal';
import { useMealList } from './useMealList';
import { useNavigate } from 'react-router-dom';

interface MealListProps {
    meals: Meal[];
    addMeal: (meal: Omit<Meal, 'id'>) => void;
    isLoading: boolean;
}

const MealList = ({ meals, addMeal, isLoading }: MealListProps) => {
    const navigate = useNavigate();
    const {
        searchTerm,
        setSearchTerm,
        activeFilters,
        handleFilterChange,
        isAddModalOpen,
        setAddModalOpen,
        filteredMeals,
        handleAddClick
    } = useMealList({ meals });

    return (
        <div className="flex flex-col h-full bg-white/40 dark:bg-transparent">
            <div className="p-6 flex flex-col gap-5 sticky top-0 bg-white/80 dark:bg-[#211E1A]/80 backdrop-blur-sm z-10 border-b border-[#EAE1CE] dark:border-white/5">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-terracotta/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-terracotta text-[18px]">menu_book</span>
                    </div>
                    <h1 className="font-display text-xl font-semibold text-ink dark:text-cream">Recetario</h1>
                </div>

                <Input
                    isClearable
                    radius="full"
                    variant="bordered"
                    placeholder="Buscar recetas..."
                    classNames={{
                        inputWrapper: "border-1",
                    }}
                    startContent={
                        <span className="material-symbols-outlined text-default-400 text-lg">search</span>
                    }
                    value={searchTerm}
                    onValueChange={setSearchTerm}
                />

                <Button
                    onPress={() => navigate('/recetas/nueva')}
                    color="primary"
                    variant="flat"
                    radius="full"
                    className="font-semibold text-sm text-terracotta"
                    startContent={<span className="material-symbols-outlined text-[18px]">add</span>}
                >
                    Nueva receta
                </Button>

                <div className="flex flex-col gap-2">
                    <Tabs
                        aria-label="Filtros de comida"
                        variant="underlined"
                        color="primary"
                        selectedKey={activeFilters[0] || "Todos"}
                        onSelectionChange={(key) => handleFilterChange(key === "Todos" ? ("" as any) : (key as MealType))}
                        classNames={{
                            tabList: "gap-4 w-full relative rounded-none border-b border-[#EAE1CE] dark:border-white/5 p-0",
                            cursor: "w-full bg-terracotta",
                            tab: "max-w-fit px-0 h-8",
                            tabContent: "group-data-[selected=true]:text-terracotta font-medium text-xs"
                        }}
                    >
                        <Tab key="Todos" title="Todos" />
                        {MEAL_TYPES.map(type => (
                            <Tab key={type} title={type} />
                        ))}
                    </Tabs>
                </div>
            </div>

            <ScrollShadow className="flex-1 px-4 py-4 flex flex-col gap-3">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-ink/40 py-12">
                        <CircularProgress size="lg" aria-label="Cargando..." />
                        <p className="text-xs font-medium opacity-60">Cargando recetario</p>
                    </div>
                ) : filteredMeals.length > 0 ? (
                    filteredMeals.map(meal => (
                        <MealCard key={meal.id} meal={meal} />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-ink/30 dark:text-cream/30">
                        <span className="material-symbols-outlined text-[40px] mb-3">skillet</span>
                        <p className="text-xs font-medium">Aún no hay recetas</p>
                    </div>
                )}
            </ScrollShadow>

            <AddMealModal
                isOpen={isAddModalOpen}
                onClose={() => setAddModalOpen(false)}
                onAddMeal={addMeal}
            />
        </div>
    );
};

export default MealList;
