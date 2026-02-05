import { useState } from 'react';

export const useAppModals = () => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

    const openLogin = () => {
        setRegisterModalOpen(false);
        setLoginModalOpen(true);
    };

    const openRegister = () => {
        setLoginModalOpen(false);
        setRegisterModalOpen(true);
    };

    const closeLogin = () => setLoginModalOpen(false);
    const closeRegister = () => setRegisterModalOpen(false);

    return {
        isLoginModalOpen,
        isRegisterModalOpen,
        openLogin,
        openRegister,
        closeLogin,
        closeRegister
    };
};
