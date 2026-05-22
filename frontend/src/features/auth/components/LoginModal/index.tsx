import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Link } from "@heroui/react";
import { useLoginModal } from './useLoginModal';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToRegister: () => void;
    onSuccess?: () => void;
}

const LoginModal = ({ isOpen, onClose, onSwitchToRegister, onSuccess }: LoginModalProps) => {
    const {
        username,
        setUsername,
        password,
        setPassword,
        error,
        isLoading,
        handleSubmit
    } = useLoginModal({ isOpen, onClose, onSuccess });

    return (
        <Modal isOpen={isOpen} onClose={onClose} placement="center" backdrop="blur">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 font-display font-semibold">Iniciar sesión</ModalHeader>
                        <ModalBody>
                            <div className="space-y-4">
                                {error && (
                                    <div className="p-3 text-sm bg-danger-50 text-danger rounded-xl font-medium">
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
                                    <Link className="cursor-pointer font-semibold text-terracotta" size="sm" onPress={onSwitchToRegister}>
                                        Regístrate aquí
                                    </Link>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="light" onPress={onClose} className="font-medium">
                                Cancelar
                            </Button>
                            <Button
                                color="primary"
                                radius="full"
                                onPress={handleSubmit}
                                isLoading={isLoading}
                                className="font-semibold px-6"
                            >
                                Entrar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default LoginModal;
