import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useUIStore } from '@/store/useUIStore';
import Header from '@/layouts/Header';
import LoginModal from '@/features/auth/components/LoginModal';
import RegisterModal from '@/features/auth/components/RegisterModal';
import PlannerView from '@/features/planner/components/PlannerView';
import RecipesCatalog from '@/features/meals/components/RecipesCatalog';
import RecipeDetail from '@/features/meals/components/RecipeDetail';
import AddRecipePage from '@/features/meals/components/AddRecipePage';

const AppContent = () => {
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

            <Routes>
                <Route path="/" element={<PlannerView />} />
                <Route path="/recetas" element={<RecipesCatalog />} />
                <Route path="/recetas/nueva" element={<AddRecipePage />} />
                <Route path="/recetas/editar/:id" element={<AddRecipePage />} />
                <Route path="/recetas/:id" element={<RecipeDetail />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

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
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
};

export default App;