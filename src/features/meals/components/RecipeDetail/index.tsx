import { Button, Card, CardBody, Chip, Checkbox, Image, Divider, CircularProgress } from "@heroui/react";
import { useRecipeDetail } from './useRecipeDetail';
import { NavLink, useNavigate } from 'react-router-dom';

const RecipeDetail = () => {
    const { meal, isLoading, deleteRecipe } = useRecipeDetail();
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (confirm('¿Estás seguro de que quieres eliminar esta receta? Esta acción no se puede deshacer.')) {
            const success = await deleteRecipe();
            if (success) {
                navigate('/recetas');
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-20 gap-4">
                <CircularProgress size="lg" aria-label="Cargando receta..." />
                <p className="font-black text-default-400 uppercase tracking-widest text-sm">Preparando los fogones...</p>
            </div>
        );
    }

    if (!meal) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-20 gap-6">
                <span className="material-symbols-outlined text-[64px] text-default-200">restaurant</span>
                <div className="text-center">
                    <h2 className="text-2xl font-black text-foreground">Receta no encontrada</h2>
                    <p className="text-default-500 mt-2 font-medium">Parece que este plato se ha escapado del menú.</p>
                </div>
                <Button color="primary" variant="flat" onPress={() => navigate('/recetas')} className="font-bold">
                    Volver al recetario
                </Button>
            </div>
        );
    }

    const imageUrl = `https://loremflickr.com/800/600/food,recipe?lock=${meal.id}`;

    return (
        <main className="max-w-[1400px] mx-auto p-4 md:p-10 w-full animate-in fade-in duration-500">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 mb-8 no-print">
                <NavLink to="/recetas" className="text-default-400 hover:text-primary text-sm font-bold flex items-center gap-2 transition-colors">
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Recetas
                </NavLink>
                <span className="text-default-300 text-sm font-bold">/</span>
                <span className="text-default-500 text-sm font-bold truncate">{meal.name}</span>
            </nav>

            {/* Recipe Content Container */}
            <Card className="border-none bg-white dark:bg-slate-900 shadow-2xl overflow-hidden rounded-[2.5rem]">
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
                    {/* Left Column: Visuals & Ingredients */}
                    <div className="lg:col-span-5 border-r border-divider bg-default-50/30">
                        <div className="h-80 lg:h-[400px] w-full overflow-hidden">
                            <Image
                                isZoomed
                                alt={meal.name}
                                className="w-full h-full object-cover"
                                src={imageUrl}
                                radius="none"
                            />
                        </div>
                        <div className="p-8 md:p-10">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary text-lg font-bold">shopping_basket</span>
                                    </div>
                                    <h3 className="text-xl font-black dark:text-white">Ingredientes</h3>
                                </div>
                                <Button size="sm" variant="light" color="primary" className="font-bold text-xs uppercase tracking-widest px-0 min-w-0" startContent={<span className="material-symbols-outlined text-sm">add_shopping_cart</span>}>
                                    Añadir todo
                                </Button>
                            </div>
                            <div className="space-y-3">
                                {meal.ingredients.map((ing, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white dark:hover:bg-slate-800 transition-all border border-transparent hover:border-divider group">
                                        <Checkbox color="primary" radius="full" />
                                        <div className="flex-1 flex justify-between items-center pr-2">
                                            <span className="text-default-700 dark:text-gray-300 font-bold text-sm">{ing.name}</span>
                                            <span className="font-black text-primary text-xs bg-primary/5 px-3 py-1 rounded-full">{ing.quantity}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Instructions & Stats */}
                    <div className="lg:col-span-7 p-8 md:p-12 flex flex-col bg-white dark:bg-slate-900">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
                            <div className="space-y-3">
                                <div className="flex flex-wrap gap-2">
                                    {meal.type.map(t => (
                                        <Chip key={t} size="sm" variant="flat" color="primary" className="text-[10px] uppercase font-black tracking-widest h-6">
                                            {t}
                                        </Chip>
                                    ))}
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight">{meal.name}</h1>
                                <p className="text-default-500 text-lg font-medium max-w-2xl leading-relaxed">
                                    Una opción nutritiva y equilibrada, perfecta para organizar tu menú semanal con sabor y salud.
                                </p>
                            </div>
                            <div className="flex gap-2 no-print shrink-0">
                                <Button
                                    isIconOnly
                                    radius="full"
                                    variant="flat"
                                    className="bg-default-100 hover:text-danger transition-colors"
                                    onPress={handleDelete}
                                >
                                    <span className="material-symbols-outlined">delete</span>
                                </Button>
                                <Button isIconOnly radius="full" variant="flat" className="bg-default-100 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined">share</span>
                                </Button>
                                <Button isIconOnly radius="full" variant="flat" className="bg-default-100 text-danger transition-colors">
                                    <span className="material-symbols-outlined !fill-current">favorite</span>
                                </Button>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                            {[
                                { label: 'Prep Time', value: '25 mins', icon: 'timer' },
                                { label: 'Raciones', value: '2 Pers.', icon: 'group' },
                                { label: 'Calorías', value: '450 kcal', icon: 'local_fire_department' },
                                { label: 'Proteína', value: '28g', icon: 'fitness_center' }
                            ].map((stat, i) => (
                                <div key={i} className="bg-default-50/50 dark:bg-slate-800/50 border border-divider p-5 rounded-3xl text-center hover:border-primary/50 transition-colors">
                                    <span className="material-symbols-outlined text-primary mb-2 text-2xl">{stat.icon}</span>
                                    <p className="text-[10px] text-default-400 font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                                    <p className="text-lg font-black dark:text-white">{stat.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Instructions */}
                        <div className="flex-grow">
                            <h3 className="text-2xl font-black dark:text-white mb-8 flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                    <span className="material-symbols-outlined">restaurant_menu</span>
                                </div>
                                Preparación
                            </h3>
                            <div className="space-y-10 relative pl-4 border-l-2 border-divider ml-5">
                                {[
                                    { title: 'Preparar ingredientes', text: 'Lava y trocea todos los ingredientes necesarios. Asegúrate de tener todo a mano antes de empezar a cocinar.' },
                                    { title: 'Cocción principal', text: 'Calienta la sartén o olla a fuego medio y cocina siguiendo el orden tradicional de los ingredientes.' },
                                    { title: 'Rectificar sabor', text: 'Prueba la elaboración y añade sal, especias o condimentos al gusto para conseguir el punto perfecto.' }
                                ].map((step, i) => (
                                    <div key={i} className="relative group">
                                        <div className="absolute -left-[37px] top-0 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-primary text-primary flex items-center justify-center font-black text-sm group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                            {i + 1}
                                        </div>
                                        <h4 className="font-black text-foreground mb-2 text-xl tracking-tight">{step.title}</h4>
                                        <p className="text-default-500 font-medium leading-relaxed">
                                            {step.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-16 pt-10 border-t border-divider flex flex-col sm:flex-row gap-4 no-print">
                            <Button
                                color="primary"
                                size="lg"
                                className="flex-1 font-black h-14 text-sm shadow-xl shadow-primary/20"
                                startContent={<span className="material-symbols-outlined font-bold">calendar_add_on</span>}
                            >
                                Añadir al Plan Semanal
                            </Button>
                            <Button
                                variant="bordered"
                                size="lg"
                                className="flex-1 font-black h-14 text-sm border-2"
                                startContent={<span className="material-symbols-outlined font-bold">edit</span>}
                            >
                                Editar Receta
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Footer / Nutritional Summary Details */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 no-print">
                <Card className="shadow-none border border-divider bg-white/50 dark:bg-slate-900/50 p-2">
                    <CardBody className="p-6">
                        <h5 className="text-[10px] font-black text-default-400 uppercase tracking-widest mb-6">Nutrición Detallada</h5>
                        <div className="space-y-4">
                            {[
                                { name: 'Grasas Totales', val: '22g' },
                                { name: 'Carbohidratos', val: '12g' },
                                { name: 'Fibra', val: '4g' },
                                { name: 'Sodio', val: '240mg' }
                            ].map((n, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-default-500">{n.name}</span>
                                    <span className="text-sm font-black dark:text-white">{n.val}</span>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>

                <Card className="shadow-none border border-divider bg-white/50 dark:bg-slate-900/50 p-2">
                    <CardBody className="p-6">
                        <h5 className="text-[10px] font-black text-default-400 uppercase tracking-widest mb-6">Consejos de Cocina</h5>
                        <div className="space-y-4">
                            <div className="flex gap-4 p-3 rounded-2xl bg-primary/5 border border-primary/10">
                                <span className="material-symbols-outlined text-primary font-black">lightbulb</span>
                                <p className="text-sm font-bold text-default-600 leading-snug">Sincroniza la temperatura de los ingredientes antes de empezar.</p>
                            </div>
                            <div className="flex gap-4 p-3 rounded-2xl bg-primary/5 border border-primary/10">
                                <span className="material-symbols-outlined text-primary font-black">restaurant</span>
                                <p className="text-sm font-bold text-default-600 leading-snug">Acompaña con quinoa para un aporte extra de fibra y textura.</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card className="shadow-none border border-divider bg-primary text-white p-2 overflow-hidden relative">
                    <div className="absolute -right-4 -top-4 opacity-10">
                        <span className="material-symbols-outlined text-[120px] rotate-12">play_circle</span>
                    </div>
                    <CardBody className="p-6 flex flex-col items-center justify-center text-center">
                        <h5 className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-4">Modo Cocinado</h5>
                        <Button variant="solid" className="w-full bg-white text-primary font-black h-12 rounded-xl mb-4" startContent={<span className="material-symbols-outlined">play_circle</span>}>
                            Iniciar Guía Paso a Paso
                        </Button>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-white/50">Control por voz manos libres disponible</p>
                    </CardBody>
                </Card>
            </div>
        </main>
    );
};

export default RecipeDetail;
