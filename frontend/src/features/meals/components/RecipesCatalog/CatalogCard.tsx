import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Button, Chip } from "@heroui/react";
import { Meal, MealType } from '@/types';
import { MealTypeColors } from '@/utils/constants';
import { useShoppingListStore } from "@/features/shopping/store/useShoppingListStore";

interface CatalogCardProps {
    meal: Meal;
}

const RecipePlaceholder = ({ name }: { name: string }) => (
    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
        <div className="text-center px-4">
            <span className="material-symbols-outlined text-primary/30 text-[48px]">restaurant_menu</span>
            <p className="text-[11px] font-bold text-primary/40 mt-1 line-clamp-2">{name}</p>
        </div>
    </div>
);

const CatalogCard = ({ meal }: CatalogCardProps) => {
    const navigate = useNavigate();
    const addItem = useShoppingListStore(state => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        meal.ingredients.forEach(ing => addItem(ing.name, ing.quantity));
    };

    return (
        <Card
            isPressable
            onPress={() => navigate(`/recetas/${meal.id}`)}
            className="group border border-[#EFE8D8] dark:border-white/10 bg-white dark:bg-white/[0.04] rounded-3xl transition-all hover:shadow-soft hover:-translate-y-1"
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                {meal.imageUrl ? (
                    <img
                        alt={meal.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        src={meal.imageUrl}
                    />
                ) : (
                    <RecipePlaceholder name={meal.name} />
                )}
                <div className="absolute top-3 right-3 z-20">
                    <Button
                        isIconOnly
                        radius="full"
                        size="sm"
                        variant="flat"
                        className="bg-white/90 backdrop-blur text-ink/60 hover:text-terracotta shadow-soft"
                        onPress={handleAddToCart}
                        title="Añadir ingredientes a la lista"
                    >
                        <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                    </Button>
                </div>
                {meal.type.length > 0 && (
                    <div className="absolute bottom-3 left-3 z-20">
                        <Chip
                            size="sm"
                            variant="solid"
                            className="bg-white/90 backdrop-blur border-none text-[11px] font-semibold text-ink/80"
                        >
                            {meal.type[0]}
                        </Chip>
                    </div>
                )}
            </div>
            <CardBody className="p-5 space-y-3">
                <div className="flex flex-col gap-1">
                    <h3 className="font-display text-lg font-semibold text-ink dark:text-cream leading-tight">{meal.name}</h3>
                    <div className="flex items-center gap-4 text-xs font-medium text-ink/45 dark:text-cream/45">
                        {meal.prepTime ? (
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">timer</span>
                                {meal.prepTime} min
                            </div>
                        ) : null}
                        {meal.servings ? (
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">group</span>
                                {meal.servings} {meal.servings === 1 ? 'persona' : 'personas'}
                            </div>
                        ) : null}
                    </div>
                </div>

                {meal.ingredients.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {meal.ingredients.slice(0, 3).map((ing, idx) => (
                            <span
                                key={idx}
                                className="px-2.5 py-0.5 rounded-full bg-[#F2EADB] dark:bg-white/5 text-[10px] text-ink/55 dark:text-cream/55 font-medium"
                            >
                                {ing.name}
                            </span>
                        ))}
                        {meal.ingredients.length > 3 && (
                            <span className="text-[10px] text-ink/35 font-medium self-center">+{meal.ingredients.length - 3}</span>
                        )}
                    </div>
                )}
            </CardBody>
        </Card>
    );
};

export default CatalogCard;
