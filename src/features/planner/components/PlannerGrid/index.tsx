import { DAYS_OF_WEEK } from '@/utils/constants';
import { WeeklyPlan } from '@/types';
import DayColumn from '@/features/planner/components/DayColumn';

interface PlannerGridProps {
    weeklyPlan: WeeklyPlan;
    onRemoveMeal: (day: string, mealTime: 'lunch' | 'dinner', mealId: number) => void;
}

const PlannerGrid = ({ weeklyPlan, onRemoveMeal }: PlannerGridProps) => {
    return (
        <div id="printable-area" className="printable-main-content grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-6 flex-1 min-h-[700px]">
            {DAYS_OF_WEEK.map((day: string) => (
                <div key={day} className="flex flex-col gap-6">
                    <DayColumn day={day} meals={weeklyPlan[day]} onRemoveMeal={onRemoveMeal} />
                </div>
            ))}
        </div>
    );
};

export default PlannerGrid;
