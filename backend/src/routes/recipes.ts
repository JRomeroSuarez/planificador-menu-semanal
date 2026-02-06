import { Router, Request, Response } from 'express';
import { prisma } from '../index';

const router = Router();

// Get all recipes for a user (or public recipes if not authenticated)
router.get('/', async (req: Request, res: Response) => {
    try {
        const { userId } = req.query;

        const recipes = await prisma.recipe.findMany({
            where: userId ? { ownerId: Number(userId) } : undefined,
            include: {
                ingredients: true
            }
        });

        // Transform to match frontend format
        const formattedRecipes = recipes.map(recipe => ({
            id: recipe.id,
            name: recipe.name,
            type: recipe.type.split(','), // Convert comma-separated to array
            prepTime: recipe.prepTime,
            servings: recipe.servings,
            instructions: recipe.instructions,
            ingredients: recipe.ingredients.map(ing => ({
                name: ing.name,
                quantity: ing.quantity
            }))
        }));

        res.json(formattedRecipes);
    } catch (error) {
        console.error('Error obteniendo recetas:', error);
        res.status(500).json({ error: 'Error al obtener recetas' });
    }
});

// Get recipe by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const recipe = await prisma.recipe.findUnique({
            where: { id: Number(id) },
            include: {
                ingredients: true
            }
        });

        if (!recipe) {
            return res.status(404).json({ error: 'Receta no encontrada' });
        }

        const formattedRecipe = {
            id: recipe.id,
            name: recipe.name,
            type: recipe.type.split(','),
            prepTime: recipe.prepTime,
            servings: recipe.servings,
            instructions: recipe.instructions,
            ingredients: recipe.ingredients.map(ing => ({
                name: ing.name,
                quantity: ing.quantity
            }))
        };

        res.json(formattedRecipe);
    } catch (error) {
        console.error('Error obteniendo receta:', error);
        res.status(500).json({ error: 'Error al obtener receta' });
    }
});

// Create new recipe
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, type, ingredients, userId, prepTime, servings, instructions } = req.body;

        if (!userId) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        const recipe = await prisma.recipe.create({
            data: {
                name,
                type: type.join(','), // Convert array to comma-separated string
                ownerId: Number(userId),
                prepTime: prepTime ? Number(prepTime) : undefined,
                servings: servings ? Number(servings) : undefined,
                instructions,
                ingredients: {
                    create: ingredients.map((ing: { name: string; quantity: string }) => ({
                        name: ing.name,
                        quantity: ing.quantity
                    }))
                }
            },
            include: {
                ingredients: true
            }
        });

        const formattedRecipe = {
            id: recipe.id,
            name: recipe.name,
            type: recipe.type.split(','),
            prepTime: recipe.prepTime,
            servings: recipe.servings,
            instructions: recipe.instructions,
            ingredients: recipe.ingredients.map(ing => ({
                name: ing.name,
                quantity: ing.quantity
            }))
        };

        res.status(201).json(formattedRecipe);
    } catch (error) {
        console.error('Error creando receta:', error);
        res.status(500).json({ error: 'Error al crear receta' });
    }
});

// Delete recipe
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Delete ingredients first (cascade)
        await prisma.ingredient.deleteMany({
            where: { recipeId: Number(id) }
        });

        // Delete recipe
        await prisma.recipe.delete({
            where: { id: Number(id) }
        });

        res.json({ message: 'Receta eliminada exitosamente' });
    } catch (error) {
        console.error('Error eliminando receta:', error);
        res.status(500).json({ error: 'Error al eliminar receta' });
    }
});

// Update recipe
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, type, ingredients, userId, prepTime, servings, instructions } = req.body;

        if (!userId) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        const recipe = await prisma.recipe.update({
            where: { id: Number(id) },
            data: {
                name,
                type: type.join(','),
                ownerId: Number(userId),
                prepTime: prepTime ? Number(prepTime) : undefined,
                servings: servings ? Number(servings) : undefined,
                instructions,
                ingredients: {
                    deleteMany: {},
                    create: ingredients.map((ing: { name: string; quantity: string }) => ({
                        name: ing.name,
                        quantity: ing.quantity
                    }))
                }
            },
            include: {
                ingredients: true
            }
        });

        const formattedRecipe = {
            id: recipe.id,
            name: recipe.name,
            type: recipe.type.split(','),
            prepTime: recipe.prepTime,
            servings: recipe.servings,
            instructions: recipe.instructions,
            ingredients: recipe.ingredients.map(ing => ({
                name: ing.name,
                quantity: ing.quantity
            }))
        };

        res.status(201).json(formattedRecipe);
    } catch (error) {
        console.error('Error actualizando receta:', error);
        res.status(500).json({ error: 'Error al actualizar receta' });
    }
});

export default router;
