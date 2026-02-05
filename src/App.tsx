import { useState, useMemo, useCallback, useEffect } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay } from '@dnd-kit/core';
import { Meal, WeeklyPlan, Ingredient } from '@/types';
import { DAYS_OF_WEEK } from '@/utils/constants';
import MealList from '@/features/meals/components/MealList';
import DayColumn from '@/features/planner/components/DayColumn';
import ShoppingList from '@/features/shopping/components/ShoppingList';
import MealCard from '@/features/planner/components/MealCard';
import { AuthProvider, useAuth } from '@/features/auth/context/AuthContext';
import Header from '@/layouts/Header';
import LoginModal from '@/features/auth/components/LoginModal';
import RegisterModal from '@/features/auth/components/RegisterModal';
import * as mealService from '@/features/meals/api/mealService';

const initialWeeklyPlan: WeeklyPlan = DAYS_OF_WEEK.reduce((acc: WeeklyPlan, day: string) => ({ ...acc, [day]: { lunch: [], dinner: [] } }), {});

interface PlannerViewProps {
    onLoginClick: () => void;
}

const PlannerView = ({ onLoginClick }: PlannerViewProps) => {
    const { user } = useAuth();
    const [meals, setMeals] = useState<Meal[]>([]);
    const [isLoadingMeals, setIsLoadingMeals] = useState(true);
    const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>(initialWeeklyPlan);
    const [manualIngredients, setManualIngredients] = useState<Ingredient[]>([]);
    const [ignoredIngredients, setIgnoredIngredients] = useState<string[]>([]);
    const [activeMeal, setActiveMeal] = useState<Meal | null>(null);

    useEffect(() => {
        setIsLoadingMeals(true);
        mealService.getMeals(user?.username || null)
            .then((userMeals: Meal[]) => {
                setMeals(userMeals);
            })
            .catch((error: Error) => console.error("Failed to load meals:", error))
            .finally(() => setIsLoadingMeals(false));
    }, [user]);

    const addMeal = async (meal: Omit<Meal, 'id'>) => {
        if (!user) {
            onLoginClick();
            return;
        }
        try {
            const newMeal = await mealService.addMeal(user.username, meal);
            setMeals(prev => [...prev, newMeal]);
        } catch (error) {
            console.error("Failed to add meal:", error);
            alert("Hubo un error al añadir la comida.");
        }
    };

    const findMealById = useCallback((id: number): Meal | undefined => meals.find(m => m.id === id), [meals]);

    const handleDragStart = (event: DragStartEvent) => {
        const meal = findMealById(Number(event.active.id));
        if (meal) setActiveMeal(meal);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveMeal(null);
        const { active, over } = event;
        const overId = over?.id.toString();

        if (overId && overId.startsWith('day-')) {
            const [, day, mealTime] = overId.split('-') as [string, string, 'lunch' | 'dinner'];
            if (day && mealTime) {
                const mealId = Number(active.id);
                const meal = findMealById(mealId);
                if (meal && !weeklyPlan[day][mealTime].find(m => m.id === mealId)) {
                    setWeeklyPlan(prev => ({
                        ...prev,
                        [day]: { ...prev[day], [mealTime]: [...prev[day][mealTime], meal] }
                    }));
                }
            }
        }
    };

    const removeMealFromDay = (day: string, mealTime: 'lunch' | 'dinner', mealId: number) => {
        setWeeklyPlan(prev => ({
            ...prev,
            [day]: { ...prev[day], [mealTime]: prev[day][mealTime].filter(meal => meal.id !== mealId) }
        }));
    };

    const derivedShoppingList = useMemo(() => {
        const ingredientsMap = new Map<string, string[]>();
        const allMeals = Object.values(weeklyPlan).flatMap((day: WeeklyPlan[string]) => [...day.lunch, ...day.dinner]);

        allMeals.forEach((meal: Meal) => {
            meal.ingredients.forEach(ingredient => {
                const name = ingredient.name.toLowerCase().trim();
                const quantity = ingredient.quantity.trim();
                if (!ingredientsMap.has(name)) {
                    ingredientsMap.set(name, []);
                }
                ingredientsMap.get(name)!.push(quantity);
            });
        });

        return Array.from(ingredientsMap.entries())
            .map(([name, quantities]) => ({
                name: name.charAt(0).toUpperCase() + name.slice(1),
                quantities,
            }))
            .filter(ing => !ignoredIngredients.includes(ing.name.toLowerCase()))
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [weeklyPlan, ignoredIngredients]);

    const addManualIngredient = (ingredient: Ingredient) => {
        setManualIngredients(prev => [...prev, ingredient]);
    };

    const removeManualIngredient = (index: number) => {
        setManualIngredients(prev => prev.filter((_, i) => i !== index));
    };

    const removeDerivedIngredient = (name: string) => {
        setIgnoredIngredients(prev => [...prev, name.toLowerCase()]);
    };

    const savePlan = () => {
        localStorage.setItem('weeklyMealPlan', JSON.stringify(weeklyPlan));
        alert('¡Plan guardado con éxito!');
    };

    const loadPlan = () => {
        const savedPlan = localStorage.getItem('weeklyMealPlan');
        if (savedPlan) {
            setWeeklyPlan(JSON.parse(savedPlan) as WeeklyPlan);
            alert('¡Plan cargado correctamente!');
        } else {
            alert('No se encontró ningún plan guardado.');
        }
    };

    const handlePrint = () => {
        window.print();
    };


    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <main className="flex flex-1 overflow-hidden">
                {/* Left Sidebar: Recipe Library */}
                <aside className="w-80 flex flex-col border-r border-[#f1f0f4] dark:border-white/10 bg-white dark:bg-background-dark overflow-y-auto shrink-0 transition-all no-print">
                    <MealList
                        meals={meals}
                        addMeal={addMeal}
                        onLoginClick={onLoginClick}
                        isLoading={isLoadingMeals}
                    />
                </aside>

                {/* Main Content: Weekly Planner */}
                <section className="flex-1 flex flex-col bg-[#f8f9fc] dark:bg-[#0c0a18] p-8 overflow-y-auto">
                    <div className="flex justify-between items-end mb-8 no-print">
                        <div>
                            <h2 className="text-3xl font-extrabold text-[#121118] dark:text-white tracking-tight">Planificador Semanal</h2>
                            <p className="text-[#686189] text-base font-medium mt-1">Organiza tus comidas, simplifica tus compras.</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={savePlan} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200">
                                <span className="material-symbols-outlined text-[20px]">save</span>
                                Guardar Plan
                            </button>
                            <button onClick={loadPlan} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 transition-all">
                                <span className="material-symbols-outlined text-[20px]">file_open</span>
                                Cargar Plan
                            </button>
                            <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 transition-all">
                                <span className="material-symbols-outlined text-[20px]">print</span>
                                Imprimir
                            </button>
                        </div>
                    </div>

                    <div id="printable-area" className="printable-main-content grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-6 flex-1 min-h-[700px]">
                        {DAYS_OF_WEEK.map((day: string) => (
                            <div key={day} className="flex flex-col gap-6">
                                <DayColumn day={day} meals={weeklyPlan[day]} onRemoveMeal={removeMealFromDay} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Right Sidebar: Shopping List */}
                <aside className="w-80 flex flex-col border-l border-[#f1f0f4] dark:border-white/10 bg-white dark:bg-background-dark overflow-y-auto shrink-0 transition-all no-print">
                    <ShoppingList
                        derivedIngredients={derivedShoppingList}
                        manualIngredients={manualIngredients}
                        onAddIngredient={addManualIngredient}
                        onRemoveManualIngredient={removeManualIngredient}
                        onRemoveDerivedIngredient={removeDerivedIngredient}
                    />
                </aside>
            </main>

            <DragOverlay>
                {activeMeal ? <MealCard meal={activeMeal} isOverlay={true} /> : null}
            </DragOverlay>
        </DndContext>
    );
};


const AppContent = () => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

    const openLogin = () => {
        setRegisterModalOpen(false);
        setLoginModalOpen(true);
    };

    const openRegister = () => {
        setLoginModalOpen(false);
        setRegisterModalOpen(true);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header onLoginClick={openLogin} onRegisterClick={openRegister} />
            <PlannerView onLoginClick={openLogin} />
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setLoginModalOpen(false)}
                onSwitchToRegister={openRegister}
            />
            <RegisterModal
                isOpen={isRegisterModalOpen}
                onClose={() => setRegisterModalOpen(false)}
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