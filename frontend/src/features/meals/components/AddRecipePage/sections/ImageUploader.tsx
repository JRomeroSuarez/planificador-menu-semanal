import { Card, CardBody } from "@heroui/react";

const ImageUploader = () => {
    return (
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
    );
};

export default ImageUploader;
