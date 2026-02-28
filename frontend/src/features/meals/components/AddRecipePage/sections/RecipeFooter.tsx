const RecipeFooter = () => {
    return (
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
    );
};

export default RecipeFooter;
