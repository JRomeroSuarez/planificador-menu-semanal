import { useDraggable } from '@dnd-kit/core';
import { Card, CardBody, Chip } from "@heroui/react";
import { Meal, MealType } from '../../types';
import { MealTypeColors } from '../../config/constants';

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
                border-none bg-white dark:bg-white/5 shadow-sm
                transition-all duration-200 group
                ${isDragging ? 'cursor-grabbing ring-2 ring-primary scale-105 shadow-xl z-50' : 'cursor-grab'}
                ${isOverlay ? 'cursor-grabbing shadow-2xl scale-105 z-50 ring-2 ring-primary/20' : ''}
            `}
        >
            <CardBody className="p-3">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-wrap gap-1">
                        {meal.type.map(t => {
                            const tagColors = MealTypeColors[t];
                            return (
                                <Chip
                                    key={t}
                                    size="sm"
                                    className={`h-4 text-[8px] font-bold uppercase tracking-wider ${tagColors.bg} ${tagColors.text}`}
                                    variant="flat"
                                >
                                    {t}
                                </Chip>
                            );
                        })}
                    </div>
                    <span className="material-symbols-outlined text-default-400 group-hover:text-primary text-[16px] transition-colors">drag_indicator</span>
                </div>
                <h4 className="text-xs font-semibold text-foreground leading-tight">{meal.name}</h4>
            </CardBody>
        </Card>
    );
};

export default MealCard;