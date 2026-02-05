import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Link } from "@heroui/react";
import * as authService from '../../services/authService';

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
}

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) => {
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
            setIsSuccess(true);
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
                        <ModalHeader className="flex flex-col gap-1">
                            {isSuccess ? '¡Registro completado!' : 'Crear una Cuenta'}
                        </ModalHeader>
                        <ModalBody>
                            {isSuccess ? (
                                <div className="text-center py-4 space-y-4">
                                    <div className="w-16 h-16 bg-success-50 text-success rounded-full flex items-center justify-center mx-auto">
                                        <span className="material-symbols-outlined text-3xl">check_circle</span>
                                    </div>
                                    <p className="text-default-600">
                                        Tu cuenta ha sido creada con éxito. Ahora ya puedes iniciar sesión y empezar a planificar.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {error && (
                                        <div className="p-3 text-xs bg-danger-50 text-danger rounded-xl font-bold uppercase tracking-tight">
                                            {error}
                                        </div>
                                    )}
                                    <Input
                                        label="Usuario"
                                        placeholder="Elige un nombre de usuario"
                                        variant="bordered"
                                        value={username}
                                        onValueChange={setUsername}
                                    />
                                    <Input
                                        label="Contraseña"
                                        placeholder="Crea una contraseña"
                                        type="password"
                                        variant="bordered"
                                        value={password}
                                        onValueChange={setPassword}
                                    />
                                    <Input
                                        label="Confirmar Contraseña"
                                        placeholder="Repite tu contraseña"
                                        type="password"
                                        variant="bordered"
                                        value={confirmPassword}
                                        onValueChange={setConfirmPassword}
                                    />
                                    <div className="text-center text-sm">
                                        <span className="text-default-500">¿Ya tienes una cuenta? </span>
                                        <Link className="cursor-pointer font-bold" size="sm" onPress={onSwitchToLogin}>
                                            Inicia sesión
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            {isSuccess ? (
                                <Button color="primary" onPress={onSwitchToLogin} className="w-full font-bold">
                                    Ir a Iniciar Sesión
                                </Button>
                            ) : (
                                <>
                                    <Button variant="flat" color="danger" onPress={onClose}>
                                        Cancelar
                                    </Button>
                                    <Button
                                        color="primary"
                                        onPress={handleSubmit}
                                        isLoading={isLoading}
                                        className="font-bold"
                                    >
                                        Crear Cuenta
                                    </Button>
                                </>
                            )}
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default RegisterModal;