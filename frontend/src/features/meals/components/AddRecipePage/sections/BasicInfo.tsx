import { Input, Select, SelectItem } from "@heroui/react";
import { MEAL_TYPES } from '@/utils/constants';

interface BasicInfoProps {
    name: string;
    setName: (val: string) => void;
    types: Set<string>;
    setTypes: (keys: Set<string>) => void;
    prepTime: string;
    setPrepTime: (val: string) => void;
    servings: string;
    setServings: (val: string) => void;
}

const BasicInfo = ({ name, setName, types, setTypes, prepTime, setPrepTime, servings, setServings }: BasicInfoProps) => {
    return (
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
    );
};

export default BasicInfo;
