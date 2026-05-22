import { Drawer, DrawerContent, DrawerBody } from "@heroui/react";
import { useUIStore } from '@/store/useUIStore';
import ShoppingList from '../ShoppingList';

const ShoppingListDrawer = () => {
    const isOpen = useUIStore(state => state.isShoppingListOpen);
    const closeShoppingList = useUIStore(state => state.closeShoppingList);

    return (
        <Drawer
            isOpen={isOpen}
            onOpenChange={(open) => { if (!open) closeShoppingList(); }}
            placement="right"
            size="sm"
            backdrop="blur"
            classNames={{
                base: "bg-white dark:bg-[#211E1A]",
            }}
        >
            <DrawerContent>
                <DrawerBody className="p-0">
                    <ShoppingList />
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default ShoppingListDrawer;
