interface PlannerActionsProps {
    onSave: () => void;
    onLoad: () => void;
    onPrint: () => void;
    onOpenShoppingList: () => void;
}

const PlannerActions = ({ onSave, onLoad, onPrint, onOpenShoppingList }: PlannerActionsProps) => {
    return (
        <div className="flex justify-between items-end mb-8 no-print">
            <div>
                <h2 className="text-3xl font-extrabold text-[#121118] dark:text-white tracking-tight">Planificador Semanal</h2>
                <p className="text-[#686189] text-base font-medium mt-1">Organiza tus comidas, simplifica tus compras.</p>
            </div>
            <div className="flex gap-3">

                <button
                    onClick={onSave}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200"
                >
                    <span className="material-symbols-outlined text-[20px]">save</span>
                    Guardar Plan
                </button>
                <button
                    onClick={onLoad}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 transition-all"
                >
                    <span className="material-symbols-outlined text-[20px]">file_open</span>
                    Cargar Plan
                </button>
                <button
                    onClick={onPrint}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 transition-all"
                >
                    <span className="material-symbols-outlined text-[20px]">print</span>
                    Imprimir
                </button>
                <button
                    onClick={onOpenShoppingList}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-50 text-primary text-sm font-semibold hover:bg-primary-100 transition-all border border-primary-100"
                >
                    <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                    Lista de compra
                </button>
            </div>
        </div>
    );
};

export default PlannerActions;
