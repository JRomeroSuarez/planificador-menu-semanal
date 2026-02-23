import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem, Textarea } from "@heroui/react";
import { Meal } from '@/types';
import { MEAL_TYPES } from '@/utils/constants';
import { useAddMealModal } from './useAddMealModal';

interface AddMealModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddMeal: (meal: Omit<Meal, 'id'>) => void;
}

const AddMealModal = ({ isOpen, onClose, onAddMeal }: AddMealModalProps) => {
    const {
        name,
        setName,
        types,
        setTypes,
        ingredientsText,
        setIngredientsText,
        handleSubmit
    } = useAddMealModal({ isOpen, onClose, onAddMeal });

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
