import { Button, Textarea } from "@heroui/react";

interface PreparationEditorProps {
    instructions: string;
    setInstructions: (val: string) => void;
}

const PreparationEditor = ({ instructions, setInstructions }: PreparationEditorProps) => {
    return (
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
    );
};

export default PreparationEditor;
