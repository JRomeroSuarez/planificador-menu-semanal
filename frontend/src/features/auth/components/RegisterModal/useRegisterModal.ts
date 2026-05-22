import { useState, useEffect } from 'react';
import * as authService from '@/features/auth/api/authService';
import { useAuthStore } from '@/features/auth/store/useAuthStore';

interface UseRegisterModalProps {
    isOpen: boolean;
    onSuccess?: () => void;
}

export const useRegisterModal = ({ isOpen, onSuccess }: UseRegisterModalProps) => {
    const { login } = useAuthStore();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setError('');
            setIsLoading(false);
            setIsSuccess(false);
        }
    }, [isOpen]);

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        setError('');
        setIsLoading(true);
        try {
            await authService.register(username, password);
            await login(username, password);
            onSuccess ? onSuccess() : setIsSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        error,
        isLoading,
        isSuccess,
        handleSubmit
    };
};
