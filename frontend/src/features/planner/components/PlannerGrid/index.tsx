import { useState } from 'react';
import { Button } from '@heroui/react';
import { DAYS_OF_WEEK } from '@/utils/constants';
import { WeeklyPlan } from '@/types';
import DayColumn from '@/features/planner/components/DayColumn';

interface PlannerGridProps {
    weeklyPlan: WeeklyPlan;
    onRemoveMeal: (day: string, mealTime: 'lunch' | 'dinner', mealId: number) => void;
}

const PlannerGrid = ({ weeklyPlan, onRemoveMeal }: PlannerGridProps) => {
    const [activeDay, setActiveDay] = useState(0);

    return (
        <>
            {/* Mobile: one day at a time */}
            <div className="flex flex-col gap-4 lg:hidden">
                <div className="flex items-center justify-between bg-white dark:bg-white/[0.04] rounded-2xl p-1 border border-[#EFE8D8] dark:border-white/10">
                    <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        isDisabled={activeDay === 0}
                        onPress={() => setActiveDay(d => d - 1)}
                    >
                        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                    </Button>
                    <div className="flex gap-1">
                        {DAYS_OF_WEEK.map((day, i) => (
                            <button
                                key={day}
                                onClick={() => setActiveDay(i)}
                                className={`w-8 h-8 rounded-xl text-[11px] font-semibold transition-all ${i === activeDay ? 'bg-terracotta text-white' : 'text-ink/40 dark:text-cream/40 hover:bg-default-100'}`}
                            >
                                {day.slice(0, 2)}
                            </button>
                        ))}
                    </div>
                    <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        isDisabled={activeDay === DAYS_OF_WEEK.length - 1}
                        onPress={() => setActiveDay(d => d + 1)}
                    >
                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                    </Button>
                </div>

                <DayColumn
                    day={DAYS_OF_WEEK[activeDay]}
                    meals={weeklyPlan[DAYS_OF_WEEK[activeDay]]}
                    onRemoveMeal={onRemoveMeal}
                />
            </div>

            {/* Desktop: full 7-column grid */}
            <div id="printable-area" className="printable-main-content hidden lg:grid grid-cols-7 gap-6 flex-1 min-h-[700px]">
                {DAYS_OF_WEEK.map((day: string) => (
                    <DayColumn key={day} day={day} meals={weeklyPlan[day]} onRemoveMeal={onRemoveMeal} />
                ))}
            </div>
        </>
    );
};

export default PlannerGrid;
