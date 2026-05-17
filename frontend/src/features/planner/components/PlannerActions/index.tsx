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
                <h2 className="text-4xl font-extrabold text-[#121118] dark:text-white tracking-tighter display-font">Planificador Semanal</h2>
                <p className="text-[#686189] text-base font-medium mt-1">
                    Organiza tus comidas, simplifica tus compras.
                    {isSyncing && (
                        <span className="ml-2 text-xs text-primary animate-pulse">Guardando...</span>
                    )}
                    {!isSyncing && (
                        <span className="ml-2 text-xs text-success opacity-70">
                            <span className="material-symbols-outlined text-[14px] align-middle">cloud_done</span> Guardado
                        </span>
                    )}
                </p>
            </div>
            <div className="flex flex-wrap gap-2">
                <Tooltip content="Ver lista de la compra">
                    <Badge content={shoppingListCount} color="danger" isInvisible={shoppingListCount === 0} shape="circle">
                        <Button
                            onPress={onOpenShoppingList}
                            color="primary"
                            variant="flat"
                            className="font-bold text-xs"
                            startContent={<span className="material-symbols-outlined text-[18px]">shopping_cart</span>}
                        >
                            Lista de compra
                        </Button>
                    </Badge>
                </Tooltip>

                <Tooltip content="Imprimir o guardar como PDF">
                    <Button
                        onPress={onPrint}
                        variant="bordered"
                        className="font-bold text-xs bg-white dark:bg-white/5"
                        startContent={<span className="material-symbols-outlined text-[18px]">print</span>}
                    >
                        Imprimir
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
};

export default PlannerActions;
