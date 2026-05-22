import { Card, CardBody } from "@heroui/react";

const ImageUploader = () => {
    return (
        <Card className="border-none bg-[#F2EADB] dark:bg-white/[0.03] h-64 shadow-none group cursor-pointer overflow-hidden rounded-[2rem]">
            <CardBody className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-[#D8CDB6] dark:border-white/15 group-hover:border-terracotta transition-all m-2 rounded-[1.5rem]">
                <div className="w-16 h-16 bg-white dark:bg-white/10 rounded-3xl flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-ink/35 group-hover:text-terracotta text-3xl">add_a_photo</span>
                </div>
                <div className="text-center">
                    <p className="text-ink/70 dark:text-cream/70 font-semibold text-sm">Añadir foto principal</p>
                    <p className="text-ink/40 dark:text-cream/40 text-[11px] mt-1 font-medium">JPG o PNG · máx 5 MB</p>
                </div>
            </CardBody>
        </Card>
    );
};

export default ImageUploader;
