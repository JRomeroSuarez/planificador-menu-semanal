import { Input, Button, Progress, Card, CardBody, Select, SelectItem, Textarea, Divider, Chip, CircularProgress } from "@heroui/react";
import { useAddRecipePage } from './useAddRecipePage';
import { MEAL_TYPES } from '@/utils/constants';
import { useNavigate } from "react-router-dom";

const AddRecipePage = () => {
    const navigate = useNavigate();
    const {
        name,
        setName,
        types,
        setTypes,
        prepTime,
        setPrepTime,
        servings,
        setServings,
        ingredients,
        handleAddIngredient,
        handleRemoveIngredient,
        handleIngredientChange,
        instructions,
        setInstructions,
        progress,
        handleSubmit,
        isEditing,
        isLoading
    } = useAddRecipePage();

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-20 gap-4">
                <CircularProgress size="lg" aria-label="Cargando..." />
                <p className="font-black text-default-400 uppercase tracking-widest text-sm">Cargando receta...</p>
            </div>
        );
    }

    return (
        <main className="flex-1 max-w-[1280px] mx-auto w-full p-4 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header / Meta */}
            <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-3 max-w-2xl w-full">
                    <div className="flex justify-between items-end mb-1">
                        <h1 className="text-4xl font-black tracking-tight text-foreground">{isEditing ? 'Editar Receta' : 'Crear Nueva Receta'}</h1>
                        <div className="text-right">
                            <p className="text-default-400 text-[10px] font-black uppercase tracking-[0.2em]">Progreso</p>
                            <p className="text-primary text-sm font-black">{progress}% Completado</p>
                        </div>
                    </div>
                    <Progress
                        value={progress}
                        color="primary"
                        size="md"
                        radius="full"
                        className="h-2.5 shadow-sm"
                        classNames={{
                            indicator: "bg-primary shadow-[0_0_15px_rgba(37,19,236,0.3)]"
                        }}
                    />
                    <div className="flex justify-between text-[10px] font-black text-default-400 uppercase tracking-widest px-1">
                        <span className={progress >= 20 ? "text-primary" : ""}>Básico</span>
                        <span className={progress >= 60 ? "text-primary" : ""}>Ingredientes</span>
                        <span className={progress >= 100 ? "text-primary" : ""}>Instrucciones</span>
                    </div>
                </div>
                <div className="flex gap-3 shrink-0">
                    <Button variant="bordered" className="font-bold border-2 h-12 px-6" onPress={() => navigate('/recetas')}>Descartar</Button>
                    <Button color="primary" className="font-black h-12 px-8 shadow-xl shadow-primary/20" onPress={handleSubmit}>{isEditing ? 'Actualizar Receta' : 'Guardar Receta'}</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column: Metadata & Photo */}
                <div className="lg:col-span-5 flex flex-col gap-10">
                    {/* Image Placeholder */}
                    <Card className="border-none bg-default-100/50 dark:bg-white/5 h-64 shadow-none group cursor-pointer overflow-hidden rounded-[2rem]">
                        <CardBody className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-default-300 group-hover:border-primary transition-all m-2 rounded-[1.5rem]">
                            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-default-400 group-hover:text-primary text-3xl">add_a_photo</span>
                            </div>
                            <div className="text-center">
                                <p className="text-default-600 font-black text-sm">Añadir foto principal</p>
                                <p className="text-default-400 text-[10px] mt-1 font-bold uppercase tracking-widest">JPG o PNG (máx 5MB)</p>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Basic Info */}
                    <section className="bg-white dark:bg-slate-900 border border-divider p-8 rounded-[2rem] shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-lg font-bold">info</span>
                            </div>
                            <h3 className="text-lg font-black uppercase tracking-tight">Información Básica</h3>
                        </div>
                        <div className="space-y-6">
                            <Input
                                label="Título de la receta"
                                placeholder="Ej: Lasaña de berenjena de la abuela"
                                labelPlacement="outside"
                                variant="bordered"
                                className="font-bold"
                                value={name}
                                onValueChange={setName}
                            />

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-default-600 ml-1">Categorías</label>
                                <Select
                                    placeholder="Selecciona categorías"
                                    selectionMode="multiple"
                                    variant="bordered"
                                    selectedKeys={types}
                                    onSelectionChange={(keys) => setTypes(keys as Set<string>)}
                                    className="font-bold"
                                >
                                    {MEAL_TYPES.map((type) => (
                                        <SelectItem key={type} className="font-bold">
                                            {type}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <Input
                                    type="number"
                                    label="Preparación (min)"
                                    placeholder="20"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    className="font-bold"
                                    value={prepTime}
                                    onValueChange={setPrepTime}
                                />
                                <Input
                                    type="number"
                                    label="Raciones"
                                    placeholder="4"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    className="font-bold"
                                    value={servings}
                                    onValueChange={setServings}
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Ingredients & Instructions */}
                <div className="lg:col-span-7 flex flex-col gap-10">
                    {/* Ingredients Section */}
                    <section className="bg-white dark:bg-slate-900 border border-divider p-8 rounded-[2rem] shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-lg font-bold">list_alt</span>
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight">Ingredientes</h3>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {ingredients.map((ing, idx) => (
                                <div key={idx} className="flex gap-3 group">
                                    <Input
                                        placeholder="200g"
                                        className="w-24 font-bold"
                                        variant="bordered"
                                        value={ing.quantity}
                                        onValueChange={(val) => handleIngredientChange(idx, 'quantity', val)}
                                    />
                                    <Input
                                        placeholder="Nombre del ingrediente"
                                        className="flex-1 font-bold"
                                        variant="bordered"
                                        value={ing.name}
                                        onValueChange={(val) => handleIngredientChange(idx, 'name', val)}
                                    />
                                    <Button
                                        isIconOnly
                                        variant="light"
                                        color="danger"
                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                        onPress={() => handleRemoveIngredient(idx)}
                                        isDisabled={ingredients.length === 1}
                                    >
                                        <span className="material-symbols-outlined">delete</span>
                                    </Button>
                                </div>
                            ))}
                            <Button
                                fullWidth
                                variant="flat"
                                className="mt-4 font-black border-2 border-dashed border-default-200 h-12 rounded-2xl text-default-500 hover:text-primary hover:border-primary transition-all"
                                onPress={handleAddIngredient}
                                startContent={<span className="material-symbols-outlined">add</span>}
                            >
                                Añadir Ingrediente
                            </Button>
                        </div>
                    </section>

                    {/* Instructions Section */}
                    <section className="bg-white dark:bg-slate-900 border border-divider p-8 rounded-[2rem] shadow-sm flex flex-col min-h-[500px]">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-lg font-bold">skillet</span>
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight">Preparación</h3>
                            </div>
                            <div className="flex bg-default-100 p-1 rounded-xl">
                                <Button size="sm" className="bg-white shadow-sm font-black text-[10px]">EDITOR</Button>
                                <Button size="sm" variant="light" className="text-default-400 font-bold text-[10px]">MD</Button>
                            </div>
                        </div>

                        <div className="mb-4 flex gap-1 border-b border-divider pb-4">
                            {['format_bold', 'format_italic', 'format_list_numbered', 'image'].map(icon => (
                                <Button key={icon} isIconOnly variant="light" radius="lg" size="sm" className="text-default-500">
                                    <span className="material-symbols-outlined text-xl">{icon}</span>
                                </Button>
                            ))}
                            <div className="flex-1"></div>
                        </div>

                        <Textarea
                            placeholder="Empieza describiendo el primer paso: Ej: Precalentar el horno a 180°C..."
                            variant="flat"
                            className="flex-1 h-full"
                            classNames={{
                                input: "text-lg font-medium leading-relaxed resize-none h-full",
                                inputWrapper: "bg-transparent h-full shadow-none p-0"
                            }}
                            value={instructions}
                            onValueChange={setInstructions}
                        />
                    </section>
                </div>
            </div>

            {/* Sticky Footer Status */}
            <footer className="mt-12 flex flex-wrap gap-8 items-center bg-primary/5 rounded-[2rem] p-6 border border-primary/10">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                    <span className="material-symbols-outlined text-lg">history</span>
                    Último guardado: hace 2 mins
                </div>
                <div className="flex items-center gap-2 text-default-500 font-bold text-xs uppercase tracking-widest">
                    <span className="material-symbols-outlined text-lg text-primary">visibility</span>
                    Visibilidad: Pública
                </div>
                <div className="flex items-center gap-2 text-default-500 font-bold text-xs uppercase tracking-widest">
                    <span className="material-symbols-outlined text-lg text-primary">description</span>
                    Lectura est.: 4 min
                </div>
            </footer>
        </main>
    );
};

export default AddRecipePage;
