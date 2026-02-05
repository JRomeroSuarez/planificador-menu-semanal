import { DndContext, DragOverlay } from '@dnd-kit/core';
import MealList from '@/features/meals/components/MealList';
import ShoppingList from '@/features/shopping/components/ShoppingList';
import MealCard from '@/features/planner/components/MealCard';
import PlannerActions from '../PlannerActions';
import PlannerGrid from '../PlannerGrid';
import { usePlanner } from '../../hooks/usePlanner';

interface PlannerViewProps {
    onLoginClick: () => void;
}

const PlannerView = ({ onLoginClick }: PlannerViewProps) => {
    const {
        meals,
        isLoadingMeals,
        weeklyPlan,
        manualIngredients,
        activeMeal,
        derivedShoppingList,
        addMeal,
        handleDragStart,
        handleDragEnd,
        removeMealFromDay,
        addManualIngredient,
        removeManualIngredient,
        removeDerivedIngredient,
        savePlan,
        loadPlan,
        handlePrint
    } = usePlanner({ onLoginClick });

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <main className="flex flex-1 overflow-hidden">
                {/* Left Sidebar: Recipe Library */}
                <aside className="w-80 flex flex-col border-r border-[#f1f0f4] dark:border-white/10 bg-white dark:bg-background-dark overflow-y-auto shrink-0 transition-all no-print">
                    <MealList
                        meals={meals}
                        addMeal={addMeal}
                        onLoginClick={onLoginClick}
                        isLoading={isLoadingMeals}
                    />
                </aside>

                {/* Main Content: Weekly Planner */}
                <section className="flex-1 flex flex-col bg-[#f8f9fc] dark:bg-[#0c0a18] p-8 overflow-y-auto">
                    <PlannerActions
                        onSave={savePlan}
                        onLoad={loadPlan}
                        onPrint={handlePrint}
                    />

                    <PlannerGrid
                        weeklyPlan={weeklyPlan}
                        onRemoveMeal={removeMealFromDay}
                    />
                </section>

                {/* Right Sidebar: Shopping List */}
                <aside className="w-80 flex flex-col border-l border-[#f1f0f4] dark:border-white/10 bg-white dark:bg-background-dark overflow-y-auto shrink-0 transition-all no-print">
                    <ShoppingList
                        derivedIngredients={derivedShoppingList}
                        manualIngredients={manualIngredients}
                        onAddIngredient={addManualIngredient}
                        onRemoveManualIngredient={removeManualIngredient}
                        onRemoveDerivedIngredient={removeDerivedIngredient}
                    />
                </aside>
            </main>

            <DragOverlay>
                {activeMeal ? <MealCard meal={activeMeal} isOverlay={true} /> : null}
            </DragOverlay>
        </DndContext>
    );
};

export default PlannerView;
