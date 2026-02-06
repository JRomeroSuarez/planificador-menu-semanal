import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Meal, MealType, Ingredient } from '@/types';
import * as mealService from '@/features/meals/api/mealService';
import { useAuth } from '@/features/auth/context/AuthContext';

export const useAddRecipePage = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditing = !!id;

    const [name, setName] = useState('');
    const [types, setTypes] = useState<Set<string>>(new Set());
    const [prepTime, setPrepTime] = useState('');
    const [servings, setServings] = useState('');
    const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: '', quantity: '' }]);
    const [instructions, setInstructions] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            mealService.getMealById(Number(id))
                .then(meal => {
                    if (meal) {
                        setName(meal.name);
                        setTypes(new Set(meal.type));
                        setIngredients(meal.ingredients.length ? meal.ingredients : [{ name: '', quantity: '' }]);
                        setPrepTime(meal.prepTime ? String(meal.prepTime) : '');
                        setServings(meal.servings ? String(meal.servings) : '');
                        setInstructions(meal.instructions || '');
                    }
                })
                .catch(err => console.error(err))
                .finally(() => setIsLoading(false));
        }
    }, [id]);

    const progress = useMemo(() => {
        let score = 0;
        if (name) score += 20;
        if (types.size > 0) score += 20;
        if (prepTime && servings) score += 20;
        if (ingredients.some(i => i.name)) score += 20;
        if (instructions) score += 20;
        return score;
    }, [name, types, prepTime, servings, ingredients, instructions]);

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '' }]);
    };

    const handleRemoveIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
        const newIngs = [...ingredients];
        newIngs[index] = { ...newIngs[index], [field]: value };
        setIngredients(newIngs);
    };

    const handleSubmit = async () => {
        if (!isAuthenticated || !user) {
            alert('Debes iniciar sesión para guardar recetas.');
            return;
        }

        if (!name || types.size === 0) {
            alert('Por favor, completa el nombre y al menos una categoría.');
            return;
        }

        try {
            const mealData: Omit<Meal, 'id'> = {
                name,
                type: Array.from(types) as MealType[],
                ingredients: ingredients.filter(i => i.name.trim() !== ''),
                prepTime: prepTime ? Number(prepTime) : undefined,
                servings: servings ? Number(servings) : undefined,
                instructions
            };

            if (isEditing) {
                await mealService.updateMeal(Number(id), Number(user.id), mealData);
                alert('¡Receta actualizada con éxito!');
            } else {
                await mealService.addMeal(Number(user.id), mealData);
                alert('¡Receta guardada con éxito!');
            }
            navigate('/recetas');
        } catch (error) {
            console.error(error);
            alert('Error al guardar la receta.');
        }
    };

    return {
        name,
        setName,
        types,
        setTypes,
        prepTime,
        setPrepTime,
        servings,
        setServings,
        ingredients,
        handleAddIngredient,
        handleRemoveIngredient,
        handleIngredientChange,
        instructions,
        setInstructions,
        progress,
        handleSubmit,
        isAuthenticated,
        isEditing,
        isLoading
    };
};
