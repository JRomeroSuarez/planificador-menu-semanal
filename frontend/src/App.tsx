import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useUIStore } from '@/store/useUIStore';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import Header from '@/layouts/Header';
import LoginModal from '@/features/auth/components/LoginModal';
import RegisterModal from '@/features/auth/components/RegisterModal';
import AuthScreen from '@/features/auth/components/AuthScreen';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const PlannerView = lazy(() => import('@/features/planner/components/PlannerView'));
const RecipesCatalog = lazy(() => import('@/features/meals/components/RecipesCatalog'));
const RecipeDetail = lazy(() => import('@/features/meals/components/RecipeDetail'));
const AddRecipePage = lazy(() => import('@/features/meals/components/AddRecipePage'));

const PageLoader = () => (
    <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent" />
    </div>
);

const AppContent = () => {
    const { isAuthenticated } = useAuthStore();
    const {
        isLoginModalOpen,
        isRegisterModalOpen,
        openLogin,
        openRegister,
        closeLogin,
        closeRegister,
    } = useUIStore();

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            {!isAuthenticated ? (
                <AuthScreen onLoginClick={openLogin} onRegisterClick={openRegister} />
            ) : (
                <ErrorBoundary>
                    <Suspense fallback={<PageLoader />}>
                        <Routes>
                            <Route path="/" element={<PlannerView />} />
                            <Route path="/recetas" element={<RecipesCatalog />} />
                            <Route path="/recetas/nueva" element={<AddRecipePage />} />
                            <Route path="/recetas/editar/:id" element={<AddRecipePage />} />
                            <Route path="/recetas/:id" element={<RecipeDetail />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </Suspense>
                </ErrorBoundary>
            )}

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
};

const App = () => (
    <BrowserRouter>
        <AppContent />
    </BrowserRouter>
);

export default App;
