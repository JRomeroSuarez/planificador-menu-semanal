import { AuthProvider } from '@/features/auth/context/AuthContext';
import Header from '@/layouts/Header';
import LoginModal from '@/features/auth/components/LoginModal';
import RegisterModal from '@/features/auth/components/RegisterModal';
import PlannerView from '@/features/planner/components/PlannerView';
import { useAppModals } from '@/hooks/useAppModals';

const AppContent = () => {
    const {
        isLoginModalOpen,
        isRegisterModalOpen,
        openLogin,
        openRegister,
        closeLogin,
        closeRegister
    } = useAppModals();

    return (
        <div className="flex flex-col min-h-screen">
            <Header onLoginClick={openLogin} onRegisterClick={openRegister} />

            <PlannerView onLoginClick={openLogin} />

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={closeLogin}
                onSwitchToRegister={openRegister}
            />

            <RegisterModal
                isOpen={isRegisterModalOpen}
                onClose={closeRegister}
                onSwitchToLogin={openLogin}
            />
        </div>
    );
}

const App = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;