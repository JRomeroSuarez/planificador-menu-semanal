import { useMemo } from 'react';
import { Button, Input, ScrollShadow, Divider, Alert } from "@heroui/react";
import ShoppingListItem from './ShoppingListItem';
import { useShoppingList } from '../../hooks/useShoppingList';
import { usePlannerStore } from '@/features/planner/store/usePlannerStore';
import { deriveShoppingList } from '../../selectors/derivedShoppingList';

const ShoppingList = () => {
    const weeklyPlan = usePlannerStore(state => state.weeklyPlan);
    const ignoredIngredients = usePlannerStore(state => state.ignoredIngredients);
    const manualIngredients = usePlannerStore(state => state.manualIngredients);
    const addManualIngredient = usePlannerStore(state => state.addManualIngredient);
    const removeManualIngredient = usePlannerStore(state => state.removeManualIngredient);
    const ignoreDerivedIngredient = usePlannerStore(state => state.ignoreDerivedIngredient);

    const derivedIngredients = useMemo(
        () => deriveShoppingList(weeklyPlan, ignoredIngredients),
        [weeklyPlan, ignoredIngredients]
    );

    const {
        newItem,
        setNewItem,
        showCopyAlert,
        setShowCopyAlert,
        checkedItems,
        toggleItem,
        handleAddItem,
        handleExport,
        totalCount,
    } = useShoppingList({
        derivedIngredients,
        manualIngredients,
        onAddIngredient: addManualIngredient,
        onRemoveManualIngredient: removeManualIngredient,
        onRemoveDerivedIngredient: ignoreDerivedIngredient,
    });

    return (
        <div className="flex flex-col h-full bg-white dark:bg-[#211E1A] p-6 gap-6 relative">
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

            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-terracotta/10 rounded-2xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-terracotta text-[20px]">shopping_basket</span>
                </div>
                <div>
                    <h3 className="font-display text-lg font-semibold text-ink dark:text-cream">Lista de la compra</h3>
                    {totalCount > 0 && (
                        <p className="text-ink/40 dark:text-cream/40 text-xs">{totalCount} {totalCount === 1 ? 'artículo' : 'artículos'}</p>
                    )}
                </div>
            </div>

            <ScrollShadow className="flex-1 pr-1 -mr-1">
                {totalCount > 0 ? (
                    <div className="space-y-6">
                        {derivedIngredients.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-[11px] font-semibold text-terracotta px-1">Del menú semanal</p>
                                <div className="space-y-1">
                                    {derivedIngredients.map((item) => {
                                        const key = `derived-${item.name}`;
                                        return (
                                            <ShoppingListItem
                                                key={key}
                                                name={item.name}
                                                quantity={item.quantities.join(', ')}
                                                checked={checkedItems.has(key)}
                                                onToggle={() => toggleItem(key)}
                                                onRemove={() => ignoreDerivedIngredient(item.name)}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {manualIngredients.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-[11px] font-semibold text-olive px-1">Añadidos a mano</p>
                                <div className="space-y-1">
                                    {manualIngredients.map((item, index) => {
                                        const key = `manual-${index}-${item.name}`;
                                        return (
                                            <ShoppingListItem
                                                key={key}
                                                name={item.name}
                                                quantity={item.quantity}
                                                checked={checkedItems.has(key)}
                                                onToggle={() => toggleItem(key)}
                                                onRemove={() => removeManualIngredient(index)}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-20 text-ink/30 dark:text-cream/30">
                        <span className="material-symbols-outlined text-[44px] mb-3 block">shopping_basket</span>
                        <p className="text-sm font-medium">Tu lista está vacía</p>
                        <p className="text-xs mt-1 text-ink/25 dark:text-cream/25">Añade recetas al menú o ítems a mano</p>
                    </div>
                )}
            </ScrollShadow>

            <div className="mt-auto flex flex-col gap-4">
                <Divider className="bg-[#EAE1CE] dark:bg-white/5" />
                <form onSubmit={handleAddItem}>
                    <Input
                        size="md"
                        variant="bordered"
                        value={newItem}
                        onValueChange={setNewItem}
                        placeholder="Añadir ítem (ej: Leche - 2L)"
                        classNames={{ inputWrapper: "border-1 border-[#D8CDB6] dark:border-white/15" }}
                        endContent={
                            <Button isIconOnly size="sm" variant="solid" color="primary" type="submit" className="min-w-8 w-8 h-8 rounded-xl">
                                <span className="material-symbols-outlined text-[18px]">add</span>
                            </Button>
                        }
                    />
                </form>

                <Button
                    color="primary"
                    onPress={handleExport}
                    radius="full"
                    className="w-full font-semibold h-12 text-sm shadow-soft"
                    startContent={<span className="material-symbols-outlined text-[18px]">content_copy</span>}
                >
                    Copiar lista
                </Button>
            </div>
        </div>
    );
};

export default ShoppingList;
