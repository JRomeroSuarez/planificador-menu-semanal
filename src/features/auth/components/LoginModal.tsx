import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Link } from "@heroui/react";
import { useAuth } from '@/features/auth/context/AuthContext';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToRegister: () => void;
}

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) => {
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

    return (
        <Modal isOpen={isOpen} onClose={onClose} placement="center" backdrop="blur">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Iniciar Sesión</ModalHeader>
                        <ModalBody>
                            <div className="space-y-4">
                                {error && (
                                    <div className="p-3 text-xs bg-danger-50 text-danger rounded-xl font-bold uppercase tracking-tight">
                                        {error}
                                    </div>
                                )}
                                <Input
                                    label="Usuario"
                                    placeholder="Introduce tu usuario"
                                    variant="bordered"
                                    value={username}
                                    onValueChange={setUsername}
                                    autoFocus
                                />
                                <Input
                                    label="Contraseña"
                                    placeholder="Introduce tu contraseña"
                                    type="password"
                                    variant="bordered"
                                    value={password}
                                    onValueChange={setPassword}
                                />
                                <div className="text-center text-sm">
                                    <span className="text-default-500">¿No tienes una cuenta? </span>
                                    <Link className="cursor-pointer font-bold" size="sm" onPress={onSwitchToRegister}>
                                        Regístrate aquí
                                    </Link>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="flat" color="danger" onPress={onClose}>
                                Cancelar
                            </Button>
                            <Button
                                color="primary"
                                onPress={handleSubmit}
                                isLoading={isLoading}
                                className="font-bold"
                            >
                                Iniciar Sesión
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default LoginModal;