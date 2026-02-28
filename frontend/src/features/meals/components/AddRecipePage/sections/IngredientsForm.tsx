import { Input, Button } from "@heroui/react";
import { Ingredient } from "@/types";

interface IngredientsFormProps {
    ingredients: Ingredient[];
    onAdd: () => void;
    onRemove: (idx: number) => void;
    onChange: (idx: number, field: keyof Ingredient, value: string) => void;
}

const IngredientsForm = ({ ingredients, onAdd, onRemove, onChange }: IngredientsFormProps) => {
    return (
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
                            onValueChange={(val) => onChange(idx, 'quantity', val)}
                        />
                        <Input
                            placeholder="Nombre del ingrediente"
                            className="flex-1 font-bold"
                            variant="bordered"
                            value={ing.name}
                            onValueChange={(val) => onChange(idx, 'name', val)}
                        />
                        <Button
                            isIconOnly
                            variant="light"
                            color="danger"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onPress={() => onRemove(idx)}
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
                    onPress={onAdd}
                    startContent={<span className="material-symbols-outlined">add</span>}
                >
                    Añadir Ingrediente
                </Button>
            </div>
        </section>
    );
};

export default IngredientsForm;
