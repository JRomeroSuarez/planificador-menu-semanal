import { CircularProgress } from "@heroui/react";
import { useAddRecipePage } from './useAddRecipePage';

import RecipeHeader from './sections/RecipeHeader';
import BasicInfo from './sections/BasicInfo';
import IngredientsForm from './sections/IngredientsForm';
import PreparationEditor from './sections/PreparationEditor';
import ImageUploader from './sections/ImageUploader';
import RecipeFooter from './sections/RecipeFooter';

const AddRecipePage = () => {
    const {
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
        isEditing,
        isLoading
    } = useAddRecipePage();

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-20 gap-4">
                <CircularProgress size="lg" aria-label="Cargando..." />
                <p className="font-black text-default-400 uppercase tracking-widest text-sm">Cargando receta...</p>
            </div>
        );
    }

    return (
        <main className="flex-1 max-w-[1280px] mx-auto w-full p-4 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <RecipeHeader
                isEditing={isEditing}
                progress={progress}
                onSave={handleSubmit}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-5 flex flex-col gap-10">
                    <ImageUploader />

                    <BasicInfo
                        name={name}
                        setName={setName}
                        types={types}
                        setTypes={setTypes}
                        prepTime={prepTime}
                        setPrepTime={setPrepTime}
                        servings={servings}
                        setServings={setServings}
                    />
                </div>

                <div className="lg:col-span-7 flex flex-col gap-10">
                    <IngredientsForm
                        ingredients={ingredients}
                        onAdd={handleAddIngredient}
                        onRemove={handleRemoveIngredient}
                        onChange={handleIngredientChange}
                    />

                    <PreparationEditor
                        instructions={instructions}
                        setInstructions={setInstructions}
                    />
                </div>
            </div>

            <RecipeFooter />
        </main>
    );
};

export default AddRecipePage;

