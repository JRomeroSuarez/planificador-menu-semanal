import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Button, Chip, Image } from "@heroui/react";
import { Meal, MealType } from '@/types';
import { MealTypeColors } from '@/utils/constants';

interface CatalogCardProps {
    meal: Meal;
    onAdd?: () => void;
}

import { useShoppingListStore } from "@/features/shopping/store/useShoppingListStore";

const CatalogCard = ({ meal, onAdd }: CatalogCardProps) => {
    const navigate = useNavigate();
    const addItem = useShoppingListStore(state => state.addItem);

    const imageUrl = `https://loremflickr.com/400/300/food,recipe?lock=${meal.id}`;

    const handleAddToCart = (e: any) => {
        e.stopPropagation();
        meal.ingredients.forEach(ing => addItem(ing.name, ing.quantity));
        alert("Ingredientes añadidos a la lista");
    };

    return (
        <Card
            isPressable
            onPress={() => navigate(`/recetas/${meal.id}`)}
            className="group border-none bg-white dark:bg-slate-900 transition-all hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    alt={meal.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    src={imageUrl}
                    radius="none"
                />
                <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
                    <Button
                        isIconOnly
                        radius="full"
                        size="sm"
                        variant="flat"
                        className="bg-white/90 backdrop-blur text-slate-600 hover:text-danger shadow-sm"
                    >
                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                    </Button>
                    <Button
                        isIconOnly
                        radius="full"
                        size="sm"
                        variant="flat"
                        className="bg-white/90 backdrop-blur text-slate-600 hover:text-primary shadow-sm"
                        onPress={handleAddToCart}
                    >
                        <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                    </Button>
                </div>
                {meal.type.length > 0 && (
                    <div className="absolute bottom-3 left-3 z-20">
                        <Chip
                            size="sm"
                            variant="solid"
                            className="bg-white/90 backdrop-blur border-none text-[10px] font-black uppercase tracking-wider text-slate-800"
                        >
                            {meal.type[0]}
                        </Chip>
                    </div>
                )}
            </div>
            <CardBody className="p-5 space-y-3">
                <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{meal.name}</h3>
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">timer</span>
                            25 min
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">signal_cellular_alt</span>
                            Easy
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                    {meal.ingredients.slice(0, 3).map((ing, idx) => (
                        <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-400 font-bold"
                        >
                            {ing.name}
                        </span>
                    ))}
                    {meal.ingredients.length > 3 && (
                        <span className="text-[10px] text-slate-400 font-bold">+{meal.ingredients.length - 3}</span>
                    )}
                </div>
            </CardBody>
        </Card>
    );
};

export default CatalogCard;
