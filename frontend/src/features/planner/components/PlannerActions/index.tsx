import { Button, Tooltip, Badge } from "@heroui/react";

interface PlannerActionsProps {
    onSave: () => void;
    onLoad: () => void;
    onPrint: () => void;
    onOpenShoppingList: () => void;
    shoppingListCount: number;
}

const PlannerActions = ({ onSave, onLoad, onPrint, onOpenShoppingList, shoppingListCount }: PlannerActionsProps) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 no-print gap-4">
            <div>
                <h2 className="text-3xl font-extrabold text-[#121118] dark:text-white tracking-tight">Planificador Semanal</h2>
                <p className="text-[#686189] text-base font-medium mt-1">Organiza tus comidas, simplifica tus compras.</p>
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

                <Tooltip content="Guardar el plan actual localmente">
                    <Button
                        onPress={onSave}
                        color="primary"
                        className="font-bold text-xs shadow-lg shadow-primary/20"
                        startContent={<span className="material-symbols-outlined text-[18px]">save</span>}
                    >
                        Guardar Plan
                    </Button>
                </Tooltip>

                <Tooltip content="Cargar último plan guardado">
                    <Button
                        onPress={onLoad}
                        variant="bordered"
                        className="font-bold text-xs bg-white dark:bg-white/5"
                        startContent={<span className="material-symbols-outlined text-[18px]">file_open</span>}
                    >
                        Cargar Plan
                    </Button>
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
