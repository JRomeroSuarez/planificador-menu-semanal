import { useDraggable } from '@dnd-kit/core';
import { Card, CardBody, Chip } from "@heroui/react";
import { Meal, MealType } from '@/types';
import { MealTypeColors } from '@/utils/constants';

interface MealCardProps {
    meal: Meal;
    isOverlay?: boolean;
}

const MealCard = ({ meal, isOverlay = false }: MealCardProps) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: meal.id,
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <Card
            ref={(node: HTMLElement | null) => setNodeRef(node as any)}
            style={style}
            {...listeners}
            {...attributes}
            isPressable
            className={`
                border border-[#EFE8D8] dark:border-white/10 bg-white dark:bg-white/[0.04] shadow-card
                transition-all duration-200 group rounded-2xl
                ${isDragging ? 'cursor-grabbing ring-2 ring-terracotta scale-[1.03] shadow-soft z-50' : 'cursor-grab hover:border-terracotta/30'}
                ${isOverlay ? 'cursor-grabbing shadow-soft scale-[1.03] z-50 ring-2 ring-terracotta/30' : ''}
            `}
        >
            <CardBody className="p-3">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-wrap gap-1">
                        {meal.type.map(t => {
                            const tagColors = MealTypeColors[t as MealType] || MealTypeColors[MealType.Otro];
                            return (
                                <Chip
                                    key={t}
                                    size="sm"
                                    className={`h-[18px] text-[9px] font-semibold ${tagColors.bg} ${tagColors.text}`}
                                    variant="flat"
                                >
                                    {t}
                                </Chip>
                            );
                        })}
                    </div>
                    <span className="material-symbols-outlined text-ink/25 dark:text-cream/25 group-hover:text-terracotta text-[16px] transition-colors">drag_indicator</span>
                </div>
                <h4 className="text-[13px] font-semibold text-ink dark:text-cream leading-tight">{meal.name}</h4>
            </CardBody>
        </Card>
    );
};

export default MealCard;