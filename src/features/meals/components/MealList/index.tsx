import { Input, Button, ScrollShadow, Tabs, Tab, CircularProgress } from "@heroui/react";
import { Meal, MealType } from '@/types';
import { MEAL_TYPES } from '@/utils/constants';
import MealCard from '@/features/planner/components/MealCard';
import AddMealModal from '../AddMealModal';
import { useMealList } from './useMealList';

interface MealListProps {
    meals: Meal[];
    addMeal: (meal: Omit<Meal, 'id'>) => void;
    onLoginClick: () => void;
    isLoading: boolean;
}

const MealList = ({ meals, addMeal, onLoginClick, isLoading }: MealListProps) => {
    const {
        searchTerm,
        setSearchTerm,
        activeFilters,
        handleFilterChange,
        isAddModalOpen,
        setAddModalOpen,
        filteredMeals,
        handleAddClick
    } = useMealList({ meals, onLoginClick });

    return (
        <div className="flex flex-col h-full bg-white dark:bg-background-dark">
            <div className="p-6 flex flex-col gap-6 sticky top-0 bg-white dark:bg-background-dark z-10 border-b border-divider shadow-sm">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">book</span>
                    <h1 className="text-foreground text-lg font-black tracking-tight">Recetario</h1>
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

                <div className="flex gap-2">
                    <Button
                        onPress={handleAddClick}
                        color="primary"
                        variant="flat"
                        className="flex-1 font-bold text-xs"
                        startContent={<span className="material-symbols-outlined text-[18px]">add</span>}
                    >
                        Nueva
                    </Button>
                </div>

                <div className="flex flex-col gap-2">
                    <Tabs
                        aria-label="Filtros de comida"
                        variant="underlined"
                        color="primary"
                        selectedKey={activeFilters[0] || "Todos"}
                        onSelectionChange={(key) => handleFilterChange(key === "Todos" ? ("" as any) : (key as MealType))}
                        classNames={{
                            tabList: "gap-4 w-full relative rounded-none border-b border-divider p-0",
                            cursor: "w-full bg-primary",
                            tab: "max-w-fit px-0 h-8",
                            tabContent: "group-data-[selected=true]:text-primary font-bold text-[11px] uppercase tracking-widest"
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
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-default-500 py-12">
                        <CircularProgress size="lg" aria-label="Loading..." />
                        <p className="text-xs font-bold uppercase tracking-widest opacity-50">Cargando Recetario</p>
                    </div>
                ) : filteredMeals.length > 0 ? (
                    filteredMeals.map(meal => (
                        <MealCard key={meal.id} meal={meal} />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-default-400">
                        <span className="material-symbols-outlined text-[48px] mb-4 opacity-10">lunch_dining</span>
                        <p className="text-xs font-bold uppercase tracking-widest">No hay recetas</p>
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
