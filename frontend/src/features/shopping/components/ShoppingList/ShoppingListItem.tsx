import { Checkbox, Button, Tooltip } from "@heroui/react";

interface ShoppingListItemProps {
    name: string;
    quantity: string;
    checked: boolean;
    onToggle: () => void;
    onRemove: () => void;
}

const ShoppingListItem = ({ name, quantity, checked, onToggle, onRemove }: ShoppingListItemProps) => {
    return (
        <div className="flex items-center gap-2 group py-1">
            <Checkbox
                isSelected={checked}
                onValueChange={onToggle}
                size="sm"
                color="primary"
            />
            <div className={`flex-1 transition-all ${checked ? 'opacity-40 line-through' : ''}`}>
                <p className="text-xs text-foreground font-medium">{name}</p>
                {quantity && <p className="text-[10px] text-default-400">{quantity}</p>}
            </div>
            <Tooltip content="Eliminar" size="sm" color="danger" closeDelay={0}>
                <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={onRemove}
                    className="opacity-0 group-hover:opacity-100 min-w-8 w-8 h-8 text-default-400 hover:text-danger"
                >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                </Button>
            </Tooltip>
        </div>
    );
};

export default ShoppingListItem;
