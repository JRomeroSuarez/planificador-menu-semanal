import React from 'react';

interface AuthScreenProps {
    onLoginClick: () => void;
    onRegisterClick: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginClick, onRegisterClick }) => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-white">
             <div className="max-w-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                <h2 className="text-4xl font-bold text-slate-800 mt-6">Bienvenido a tu Planificador de Menús</h2>
                <p className="text-lg text-slate-500 mt-4">
                    Organiza tus comidas, simplifica tus compras y descubre nuevas recetas.
                    Para comenzar, por favor inicia sesión o crea una cuenta.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                        onClick={onLoginClick} 
                        className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-base font-semibold shadow-md"
                    >
                        Iniciar Sesión
                    </button>
                    <button 
                        onClick={onRegisterClick} 
                        className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-base font-semibold"
                    >
                        Crear Cuenta
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthScreen;
