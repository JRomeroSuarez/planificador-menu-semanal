import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useUIStore } from '@/store/useUIStore';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import Header from '@/layouts/Header';
import LoginModal from '@/features/auth/components/LoginModal';
import RegisterModal from '@/features/auth/components/RegisterModal';
import LandingPage from '@/features/auth/components/LandingPage';
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

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuthStore();
    if (!isAuthenticated) return <Navigate to="/" replace />;
    return <>{children}</>;
};

const AppContent = () => {
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    const {
        isLoginModalOpen,
        isRegisterModalOpen,
        openLogin,
        openRegister,
        closeLogin,
        closeRegister,
    } = useUIStore();

    const handleLoginSuccess = () => {
        closeLogin();
        navigate('/planificador');
    };

    const handleRegisterSuccess = () => {
        closeRegister();
        navigate('/planificador');
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <ErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                isAuthenticated
                                    ? <Navigate to="/planificador" replace />
                                    : <LandingPage onLoginClick={openLogin} onRegisterClick={openRegister} />
                            }
                        />
                        <Route
                            path="/planificador"
                            element={<RequireAuth><PlannerView /></RequireAuth>}
                        />
                        <Route
                            path="/recetas"
                            element={<RequireAuth><RecipesCatalog /></RequireAuth>}
                        />
                        <Route
                            path="/recetas/nueva"
                            element={<RequireAuth><AddRecipePage /></RequireAuth>}
                        />
                        <Route
                            path="/recetas/editar/:id"
                            element={<RequireAuth><AddRecipePage /></RequireAuth>}
                        />
                        <Route
                            path="/recetas/:id"
                            element={<RequireAuth><RecipeDetail /></RequireAuth>}
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Suspense>
            </ErrorBoundary>

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={closeLogin}
                onSwitchToRegister={openRegister}
                onSuccess={handleLoginSuccess}
            />
            <RegisterModal
                isOpen={isRegisterModalOpen}
                onClose={closeRegister}
                onSwitchToLogin={openLogin}
                onSuccess={handleRegisterSuccess}
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
