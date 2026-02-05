import { Input, Button, ScrollShadow, Divider, Card, CardBody, Badge } from "@heroui/react";
import { useRecipesCatalog } from './useRecipesCatalog';
import CatalogCard from './CatalogCard';
import { MEAL_TYPES } from '@/utils/constants';

interface RecipesCatalogProps {
    onLoginClick: () => void;
}

const RecipesCatalog = ({ onLoginClick }: RecipesCatalogProps) => {
    const {
        filteredMeals,
        isLoading,
        searchTerm,
        setSearchTerm,
        activeFilter,
        setActiveFilter,
        isAuthenticated
    } = useRecipesCatalog({ onLoginClick });

    return (
        <div className="flex flex-1 overflow-hidden bg-[#f8f9fc] dark:bg-[#0c0a18]">
            {/* Sidebar Navigation */}
            <aside className="hidden lg:flex w-72 flex-col border-r border-[#f1f0f4] dark:border-white/10 bg-white dark:bg-background-dark p-6 gap-8 overflow-y-auto shrink-0 transition-all no-print">
                <div className="flex flex-col gap-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-default-400">Library</h3>
                    <div className="flex flex-col gap-1">
                        <button
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeFilter === 'Todos' ? 'bg-primary/10 text-primary font-bold' : 'text-default-500 hover:bg-default-50 font-medium'}`}
                            onClick={() => setActiveFilter('Todos')}
                        >
                            <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                            <span className="text-sm">Todo el catálogo</span>
                        </button>
                        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-default-500 hover:bg-default-50 transition-all font-medium">
                            <span className="material-symbols-outlined text-[20px]">favorite</span>
                            <span className="text-sm">Favoritos</span>
                        </button>
                        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-default-500 hover:bg-default-50 transition-all font-medium">
                            <span className="material-symbols-outlined text-[20px]">history</span>
                            <span className="text-sm">Añadidos recientemente</span>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-default-400">Categorías</h3>
                    <div className="flex flex-wrap gap-2">
                        {MEAL_TYPES.map(type => (
                            <button
                                key={type}
                                onClick={() => setActiveFilter(type)}
                                className={`px-3 py-1 text-[11px] rounded-lg font-bold transition-all border ${activeFilter === type
                                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                                        : 'bg-white dark:bg-white/5 text-default-500 border-default-200 hover:border-primary/50'
                                    }`}
                            >
                                #{type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-auto p-5 rounded-2xl bg-primary/5 border border-primary/10">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1 font-bold">Pro Feature</p>
                    <p className="text-xs text-default-500 leading-relaxed font-medium">Desbloquea análisis nutricionales avanzados para tus recetas.</p>
                    <Button color="primary" size="sm" className="mt-4 w-full font-bold h-9">Upgrade Now</Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col p-8 lg:p-12 gap-8 overflow-y-auto w-full max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black tracking-tight text-foreground">Explorar Recetas</h1>
                        <p className="text-default-500 text-lg font-medium">Gestiona tu base de datos culinaria definitiva.</p>
                    </div>
                    <Button
                        color="primary"
                        size="lg"
                        className="font-bold shadow-xl shadow-primary/20 h-12"
                        startContent={<span className="material-symbols-outlined">add</span>}
                    >
                        Nueva Receta
                    </Button>
                </div>

                <div className="bg-white dark:bg-slate-900/50 p-2 rounded-2xl shadow-sm border border-divider flex items-center gap-4">
                    <Input
                        isClearable
                        className="w-full"
                        size="lg"
                        variant="flat"
                        placeholder="Buscar por ingrediente, título o tipo..."
                        value={searchTerm}
                        onValueChange={setSearchTerm}
                        startContent={<span className="material-symbols-outlined text-default-400">search</span>}
                        classNames={{
                            inputWrapper: "bg-transparent shadow-none",
                        }}
                    />
                    <div className="h-8 w-px bg-divider mx-2"></div>
                    <div className="flex gap-2 pr-4">
                        <Badge content="2" color="primary" size="sm">
                            <Button isIconOnly variant="flat" size="sm" radius="lg">
                                <span className="material-symbols-outlined text-[20px]">filter_list</span>
                            </Button>
                        </Badge>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="font-bold text-default-400 uppercase tracking-widest animate-pulse">Consultando Biblioteca...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                        {filteredMeals.map(meal => (
                            <CatalogCard key={meal.id} meal={meal} />
                        ))}

                        {filteredMeals.length === 0 && (
                            <div className="col-span-full py-20 text-center">
                                <span className="material-symbols-outlined text-[64px] text-default-200 mb-4 block">search_off</span>
                                <p className="text-default-400 font-bold uppercase tracking-widest">No se encontraron recetas</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default RecipesCatalog;
