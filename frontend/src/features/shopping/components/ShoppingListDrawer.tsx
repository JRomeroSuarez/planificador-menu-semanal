import { Button } from "@heroui/react";
import ShoppingList from './ShoppingList';

interface ShoppingListDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const ShoppingListDrawer = ({ isOpen, onClose }: ShoppingListDrawerProps) => {
    return (
        <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className={`relative w-full max-w-md h-full bg-white dark:bg-background-dark shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Close Button absolute */}
                <Button
                    isIconOnly
                    variant="light"
                    className="absolute top-4 right-4 z-10 text-default-400 hover:text-foreground"
                    onPress={onClose}
                >
                    <span className="material-symbols-outlined">close</span>
                </Button>

                <ShoppingList />
            </div>
        </div>
    );
};

export default ShoppingListDrawer;
