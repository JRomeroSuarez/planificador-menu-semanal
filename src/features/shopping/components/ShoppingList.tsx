import { useState } from 'react';
import { Checkbox, Button, Input, ScrollShadow, Divider } from "@heroui/react";
import { Ingredient } from '@/types';

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

const ShoppingListItem = ({ name, quantities, onRemove }: { name: string; quantities: string; onRemove: () => void; }) => {
    const [isSelected, setIsSelected] = useState(false);

    return (
        <div className="flex items-center gap-2 group py-1">
            <Checkbox
                isSelected={isSelected}
                onValueChange={setIsSelected}
                size="sm"
                color="primary"
            />
            <div className={`flex-1 transition-all ${isSelected ? 'opacity-40 line-through' : ''}`}>
                <p className="text-xs text-foreground font-medium">{name}</p>
                {quantities && <p className="text-[10px] text-default-400">{quantities}</p>}
            </div>
            <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={onRemove}
                className="opacity-0 group-hover:opacity-100 min-w-8 w-8 h-8 text-default-400 hover:text-danger"
            >
                <span className="material-symbols-outlined text-[16px]">delete</span>
            </Button>
        </div>
    );
};

const ShoppingList = ({ derivedIngredients, manualIngredients, onAddIngredient, onRemoveManualIngredient, onRemoveDerivedIngredient }: ShoppingListProps) => {
    const [newItem, setNewItem] = useState('');

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (newItem.trim() === '') return;

        const parts = newItem.split('-').map(p => p.trim());
        const ingredient: Ingredient = {
            name: parts[0],
            quantity: parts[1] || '',
        };

        onAddIngredient(ingredient);
        setNewItem('');
    };

    const handleExport = () => {
        alert("Lista exportada al portapapeles (Simulado)");
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-background-dark p-4 gap-4">
            <div>
                <h3 className="text-foreground text-base font-bold text-center">Shopping List</h3>
                <p className="text-default-400 text-[10px] font-semibold uppercase tracking-widest mt-1 text-center">Weekly Inventory</p>
            </div>

            <ScrollShadow className="flex-1 space-y-6 pr-1">
                {derivedIngredients.length > 0 && (
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-primary text-[14px]">set_meal</span>
                            <h4 className="text-[10px] font-black text-primary uppercase tracking-widest">Del Menú</h4>
                        </div>
                        <div className="space-y-0.5">
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
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-primary text-[14px]">add_shopping_cart</span>
                            <h4 className="text-[10px] font-black text-primary uppercase tracking-widest">Extras</h4>
                        </div>
                        <div className="space-y-0.5">
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

                {derivedIngredients.length === 0 && manualIngredients.length === 0 && (
                    <div className="text-center py-12 text-default-400">
                        <span className="material-symbols-outlined text-[40px] mb-3 block opacity-20">shopping_basket</span>
                        <p className="text-xs">Your list is empty</p>
                    </div>
                )}
            </ScrollShadow>

            <div className="mt-auto space-y-4 pt-4">
                <Divider className="mb-4" />
                <form onSubmit={handleAddItem} className="flex gap-2">
                    <Input
                        size="sm"
                        variant="bordered"
                        value={newItem}
                        onValueChange={setNewItem}
                        placeholder="Add extra item..."
                        endContent={
                            <Button isIconOnly size="sm" variant="flat" color="primary" type="submit">
                                <span className="material-symbols-outlined text-[18px]">add</span>
                            </Button>
                        }
                    />
                </form>

                <Button
                    color="primary"
                    variant="solid"
                    onPress={handleExport}
                    className="w-full font-bold shadow-lg shadow-primary/20"
                    startContent={<span className="material-symbols-outlined text-[18px]">send_to_mobile</span>}
                >
                    Export List
                </Button>
            </div>
        </div>
    );
};

export default ShoppingList;