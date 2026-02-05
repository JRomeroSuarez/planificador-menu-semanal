import { useState, FormEvent } from 'react';
import { Ingredient } from '../../types';

interface ConsolidatedIngredient {
    name: string;
    quantities: string[];
}
interface ShoppingListProps {
    derivedIngredients: ConsolidatedIngredient[];
    manualIngredients: Ingredient[];
    onAddIngredient: (ingredient: Ingredient) => void;
    onRemoveManualIngredient: (index: number) => void;
    onRemoveDerivedIngredient: (name: string) => void;
}

const ShoppingListItem = ({ name, quantities, onRemove }: { name: string; quantities: string; onRemove: () => void; }) => {
    const [checked, setChecked] = useState(false);

    return (
        <label className="flex items-center gap-2.5 cursor-pointer group py-1.5">
            <input
                className="rounded text-primary focus:ring-primary/20 bg-gray-100 dark:bg-white/5 border-none size-3.5 transition-all"
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
            />
            <div className={`flex-1 transition-all ${checked ? 'opacity-40 line-through' : ''}`}>
                <p className="text-xs text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors font-medium">{name}</p>
                {quantities && <p className="text-[10px] text-gray-400">{quantities}</p>}
            </div>
            <button
                onClick={(e) => { e.preventDefault(); onRemove(); }}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-red-500"
            >
                <span className="material-symbols-outlined text-[16px]">delete</span>
            </button>
        </label>
    );
};

const ShoppingList = ({ derivedIngredients, manualIngredients, onAddIngredient, onRemoveManualIngredient, onRemoveDerivedIngredient }: ShoppingListProps) => {
    const [newItem, setNewItem] = useState('');

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (newItem.trim() === '') return;

        const parts = newItem.split('-').map(p => p.trim());
        const ingredient: Ingredient = {
            name: parts[0],
            quantity: parts[1] || '',
        };

        onAddIngredient(ingredient);
        setNewItem('');
    };

    const handleExport = () => {
        alert("Lista exportada al portapapeles (Simulado)");
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-background-dark p-4 gap-5">
            <div>
                <h3 className="text-[#121118] dark:text-white text-base font-bold">Shopping List</h3>
                <p className="text-[#686189] text-[10px] font-semibold uppercase tracking-tighter mt-1">Updated Just Now</p>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 pr-1">
                {derivedIngredients.length > 0 && (
                    <div>
                        <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[14px]">set_meal</span>
                            Del Menú
                        </h4>
                        <div className="space-y-0.5">
                            {derivedIngredients.map(item => (
                                <ShoppingListItem
                                    key={item.name}
                                    name={item.name}
                                    quantities={item.quantities.join(', ')}
                                    onRemove={() => onRemoveDerivedIngredient(item.name)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {manualIngredients.length > 0 && (
                    <div>
                        <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[14px]">add_shopping_cart</span>
                            Extras
                        </h4>
                        <div className="space-y-0.5">
                            {manualIngredients.map((item, index) => (
                                <ShoppingListItem
                                    key={index}
                                    name={item.name}
                                    quantities={item.quantity}
                                    onRemove={() => onRemoveManualIngredient(index)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {derivedIngredients.length === 0 && manualIngredients.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                        <span className="material-symbols-outlined text-[32px] mb-2 block">shopping_basket</span>
                        <p className="text-xs">Lista vacía</p>
                    </div>
                )}
            </div>

            <div className="mt-auto space-y-4 pt-4 border-t border-gray-100 dark:border-white/10">
                <form onSubmit={handleAddItem} className="flex gap-2">
                    <input
                        type="text"
                        value={newItem}
                        onChange={e => setNewItem(e.target.value)}
                        placeholder="Add item (e.g. Bread)"
                        className="flex-grow min-w-0 px-3 py-1.5 text-xs bg-[#f1f0f4] dark:bg-white/5 border-none rounded-lg focus:ring-1 focus:ring-primary text-gray-800 dark:text-white placeholder:text-gray-400"
                    />
                    <button type="submit" className="p-1.5 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                    </button>
                </form>

                <button
                    onClick={handleExport}
                    className="w-full flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-xs font-bold shadow-md shadow-primary/10 transition-transform active:scale-95"
                >
                    <span className="material-symbols-outlined text-[18px]">send_to_mobile</span>
                    <span>Export List</span>
                </button>
            </div>
        </div>
    );
};

export default ShoppingList;