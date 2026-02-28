import { Button, Input, ScrollShadow, Divider, Alert } from "@heroui/react";
import { Ingredient } from '@/types';
import ShoppingListItem from './ShoppingListItem';
import { useShoppingList } from '../../hooks/useShoppingList';

interface ShoppingListProps {
    derivedIngredients: { name: string; quantities: string[]; }[];
    manualIngredients: Ingredient[];
    onAddIngredient: (ingredient: Ingredient) => void;
    onRemoveManualIngredient: (index: number) => void;
    onRemoveDerivedIngredient: (name: string) => void;
}

const ShoppingList = (props: ShoppingListProps) => {
    const {
        newItem,
        setNewItem,
        showCopyAlert,
        setShowCopyAlert,
        handleAddItem,
        handleExport,
        totalCount,
        onRemoveManualIngredient,
        onRemoveDerivedIngredient
    } = useShoppingList(props);

    const { derivedIngredients, manualIngredients } = props;

    return (
        <div className="flex flex-col h-full bg-white dark:bg-background-dark p-6 gap-6 relative">
            {showCopyAlert && (
                <div className="absolute top-4 left-6 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                    <Alert
                        color="success"
                        variant="flat"
                        title="¡Copiado!"
                        description="Lista copiada al portapapeles"
                        onClose={() => setShowCopyAlert(false)}
                    />
                </div>
            )}

            <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-primary text-2xl">shopping_cart</span>
                </div>
                <h3 className="text-foreground text-lg font-black">Lista de Compra</h3>
                <p className="text-default-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Inventario Semanal</p>
            </div>

            <ScrollShadow className="flex-1 pr-1 -mr-1">
                {totalCount > 0 ? (
                    <div className="space-y-6">
                        {/* Recetas (Derived) */}
                        {derivedIngredients.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-[10px] font-bold text-primary uppercase tracking-wider px-1">De tus recetas</p>
                                <div className="space-y-1">
                                    {derivedIngredients.map((item) => (
                                        <ShoppingListItem
                                            key={`derived-${item.name}`}
                                            name={item.name}
                                            quantity={item.quantities.join(', ')}
                                            checked={false}
                                            onToggle={() => { }}
                                            onRemove={() => onRemoveDerivedIngredient(item.name)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Manuales (Manual) */}
                        {manualIngredients.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-[10px] font-bold text-primary uppercase tracking-wider px-1">Añadidos a mano</p>
                                <div className="space-y-1">
                                    {manualIngredients.map((item, index) => (
                                        <ShoppingListItem
                                            key={`manual-${index}`}
                                            name={item.name}
                                            quantity={item.quantity}
                                            checked={false}
                                            onToggle={() => { }}
                                            onRemove={() => onRemoveManualIngredient(index)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
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
