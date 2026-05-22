import { useState } from 'react';
import { Button, Card, Chip, Checkbox, Image, CircularProgress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { useRecipeDetail } from './useRecipeDetail';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useShoppingListStore } from "@/features/shopping/store/useShoppingListStore";

const RecipePlaceholder = ({ name }: { name: string }) => (
    <div className="w-full h-full bg-gradient-to-br from-terracotta/15 via-mustard/10 to-olive/10 flex items-center justify-center">
        <div className="text-center px-4">
            <span className="material-symbols-outlined text-terracotta/40 text-[64px]">restaurant</span>
            <p className="font-display text-base font-semibold text-terracotta/50 mt-2">{name}</p>
        </div>
    </div>
);

const RecipeDetail = () => {
    const { meal, isLoading, deleteRecipe } = useRecipeDetail();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const addItem = useShoppingListStore(state => state.addItem);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [addedToList, setAddedToList] = useState(false);

    const handleAddIngredientsToShoppingList = () => {
        if (!meal) return;
        meal.ingredients.forEach(ing => addItem(ing.name, ing.quantity));
        setAddedToList(true);
        setTimeout(() => setAddedToList(false), 2000);
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        const success = await deleteRecipe();
        setIsDeleting(false);
        if (success) {
            navigate('/recetas');
        }
    };

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-20 gap-4">
                <CircularProgress size="lg" aria-label="Cargando receta..." />
                <p className="font-black text-default-400 uppercase tracking-widest text-sm">Cargando...</p>
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
                <Button color="primary" variant="flat" onPress={() => navigate('/recetas')} className="font-bold text-terracotta">
                    Volver al recetario
                </Button>
            </div>
        );
    }

    return (
        <main className="max-w-[1400px] mx-auto p-4 md:p-10 w-full animate-in fade-in duration-500">
            <nav className="flex items-center gap-2 mb-8 no-print">
                <NavLink to="/recetas" className="text-default-400 hover:text-primary text-sm font-bold flex items-center gap-2 transition-colors">
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Recetario
                </NavLink>
                <span className="text-default-300 text-sm font-bold">/</span>
                <span className="text-default-500 text-sm font-bold truncate">{meal.name}</span>
            </nav>

            <Card className="border border-[#EFE8D8] dark:border-white/10 bg-white dark:bg-white/[0.04] shadow-soft overflow-hidden rounded-[2rem]">
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
                    {/* Left: Image & Ingredients */}
                    <div className="lg:col-span-5 border-r border-[#EFE8D8] dark:border-white/10 bg-[#FCFAF4] dark:bg-transparent">
                        <div className="h-72 lg:h-[400px] w-full overflow-hidden">
                            {meal.imageUrl ? (
                                <Image
                                    isZoomed
                                    alt={meal.name}
                                    className="w-full h-full object-cover"
                                    src={meal.imageUrl}
                                    radius="none"
                                />
                            ) : (
                                <RecipePlaceholder name={meal.name} />
                            )}
                        </div>
                        <div className="p-8 md:p-10">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-terracotta/10 rounded-xl flex items-center justify-center">
                                        <span className="material-symbols-outlined text-terracotta text-[18px]">shopping_basket</span>
                                    </div>
                                    <h3 className="font-display text-xl font-semibold text-ink dark:text-cream">Ingredientes</h3>
                                </div>
                                <Button
                                    size="sm"
                                    variant={addedToList ? "solid" : "light"}
                                    color="primary"
                                    radius="full"
                                    className="font-semibold text-xs px-3"
                                    startContent={
                                        <span className="material-symbols-outlined text-sm">
                                            {addedToList ? 'check' : 'add_shopping_cart'}
                                        </span>
                                    }
                                    onPress={handleAddIngredientsToShoppingList}
                                >
                                    {addedToList ? 'Añadido' : 'Añadir todo'}
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {meal.ingredients.map((ing, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-3.5 rounded-2xl hover:bg-white dark:hover:bg-white/5 transition-all border border-transparent hover:border-[#EFE8D8] dark:hover:border-white/10">
                                        <Checkbox color="primary" radius="full" />
                                        <div className="flex-1 flex justify-between items-center pr-2">
                                            <span className="text-ink/80 dark:text-cream/80 font-medium text-sm">{ing.name}</span>
                                            <span className="font-semibold text-terracotta text-xs bg-terracotta/[0.08] px-3 py-1 rounded-full">{ing.quantity}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Title, Stats & Instructions */}
                    <div className="lg:col-span-7 p-8 md:p-12 flex flex-col bg-white dark:bg-transparent">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-9">
                            <div className="space-y-3">
                                <div className="flex flex-wrap gap-2">
                                    {meal.type.map(t => (
                                        <Chip key={t} size="sm" variant="flat" color="primary" className="text-[11px] font-medium h-6">
                                            {t}
                                        </Chip>
                                    ))}
                                </div>
                                <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink dark:text-cream leading-tight">{meal.name}</h1>
                            </div>
                            <div className="flex gap-2 no-print shrink-0">
                                <Button
                                    isIconOnly
                                    radius="full"
                                    variant="flat"
                                    className="bg-[#F2EADB] dark:bg-white/5 text-ink/50 hover:text-terracotta transition-colors"
                                    onPress={() => setIsDeleteModalOpen(true)}
                                    title="Eliminar receta"
                                >
                                    <span className="material-symbols-outlined">delete</span>
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-9">
                            <div className="bg-[#FCFAF4] dark:bg-white/[0.03] border border-[#EFE8D8] dark:border-white/10 p-5 rounded-3xl text-center">
                                <span className="material-symbols-outlined text-terracotta mb-1.5 text-2xl">timer</span>
                                <p className="text-[11px] text-ink/40 dark:text-cream/40 font-medium mb-0.5">Tiempo</p>
                                <p className="font-display text-lg font-semibold text-ink dark:text-cream">{meal.prepTime ? `${meal.prepTime} min` : '—'}</p>
                            </div>
                            <div className="bg-[#FCFAF4] dark:bg-white/[0.03] border border-[#EFE8D8] dark:border-white/10 p-5 rounded-3xl text-center">
                                <span className="material-symbols-outlined text-terracotta mb-1.5 text-2xl">group</span>
                                <p className="text-[11px] text-ink/40 dark:text-cream/40 font-medium mb-0.5">Raciones</p>
                                <p className="font-display text-lg font-semibold text-ink dark:text-cream">{meal.servings ? `${meal.servings} pers.` : '—'}</p>
                            </div>
                        </div>

                        <div className="flex-grow">
                            <h3 className="font-display text-xl font-semibold text-ink dark:text-cream mb-5 flex items-center gap-3">
                                <div className="w-9 h-9 bg-terracotta rounded-2xl flex items-center justify-center text-white shadow-soft">
                                    <span className="material-symbols-outlined text-[18px]">restaurant</span>
                                </div>
                                Preparación
                            </h3>
                            <div className="whitespace-pre-wrap text-ink/65 dark:text-cream/65 leading-relaxed text-sm">
                                {meal.instructions || 'No hay instrucciones para esta receta.'}
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-[#EFE8D8] dark:border-white/10 flex flex-col sm:flex-row gap-4 no-print">
                            <Button
                                variant="bordered"
                                size="lg"
                                radius="full"
                                className="flex-1 font-semibold text-sm border-[#D8CDB6] dark:border-white/15 text-ink dark:text-cream"
                                startContent={<span className="material-symbols-outlined">edit</span>}
                                onClick={() => navigate(`/recetas/editar/${id}`)}
                            >
                                Editar receta
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Delete confirmation modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} placement="center" backdrop="blur">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Eliminar receta</ModalHeader>
                            <ModalBody>
                                <p className="text-default-500">
                                    ¿Seguro que quieres eliminar <span className="font-bold text-foreground">"{meal.name}"</span>? Esta acción no se puede deshacer.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="flat" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button
                                    color="danger"
                                    onPress={handleDelete}
                                    isLoading={isDeleting}
                                    className="font-bold"
                                >
                                    Eliminar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </main>
    );
};

export default RecipeDetail;
