import { useState } from 'react';
import { suggestMeal } from '@/features/meals/api/geminiService';
import { Meal, MealType } from '@/types';
import { MealTypeColors, MEAL_TYPES } from '@/utils/constants';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea, Chip, Skeleton, Card, CardBody, Divider } from "@heroui/react";

interface GeminiMealSuggestProps {
    isOpen: boolean;
    onClose: () => void;
    onAddMeal: (meal: Omit<Meal, 'id'>) => void;
}

const GeminiMealSuggest = ({ isOpen, onClose, onAddMeal }: GeminiMealSuggestProps) => {
    const [ingredients, setIngredients] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [suggestion, setSuggestion] = useState<Omit<Meal, 'id'> | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSuggest = async () => {
        if (!ingredients) {
            setError('Por favor, introduce algunos ingredientes.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setSuggestion(null);
        try {
            const result = await suggestMeal(ingredients);
            const mealTypesAreValid = result.type.every((t: string) => MEAL_TYPES.includes(t as MealType));
            const finalMealTypes = mealTypesAreValid && result.type.length > 0 ? result.type as MealType[] : [MealType.Otro];

            setSuggestion({
                name: result.name,
                type: finalMealTypes,
                ingredients: result.ingredients
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'No se pudo obtener una sugerencia. Inténtalo de nuevo.');
            console.error(err);
        }
        setIsLoading(false);
    };

    const handleAddMeal = () => {
        if (suggestion) {
            onAddMeal(suggestion);
            handleClose();
        }
    };

    const handleClose = () => {
        setIngredients('');
        setSuggestion(null);
        setError(null);
        setIsLoading(false);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} size="lg" backdrop="blur">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">AI Recipe Suggestion</ModalHeader>
                        <ModalBody>
                            {isLoading ? (
                                <div className="space-y-4 py-4">
                                    <Skeleton className="rounded-lg">
                                        <div className="h-8 w-3/4 rounded-lg bg-default-200"></div>
                                    </Skeleton>
                                    <div className="flex gap-2">
                                        <Skeleton className="rounded-full w-16 h-6" />
                                        <Skeleton className="rounded-full w-16 h-6" />
                                    </div>
                                    <Card className="border-none shadow-none bg-default-50">
                                        <CardBody className="space-y-3">
                                            <Skeleton className="h-4 w-full rounded-md" />
                                            <Skeleton className="h-4 w-full rounded-md" />
                                            <Skeleton className="h-4 w-2/3 rounded-md" />
                                        </CardBody>
                                    </Card>
                                </div>
                            ) : suggestion ? (
                                <div className="space-y-4 py-2">
                                    <h4 className="text-xl font-bold">{suggestion.name}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {suggestion.type.map(t => {
                                            const colors = MealTypeColors[t as MealType] || MealTypeColors.Otro;
                                            return (
                                                <Chip key={t} size="sm" variant="flat" className={`${colors.bg} ${colors.text} font-bold h-5 px-1`}>
                                                    {t.toUpperCase()}
                                                </Chip>
                                            );
                                        })}
                                    </div>

                                    <div>
                                        <h5 className="font-semibold mb-3 text-default-600 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-lg">restaurant_menu</span>
                                            Ingredients
                                        </h5>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-default-50 p-4 rounded-2xl border border-divider">
                                            {suggestion.ingredients.map((item, index) => (
                                                <li key={index} className="text-sm flex items-center justify-between">
                                                    <span className="font-medium">{item.name}</span>
                                                    <span className="text-default-400 text-xs px-2 py-0.5 bg-default-100 rounded-md">{item.quantity}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4 py-2">
                                    <p className="text-sm text-default-500">
                                        List some ingredients you have on hand and our AI will suggest a perfect recipe for you.
                                    </p>
                                    <Textarea
                                        label="What's in your fridge?"
                                        placeholder="e.g. chicken, rice, bell peppers..."
                                        value={ingredients}
                                        onValueChange={setIngredients}
                                        variant="bordered"
                                        minRows={3}
                                    />
                                    {error && (
                                        <Card className="bg-danger-50 border-none shadow-none">
                                            <CardBody className="py-2 text-danger text-xs font-medium uppercase tracking-tight">
                                                {error}
                                            </CardBody>
                                        </Card>
                                    )}
                                </div>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            {suggestion ? (
                                <>
                                    <Button variant="flat" onPress={handleSuggest} isLoading={isLoading}>
                                        Try another one
                                    </Button>
                                    <Button color="primary" onPress={handleAddMeal} className="font-bold">
                                        Add to Library
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="light" onPress={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button
                                        color="primary"
                                        onPress={handleSuggest}
                                        isLoading={isLoading}
                                        className="font-bold shadow-lg shadow-primary/20"
                                    >
                                        Get Suggestion
                                    </Button>
                                </>
                            )}
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default GeminiMealSuggest;