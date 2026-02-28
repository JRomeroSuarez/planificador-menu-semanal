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
                <Button color="primary" className="font-black h-12 px-8 shadow-xl shadow-primary/20" onPress={onSave}>{isEditing ? 'Actualizar Receta' : 'Guardar Receta'}</Button>
            </div>
        </div>
    );
};

export default RecipeHeader;
