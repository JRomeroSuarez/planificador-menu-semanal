import { Input, Button } from "@heroui/react";
import { useNavigate } from 'react-router-dom';
import { useRecipesCatalog } from './useRecipesCatalog';
import CatalogCard from './CatalogCard';
import { MEAL_TYPES } from '@/utils/constants';

const RecipesCatalog = () => {
    const navigate = useNavigate();
    const {
        filteredMeals,
        isLoading,
        searchTerm,
        setSearchTerm,
        activeFilter,
        setActiveFilter,
    } = useRecipesCatalog();

    return (
        <div className="flex flex-1 overflow-hidden bg-cream dark:bg-[#211E1A]">
            {/* Sidebar */}
            <aside className="hidden lg:flex w-64 flex-col border-r border-[#EAE1CE] dark:border-white/5 bg-white/60 dark:bg-white/[0.02] p-6 gap-8 overflow-y-auto shrink-0 transition-all no-print">
                <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-semibold text-ink/40 dark:text-cream/40">Filtros</h3>
                    <button
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all ${activeFilter === 'Todos' ? 'bg-terracotta/10 text-terracotta font-semibold' : 'text-ink/55 dark:text-cream/55 hover:bg-[#F2EADB] dark:hover:bg-white/5 font-medium'}`}
                        onClick={() => setActiveFilter('Todos')}
                    >
                        <span className="material-symbols-outlined text-[20px]">menu_book</span>
                        <span className="text-sm">Todo el recetario</span>
                    </button>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-semibold text-ink/40 dark:text-cream/40">Categorías</h3>
                    <div className="flex flex-wrap gap-2">
                        {MEAL_TYPES.map(type => (
                            <button
                                key={type}
                                onClick={() => setActiveFilter(type)}
                                className={`px-3 py-1.5 text-[12px] rounded-full font-medium transition-all border ${activeFilter === type
                                    ? 'bg-terracotta text-white border-terracotta'
                                    : 'bg-white dark:bg-white/5 text-ink/55 dark:text-cream/55 border-[#E2D7C0] dark:border-white/10 hover:border-terracotta/50'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 flex flex-col p-6 lg:p-10 gap-7 overflow-y-auto w-full max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink dark:text-cream">Mis recetas</h1>
                        <p className="text-ink/45 dark:text-cream/45 text-sm font-medium">
                            {filteredMeals.length} {filteredMeals.length === 1 ? 'receta' : 'recetas'}
                            {activeFilter !== 'Todos' ? ` en ${activeFilter}` : ''}
                        </p>
                    </div>
                    <Button
                        onPress={() => navigate('/recetas/nueva')}
                        color="primary"
                        radius="full"
                        className="font-semibold shadow-soft"
                        startContent={<span className="material-symbols-outlined">add</span>}
                    >
                        Nueva receta
                    </Button>
                </div>

                <div className="bg-white dark:bg-white/[0.04] p-2 rounded-2xl shadow-card border border-[#EFE8D8] dark:border-white/10 flex items-center">
                    <Input
                        isClearable
                        className="w-full"
                        size="lg"
                        variant="flat"
                        placeholder="Buscar por nombre, ingrediente o tipo..."
                        value={searchTerm}
                        onValueChange={setSearchTerm}
                        startContent={<span className="material-symbols-outlined text-ink/35">search</span>}
                        classNames={{
                            inputWrapper: "bg-transparent shadow-none",
                        }}
                    />
                </div>

                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="font-medium text-ink/40 animate-pulse text-sm">Cargando recetas...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                        {filteredMeals.map(meal => (
                            <CatalogCard key={meal.id} meal={meal} />
                        ))}

                        {filteredMeals.length === 0 && (
                            <div className="col-span-full py-24 text-center">
                                <span className="material-symbols-outlined text-[56px] text-ink/15 dark:text-cream/15 mb-3 block">skillet</span>
                                <p className="text-ink/40 dark:text-cream/40 font-medium text-sm">No se encontraron recetas</p>
                                <Button
                                    onPress={() => navigate('/recetas/nueva')}
                                    color="primary"
                                    variant="flat"
                                    radius="full"
                                    size="sm"
                                    className="mt-5 font-semibold text-terracotta"
                                    startContent={<span className="material-symbols-outlined text-[18px]">add</span>}
                                >
                                    Crear la primera
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default RecipesCatalog;
