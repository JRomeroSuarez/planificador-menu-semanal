import { useDroppable } from '@dnd-kit/core';
import { Card, CardBody, Button, Chip, Divider } from "@heroui/react";
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
            group relative min-h-[200px] rounded-3xl border-2 border-dashed p-4 flex flex-col transition-all shadow-sm
            ${isOver ? 'border-primary bg-primary/5' : 'border-default-200 dark:border-white/10 bg-white/40 dark:bg-white/5 hover:border-primary/50'}
        `}>
            <div className="flex justify-between items-center mb-4">
                <span className="text-[11px] font-black text-default-500 uppercase tracking-widest">{title}</span>
                <span className="material-symbols-outlined text-default-300 group-hover:text-primary text-[18px] cursor-pointer">more_horiz</span>
            </div>

            <div ref={(node: HTMLElement | null) => setNodeRef(node as any)} className="flex-1 flex flex-col gap-3">
                {meals.map(meal => (
                    <Card
                        key={meal.id}
                        className="border-none bg-white dark:bg-background-dark shadow-lg ring-1 ring-default-100 dark:ring-white/10"
                    >
                        <CardBody className="p-3 relative group/card">
                            <h5 className="text-xs font-bold text-foreground leading-snug pr-7">{meal.name}</h5>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {meal.type.map(t => {
                                    const tagColors = MealTypeColors[t];
                                    return (
                                        <Chip
                                            key={t}
                                            size="sm"
                                            className={`h-4 text-[8px] font-bold uppercase tracking-tighter ${tagColors.bg} ${tagColors.text}`}
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
                                className="absolute top-1 right-1 opacity-0 group-hover/card:opacity-100 min-w-8 w-8 h-8 text-default-400 hover:text-danger"
                            >
                                <span className="material-symbols-outlined text-[16px]">close</span>
                            </Button>
                        </CardBody>
                    </Card>
                ))}

                {meals.length === 0 && (
                    <div className="flex-1 flex flex-col items-center justify-center gap-2 text-default-400 group-hover:text-primary transition-colors py-4">
                        <span className="material-symbols-outlined text-[32px] opacity-40">add_circle</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Plan Meal</span>
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
        <div className="flex flex-col gap-6">
            <div className="text-center pb-4">
                <span className="block text-xs font-bold text-primary uppercase tracking-[0.2em] mb-1">{dayName}</span>
                <Divider className="bg-primary/20 h-1 rounded-full" />
            </div>
            <div className="flex flex-col gap-6">
                <MealSlot day={day} mealTime="lunch" title="Lunch" meals={meals.lunch} onRemoveMeal={onRemoveMeal} />
                <MealSlot day={day} mealTime="dinner" title="Dinner" meals={meals.dinner} onRemoveMeal={onRemoveMeal} />
            </div>
        </div>
    );
};

export default DayColumn;