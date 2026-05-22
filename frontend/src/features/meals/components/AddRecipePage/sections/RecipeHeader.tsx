import { Button, Progress } from "@heroui/react";
import { useNavigate } from "react-router-dom";

interface RecipeHeaderProps {
    isEditing: boolean;
    progress: number;
    onSave: () => void;
}

const RecipeHeader = ({ isEditing, progress, onSave }: RecipeHeaderProps) => {
    const navigate = useNavigate();

    return (
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-3 max-w-2xl w-full">
                <div className="flex justify-between items-end mb-1">
                    <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink dark:text-cream">{isEditing ? 'Editar receta' : 'Nueva receta'}</h1>
                    <div className="text-right">
                        <p className="text-ink/40 dark:text-cream/40 text-xs font-medium">Progreso</p>
                        <p className="text-terracotta text-sm font-semibold">{progress}% completado</p>
                    </div>
                </div>
                <Progress
                    value={progress}
                    color="primary"
                    size="md"
                    radius="full"
                    className="h-2"
                />
                <div className="flex justify-between text-[11px] font-medium text-ink/40 dark:text-cream/40 px-1">
                    <span className={progress >= 20 ? "text-terracotta" : ""}>Básico</span>
                    <span className={progress >= 60 ? "text-terracotta" : ""}>Ingredientes</span>
                    <span className={progress >= 100 ? "text-terracotta" : ""}>Instrucciones</span>
                </div>
            </div>
            <div className="flex gap-3 shrink-0">
                <Button variant="bordered" radius="full" className="font-semibold border-[#D8CDB6] dark:border-white/15 h-12 px-6 text-ink dark:text-cream" onPress={() => navigate('/recetas')}>Descartar</Button>
                <Button color="primary" radius="full" className="font-semibold h-12 px-8 shadow-soft" onPress={onSave}>{isEditing ? 'Actualizar' : 'Guardar receta'}</Button>
            </div>
        </div>
    );
};

export default RecipeHeader;
