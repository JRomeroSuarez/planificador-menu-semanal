import { Router, Response } from 'express';
import { prisma } from '../index';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

const formatRecipe = (recipe: any) => ({
    id: recipe.id,
    name: recipe.name,
    type: recipe.type.split(','),
    prepTime: recipe.prepTime,
    servings: recipe.servings,
    instructions: recipe.instructions,
    imageUrl: recipe.imageUrl ?? null,
    ingredients: recipe.ingredients.map((ing: any) => ({
        name: ing.name,
        quantity: ing.quantity
    }))
});

router.get('/', authenticate, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const recipes = await prisma.recipe.findMany({
            where: { ownerId: req.userId },
            include: { ingredients: true }
        });
        res.json(recipes.map(formatRecipe));
    } catch (error: any) {
        console.error('Error obteniendo recetas:', error);
        res.status(500).json({ error: 'Error al obtener recetas' });
    }
});

router.get('/:id', authenticate, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const recipe = await prisma.recipe.findUnique({
            where: { id: Number(req.params.id) },
            include: { ingredients: true }
        });

        if (!recipe || recipe.ownerId !== req.userId) {
            return res.status(404).json({ error: 'Receta no encontrada' });
        }

        res.json(formatRecipe(recipe));
    } catch (error) {
        console.error('Error obteniendo receta:', error);
        res.status(500).json({ error: 'Error al obtener receta' });
    }
});

router.post('/', authenticate, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { name, type, ingredients, prepTime, servings, instructions, imageUrl } = req.body;

        const recipe = await prisma.recipe.create({
            data: {
                name,
                type: Array.isArray(type) ? type.join(',') : type,
                ownerId: req.userId!,
                prepTime: prepTime ? Number(prepTime) : undefined,
                servings: servings ? Number(servings) : undefined,
                instructions,
                imageUrl: imageUrl ?? null,
                ingredients: {
                    create: ingredients.map((ing: { name: string; quantity: string }) => ({
                        name: ing.name,
                        quantity: ing.quantity
                    }))
                }
            },
            include: { ingredients: true }
        });

        res.status(201).json(formatRecipe(recipe));
    } catch (error) {
        console.error('Error creando receta:', error);
        res.status(500).json({ error: 'Error al crear receta' });
    }
});

router.put('/:id', authenticate, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { name, type, ingredients, prepTime, servings, instructions, imageUrl } = req.body;
        const recipeId = Number(req.params.id);

        const existing = await prisma.recipe.findUnique({ where: { id: recipeId } });
        if (!existing || existing.ownerId !== req.userId) {
            return res.status(404).json({ error: 'Receta no encontrada' });
        }

        const recipe = await prisma.recipe.update({
            where: { id: recipeId },
            data: {
                name,
                type: Array.isArray(type) ? type.join(',') : type,
                prepTime: prepTime ? Number(prepTime) : undefined,
                servings: servings ? Number(servings) : undefined,
                instructions,
                imageUrl: imageUrl ?? null,
                ingredients: {
                    deleteMany: {},
                    create: ingredients.map((ing: { name: string; quantity: string }) => ({
                        name: ing.name,
                        quantity: ing.quantity
                    }))
                }
            },
            include: { ingredients: true }
        });

        res.json(formatRecipe(recipe));
    } catch (error) {
        console.error('Error actualizando receta:', error);
        res.status(500).json({ error: 'Error al actualizar receta' });
    }
});

router.delete('/:id', authenticate, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const recipeId = Number(req.params.id);

        const existing = await prisma.recipe.findUnique({ where: { id: recipeId } });
        if (!existing || existing.ownerId !== req.userId) {
            return res.status(404).json({ error: 'Receta no encontrada' });
        }

        await prisma.ingredient.deleteMany({ where: { recipeId } });
        await prisma.recipe.delete({ where: { id: recipeId } });

        res.json({ message: 'Receta eliminada exitosamente' });
    } catch (error) {
        console.error('Error eliminando receta:', error);
        res.status(500).json({ error: 'Error al eliminar receta' });
    }
});

export default router;
