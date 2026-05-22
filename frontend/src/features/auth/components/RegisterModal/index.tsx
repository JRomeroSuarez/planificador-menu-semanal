import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Link } from "@heroui/react";
import { useRegisterModal } from './useRegisterModal';

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
    onSuccess?: () => void;
}

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin, onSuccess }: RegisterModalProps) => {
    const {
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
    } = useRegisterModal({ isOpen, onSuccess });

    return (
        <Modal isOpen={isOpen} onClose={onClose} placement="center" backdrop="blur">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 font-display font-semibold">
                            {isSuccess ? '¡Cuenta creada!' : 'Crear cuenta'}
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
                                        <div className="p-3 text-sm bg-danger-50 text-danger rounded-xl font-medium">
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
                                        <Link className="cursor-pointer font-semibold text-terracotta" size="sm" onPress={onSwitchToLogin}>
                                            Inicia sesión
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            {isSuccess ? (
                                <Button color="primary" radius="full" onPress={onSwitchToLogin} className="w-full font-semibold">
                                    Ir a iniciar sesión
                                </Button>
                            ) : (
                                <>
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
                                        Crear cuenta
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
