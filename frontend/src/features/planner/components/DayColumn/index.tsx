import { useDroppable } from '@dnd-kit/core';
import { Card, CardBody, Button, Chip } from "@heroui/react";
import { Meal } from '@/types';
import { MealTypeColors } from '@/utils/constants';

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
        <div className={`
            group relative min-h-[180px] rounded-3xl border-2 border-dashed p-4 flex flex-col transition-all
            ${isOver ? 'border-terracotta bg-terracotta/5' : 'border-[#E2D7C0] dark:border-white/10 bg-white/50 dark:bg-white/[0.03] hover:border-terracotta/40'}
        `}>
            <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-ink/45 dark:text-cream/45 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px]">{mealTime === 'lunch' ? 'wb_sunny' : 'bedtime'}</span>
                    {title}
                </span>
            </div>

            <div ref={(node: HTMLElement | null) => setNodeRef(node as any)} className="flex-1 flex flex-col gap-3">
                {meals.map(meal => (
                    <Card
                        key={meal.id}
                        className="border border-[#EFE8D8] dark:border-white/10 bg-white dark:bg-white/[0.04] shadow-card"
                    >
                        <CardBody className="p-3 relative group/card">
                            <h5 className="text-[13px] font-semibold text-ink dark:text-cream leading-snug pr-7">{meal.name}</h5>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {meal.type.map(t => {
                                    const tagColors = MealTypeColors[t];
                                    return (
                                        <Chip
                                            key={t}
                                            size="sm"
                                            className={`h-[18px] text-[9px] font-semibold ${tagColors.bg} ${tagColors.text}`}
                                            variant="flat"
                                        >
                                            {t}
                                        </Chip>
                                    )
                                })}
                            </div>
                            <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                onPress={() => onRemoveMeal(day, mealTime, meal.id)}
                                className="absolute top-1 right-1 opacity-0 group-hover/card:opacity-100 min-w-7 w-7 h-7 text-ink/30 hover:text-terracotta"
                            >
                                <span className="material-symbols-outlined text-[16px]">close</span>
                            </Button>
                        </CardBody>
                    </Card>
                ))}

                {meals.length === 0 && (
                    <div className="flex-1 flex flex-col items-center justify-center gap-1.5 text-ink/30 dark:text-cream/30 group-hover:text-terracotta/60 transition-colors py-4">
                        <span className="material-symbols-outlined text-[28px]">add</span>
                        <span className="text-[11px] font-medium">Arrastra una receta</span>
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
    const dayName = day.split(' ')[0];

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center justify-center py-2.5 rounded-2xl bg-terracotta/[0.08] dark:bg-terracotta/10">
                <span className="font-display text-sm font-semibold text-terracotta">{dayName}</span>
            </div>
            <div className="flex flex-col gap-5">
                <MealSlot day={day} mealTime="lunch" title="Comida" meals={meals.lunch} onRemoveMeal={onRemoveMeal} />
                <MealSlot day={day} mealTime="dinner" title="Cena" meals={meals.dinner} onRemoveMeal={onRemoveMeal} />
            </div>
        </div>
    );
};

export default DayColumn;