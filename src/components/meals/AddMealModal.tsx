import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem, Textarea } from "@heroui/react";
import { Meal, MealType, Ingredient } from '../../types';
import { MEAL_TYPES } from '../../config/constants';

interface AddMealModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddMeal: (meal: Omit<Meal, 'id'>) => void;
}

const AddMealModal = ({ isOpen, onClose, onAddMeal }: AddMealModalProps) => {
    const [name, setName] = useState('');
    const [types, setTypes] = useState<Set<string>>(new Set());
    const [ingredientsText, setIngredientsText] = useState('');

    useEffect(() => {
        if (isOpen) {
            setName('');
            setTypes(new Set());
            setIngredientsText('');
        }
    }, [isOpen]);

    const handleSubmit = () => {
        if (!name || !ingredientsText) {
            return;
        }

        const ingredients: Ingredient[] = ingredientsText.split(',')
            .map(i => {
                const parts = i.split('-').map(p => p.trim());
                if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
                return { name: parts[0], quantity: parts[1] };
            })
            .filter((i): i is Ingredient => i !== null);

        onAddMeal({
            name,
            type: Array.from(types) as MealType[],
            ingredients,
        });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} placement="center" backdrop="blur">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Añadir Nueva Comida</ModalHeader>
                        <ModalBody>
                            <div className="space-y-4">
                                <Input
                                    label="Nombre de la comida"
                                    placeholder="Ej. Lentejas con chorizo"
                                    variant="bordered"
                                    value={name}
                                    onValueChange={setName}
                                />
                                <Select
                                    label="Tipo(s)"
                                    placeholder="Selecciona tipos"
                                    selectionMode="multiple"
                                    variant="bordered"
                                    selectedKeys={types}
                                    onSelectionChange={(keys) => setTypes(keys as Set<string>)}
                                >
                                    {MEAL_TYPES.map((type) => (
                                        <SelectItem key={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <Textarea
                                    label="Ingredientes"
                                    placeholder="Ej: Pollo - 2 filetes, Arroz - 100g"
                                    variant="bordered"
                                    value={ingredientsText}
                                    onValueChange={setIngredientsText}
                                    description="Separa con comas y usa el formato 'Nombre - Cantidad'."
                                />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="flat" color="danger" onPress={onClose}>
                                Cancelar
                            </Button>
                            <Button color="primary" onPress={handleSubmit} className="font-bold">
                                Añadir Comida
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AddMealModal;