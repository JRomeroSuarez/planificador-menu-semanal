import { useState } from 'react';

export const useAppModals = () => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
    const [isShoppingListOpen, setShoppingListOpen] = useState(false);

    const openLogin = () => {
        setRegisterModalOpen(false);
        setLoginModalOpen(true);
    };

    const openRegister = () => {
        setLoginModalOpen(false);
        setRegisterModalOpen(true);
    };

    const openShoppingList = () => setShoppingListOpen(true);
    const closeShoppingList = () => setShoppingListOpen(false);

    const closeLogin = () => setLoginModalOpen(false);
    const closeRegister = () => setRegisterModalOpen(false);

    return {
        isLoginModalOpen,
        isRegisterModalOpen,
        isShoppingListOpen,
        openLogin,
        openRegister,
        openShoppingList,
        closeLogin,
        closeRegister,
        closeShoppingList
    };
};
