import { useDroppable } from '@dnd-kit/core';
import { Meal } from '../../types';
import { MealTypeColors } from '../../config/constants';

interface MealSlotProps {
    day: string;
    mealTime: 'lunch' | 'dinner';
    title: string;
    meals: Meal[];
    onRemoveMeal: (day: string, mealTime: 'lunch' | 'dinner', mealId: number) => void;
}

const MealSlot = ({ day, mealTime, title, meals, onRemoveMeal }: MealSlotProps) => {
    const { isOver, setNodeRef } = useDroppable({
        id: `day-${day}-${mealTime}`,
    });

    return (
        <div className="group relative min-h-[200px] rounded-2xl border-2 border-dashed border-gray-200 dark:border-white/10 bg-white/40 dark:bg-white/5 p-4 flex flex-col hover:border-primary hover:bg-white dark:hover:bg-white/10 transition-all shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <span className="text-[11px] font-black text-[#686189] uppercase tracking-widest">{title}</span>
                <span className="material-symbols-outlined text-gray-300 group-hover:text-primary text-[18px]">more_horiz</span>
            </div>

            <div ref={setNodeRef} className="flex-1 flex flex-col gap-2">
                {meals.map(meal => (
                    <div
                        key={meal.id}
                        className="relative bg-white dark:bg-background-dark p-3 rounded-xl shadow-md border border-indigo-50 dark:border-indigo-900/30 flex flex-col justify-center group/card"
                    >
                        <h5 className="text-xs font-bold text-[#121118] dark:text-white leading-snug pr-6">{meal.name}</h5>
                        <div className="flex flex-wrap gap-1 mt-2">
                            {meal.type.map(t => {
                                const tagColors = MealTypeColors[t];
                                return (
                                    <span key={t} className={`text-[8px] font-bold px-1 py-0.5 rounded uppercase tracking-tighter ${tagColors.bg} ${tagColors.text}`}>
                                        {t}
                                    </span>
                                )
                            })}
                        </div>
                        <button
                            title={`Quitar ${meal.name}`}
                            onClick={() => onRemoveMeal(day, mealTime, meal.id)}
                            className="absolute top-2 right-2 opacity-0 group-hover/card:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
                        >
                            <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                    </div>
                ))}

                {meals.length === 0 && (
                    <div className="flex-1 flex flex-col items-center justify-center gap-2 text-gray-400 group-hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[32px]">add_circle</span>
                        <span className="text-[10px] font-bold uppercase">Plan Meal</span>
                    </div>
                )}
            </div>
        </div>
    );
};


interface DayColumnProps {
    day: string;
    meals: { lunch: Meal[], dinner: Meal[] };
    onRemoveMeal: (day: string, mealTime: 'lunch' | 'dinner', mealId: number) => void;
}

const DayColumn = ({ day, meals, onRemoveMeal }: DayColumnProps) => {
    // Extract numerical part of day if any (e.g. "Monday 23") or just use day name
    const dayName = day.split(' ')[0];

    return (
        <div className="flex flex-col gap-6">
            <div className="text-center pb-4 border-b-4 border-primary/40">
                <span className="block text-xs font-bold text-primary uppercase tracking-[0.1em] mb-1">{dayName}</span>
                <span className="text-2xl font-black">{/* Optional: Add date if available */}</span>
            </div>
            <div className="flex flex-col gap-6">
                <MealSlot day={day} mealTime="lunch" title="Lunch" meals={meals.lunch} onRemoveMeal={onRemoveMeal} />
                <MealSlot day={day} mealTime="dinner" title="Dinner" meals={meals.dinner} onRemoveMeal={onRemoveMeal} />
            </div>
        </div>
    );
};

export default DayColumn;