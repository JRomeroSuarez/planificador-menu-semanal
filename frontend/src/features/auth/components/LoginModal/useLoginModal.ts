import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';

interface UseLoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const useLoginModal = ({ isOpen, onClose }: UseLoginModalProps) => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setUsername('');
            setPassword('');
            setError('');
            setIsLoading(false);
        }
    }, [isOpen]);

    const handleSubmit = async () => {
        setError('');
        setIsLoading(true);
        try {
            await login(username, password);
            onClose();
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
        error,
        isLoading,
        handleSubmit
    };
};
