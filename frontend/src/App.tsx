import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/features/auth/context/AuthContext';
import Header from '@/layouts/Header';
import LoginModal from '@/features/auth/components/LoginModal';
import RegisterModal from '@/features/auth/components/RegisterModal';
import PlannerView from '@/features/planner/components/PlannerView';
import RecipesCatalog from '@/features/meals/components/RecipesCatalog';
import RecipeDetail from '@/features/meals/components/RecipeDetail';
import AddRecipePage from '@/features/meals/components/AddRecipePage';
import { useAppModals } from '@/hooks/useAppModals';
import ShoppingListDrawer from '@/features/shopping/components/ShoppingListDrawer';


const AppContent = () => {
    const {
        isLoginModalOpen,
        isRegisterModalOpen,
        isShoppingListOpen,
        openLogin,
        openRegister,
        openShoppingList,
        closeLogin,
        closeRegister,
        closeShoppingList
    } = useAppModals();

    return (
        <div className="flex flex-col min-h-screen">
            <Header
                onLoginClick={openLogin}
                onRegisterClick={openRegister}
                onShoppingListClick={openShoppingList}
            />

            <Routes>
                <Route path="/" element={<PlannerView onLoginClick={openLogin} />} />
                <Route path="/recetas" element={<RecipesCatalog onLoginClick={openLogin} />} />
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

            <ShoppingListDrawer
                isOpen={isShoppingListOpen}
                onClose={closeShoppingList}
            />
        </div>
    );
}


const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;