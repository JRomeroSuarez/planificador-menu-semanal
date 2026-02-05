import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import * as authService from '../../services/authService';

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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

    const footer = isSuccess ? (
        <button onClick={onSwitchToLogin} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
            Ir a Iniciar Sesión
        </button>
    ) : (
        <>
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
                Cancelar
            </button>
            <button type="submit" form="register-form" disabled={isLoading} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-300">
                {isLoading ? 'Registrando...' : 'Crear Cuenta'}
            </button>
        </>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Crear una Cuenta" footer={footer}>
            {isSuccess ? (
                <div className="text-center p-4">
                    <h3 className="text-lg font-medium text-green-800">¡Registro completado!</h3>
                    <p className="mt-2 text-gray-600">Tu cuenta ha sido creada con éxito. Ahora puedes iniciar sesión.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} id="register-form" className="space-y-4">
                    {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
                    <div>
                        <label htmlFor="reg-username"className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
                        <input id="reg-username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-slate-800"/>
                    </div>
                    <div>
                        <label htmlFor="reg-password"className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                        <input id="reg-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-slate-800"/>
                    </div>
                    <div>
                        <label htmlFor="reg-confirm-password"className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
                        <input id="reg-confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-slate-800"/>
                    </div>
                     <div className="text-sm text-center pt-2">
                        <p className="text-gray-600">
                            ¿Ya tienes una cuenta?{' '}
                            <button type="button" onClick={onSwitchToLogin} className="font-medium text-indigo-600 hover:text-indigo-500">
                                Inicia sesión
                            </button>
                        </p>
                    </div>
                </form>
            )}
        </Modal>
    );
};

export default RegisterModal;