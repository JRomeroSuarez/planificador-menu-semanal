import { useDraggable } from '@dnd-kit/core';
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
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={`
                p-3 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl shadow-sm 
                transition-all duration-200 group
                ${isDragging ? 'cursor-grabbing border-primary scale-105 shadow-xl z-50' : 'cursor-grab hover:border-primary'}
                ${isOverlay ? 'cursor-grabbing shadow-2xl scale-105 z-50 ring-2 ring-primary/20' : ''}
            `}
        >
            <div className="flex justify-between items-start mb-2">
                <div className="flex flex-wrap gap-1">
                    {meal.type.map(t => {
                        const tagColors = MealTypeColors[t];
                        return (
                            <span
                                key={t}
                                className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${tagColors.bg} ${tagColors.text}`}
                            >
                                {t}
                            </span>
                        );
                    })}
                </div>
                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary text-[16px] transition-colors">drag_indicator</span>
            </div>
            <h4 className="text-xs font-semibold text-[#121118] dark:text-white leading-tight">{meal.name}</h4>
        </div>
    );
};

export default MealCard;