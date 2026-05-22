import { DndContext, DragOverlay } from '@dnd-kit/core';
import MealList from '@/features/meals/components/MealList';
import MealCard from '@/features/planner/components/MealCard';
import PlannerActions from '../PlannerActions';
import PlannerGrid from '../PlannerGrid';
import { usePlanner } from '../../hooks/usePlanner';

const PlannerView = () => {
    const {
        meals,
        isLoadingMeals,
        isSyncing,
        weeklyPlan,
        activeMeal,
        addMeal,
        handleDragStart,
        handleDragEnd,
        removeMealFromDay,
        handlePrint,
    } = usePlanner();

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <main className="flex flex-1 overflow-hidden relative">
                {/* Left Sidebar: Recipe Library */}
                <aside className="hidden lg:flex w-80 flex-col border-r border-[#EAE1CE] dark:border-white/5 bg-white/60 dark:bg-white/[0.02] overflow-y-auto shrink-0 transition-all no-print">
                    <MealList
                        meals={meals}
                        addMeal={addMeal}
                        isLoading={isLoadingMeals}
                    />
                </aside>

                {/* Main Content: Weekly Planner */}
                <section className="flex-1 flex flex-col bg-cream dark:bg-[#211E1A] p-4 md:p-8 overflow-y-auto">
                    <PlannerActions
                        onPrint={handlePrint}
                        isSyncing={isSyncing}
                    />

                    <PlannerGrid
                        weeklyPlan={weeklyPlan}
                        onRemoveMeal={removeMealFromDay}
                    />
                </section>
            </main>

            <DragOverlay>
                {activeMeal ? <MealCard meal={activeMeal} isOverlay={true} /> : null}
            </DragOverlay>
        </DndContext>
    );
};

export default PlannerView;
