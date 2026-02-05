import { Button, Input, ScrollShadow, Divider, CheckboxGroup } from "@heroui/react";
import { Ingredient } from '@/types';
import { useShoppingList } from './useShoppingList';
import ShoppingListItem from './ShoppingListItem';

interface ConsolidatedIngredient {
    name: string;
    quantities: string[];
}

interface ShoppingListProps {
    derivedIngredients: ConsolidatedIngredient[];
    manualIngredients: Ingredient[];
    onAddIngredient: (ingredient: Ingredient) => void;
    onRemoveManualIngredient: (index: number) => void;
    onRemoveDerivedIngredient: (name: string) => void;
}

const ShoppingList = ({
    derivedIngredients,
    manualIngredients,
    onAddIngredient,
    onRemoveManualIngredient,
    onRemoveDerivedIngredient
}: ShoppingListProps) => {
    const {
        newItem,
        setNewItem,
        handleAddItem,
        handleExport
    } = useShoppingList({ onAddIngredient });

    return (
        <div className="flex flex-col h-full bg-white dark:bg-background-dark p-6 gap-6">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-primary text-2xl">shopping_cart</span>
                </div>
                <h3 className="text-foreground text-lg font-black">Lista de Compra</h3>
                <p className="text-default-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Inventario Semanal</p>
            </div>

            <ScrollShadow className="flex-1 pr-1 -mr-1">
                <CheckboxGroup label="Artículos" classNames={{ label: "hidden" }}>
                    {derivedIngredients.length > 0 && (
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="material-symbols-outlined text-primary text-[14px]">set_meal</span>
                                <h4 className="text-[10px] font-black text-primary uppercase tracking-widest">Del Menú</h4>
                            </div>
                            <div className="space-y-1">
                                {derivedIngredients.map(item => (
                                    <ShoppingListItem
                                        key={item.name}
                                        name={item.name}
                                        quantities={item.quantities.join(', ')}
                                        onRemove={() => onRemoveDerivedIngredient(item.name)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {manualIngredients.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="material-symbols-outlined text-primary text-[14px]">add_shopping_cart</span>
                                <h4 className="text-[10px] font-black text-primary uppercase tracking-widest">Extras</h4>
                            </div>
                            <div className="space-y-1">
                                {manualIngredients.map((item, index) => (
                                    <ShoppingListItem
                                        key={index}
                                        name={item.name}
                                        quantities={item.quantity}
                                        onRemove={() => onRemoveManualIngredient(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </CheckboxGroup>

                {derivedIngredients.length === 0 && manualIngredients.length === 0 && (
                    <div className="text-center py-20 text-default-400">
                        <span className="material-symbols-outlined text-[48px] mb-4 block opacity-10">shopping_basket</span>
                        <p className="text-xs font-medium uppercase tracking-widest">Tu lista está vacía</p>
                    </div>
                )}
            </ScrollShadow>

            <div className="mt-auto flex flex-col gap-4">
                <Divider />
                <form onSubmit={handleAddItem}>
                    <Input
                        size="md"
                        variant="bordered"
                        value={newItem}
                        onValueChange={setNewItem}
                        placeholder="Añadir ítem (Ej: Leche - 2L)"
                        classNames={{
                            inputWrapper: "border-1",
                        }}
                        endContent={
                            <Button isIconOnly size="sm" variant="solid" color="primary" type="submit" className="min-w-8 w-8 h-8 rounded-lg">
                                <span className="material-symbols-outlined text-[18px]">add</span>
                            </Button>
                        }
                    />
                </form>

                <Button
                    color="primary"
                    variant="shadow"
                    onPress={handleExport}
                    className="w-full font-bold h-12 text-sm"
                    startContent={<span className="material-symbols-outlined text-[18px]">share</span>}
                >
                    Exportar Lista
                </Button>
            </div>
        </div>
    );
};

export default ShoppingList;
