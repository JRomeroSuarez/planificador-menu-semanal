import { Button, Input, ScrollShadow, Divider, CheckboxGroup } from "@heroui/react";
import { useShoppingListStore } from '@/features/shopping/store/useShoppingListStore';
import ShoppingListItem from './ShoppingListItem';
import { useState } from "react";

const ShoppingList = () => {
    const { items, addItem, removeItem } = useShoppingListStore();
    const [newItem, setNewItem] = useState('');
    console.log(items);
    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (newItem.trim() === '') return;

        const parts = newItem.split('-').map(p => p.trim());
        addItem(parts[0], parts[1] || '');
        setNewItem('');
    };

    const handleExport = () => {
        const text = items.map(i => `- ${i.name} ${i.quantity ? `(${i.quantity})` : ''}`).join('\n');
        navigator.clipboard.writeText(text);
        alert("Lista copiada al portapapeles");
    };

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
                    {items.length > 0 ? (
                        <div className="space-y-1">
                            {items.map(item => (
                                <ShoppingListItem
                                    key={item.id}
                                    name={item.name}
                                    quantities={item.quantity || ''}
                                    onRemove={() => removeItem(item.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-default-400">
                            <span className="material-symbols-outlined text-[48px] mb-4 block opacity-10">shopping_basket</span>
                            <p className="text-xs font-medium uppercase tracking-widest">Tu lista está vacía</p>
                        </div>
                    )}
                </CheckboxGroup>
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
