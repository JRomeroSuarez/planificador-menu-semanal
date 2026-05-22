import { Button, Tooltip, Badge } from "@heroui/react";

interface PlannerActionsProps {
    onPrint: () => void;
    onOpenShoppingList: () => void;
    shoppingListCount: number;
    isSyncing: boolean;
}

const PlannerActions = ({ onPrint, onOpenShoppingList, shoppingListCount, isSyncing }: PlannerActionsProps) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 no-print gap-4">
            <div>
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink dark:text-cream">Tu semana</h2>
                <p className="text-ink/50 dark:text-cream/50 text-sm font-medium mt-1.5 flex items-center gap-2">
                    Arrastra recetas a cada día.
                    {isSyncing ? (
                        <span className="inline-flex items-center gap-1 text-xs text-terracotta">
                            <span className="material-symbols-outlined text-[14px] animate-spin">progress_activity</span>
                            Guardando
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-olive">
                            <span className="material-symbols-outlined text-[14px]">check_circle</span>
                            Guardado
                        </span>
                    )}
                </p>
            </div>
            <div className="flex flex-wrap gap-2">
                <Tooltip content="Ver lista de la compra">
                    <Badge content={shoppingListCount} color="primary" isInvisible={shoppingListCount === 0} shape="circle">
                        <Button
                            onPress={onOpenShoppingList}
                            color="primary"
                            variant="flat"
                            radius="full"
                            className="font-semibold text-sm text-terracotta"
                            startContent={<span className="material-symbols-outlined text-[18px]">shopping_basket</span>}
                        >
                            Lista de la compra
                        </Button>
                    </Badge>
                </Tooltip>

                <Tooltip content="Imprimir o guardar como PDF">
                    <Button
                        onPress={onPrint}
                        variant="bordered"
                        radius="full"
                        isIconOnly
                        className="border-[#D8CDB6] dark:border-white/15 text-ink/60 dark:text-cream/60"
                    >
                        <span className="material-symbols-outlined text-[18px]">print</span>
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
};

export default PlannerActions;
