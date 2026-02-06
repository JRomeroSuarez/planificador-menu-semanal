import { Router, Request, Response } from 'express';
import { prisma } from '../index';

const router = Router();

// Get weekly plan for a user
router.get('/', async (req: Request, res: Response) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        const planEntries = await prisma.weeklyPlanEntry.findMany({
            where: { userId: Number(userId) },
            include: {
                recipe: {
                    include: {
                        ingredients: true
                    }
                }
            }
        });

        // Transform to frontend format
        const weeklyPlan: any = {
            Lunes: { lunch: [], dinner: [] },
            Martes: { lunch: [], dinner: [] },
            Miércoles: { lunch: [], dinner: [] },
            Jueves: { lunch: [], dinner: [] },
            Viernes: { lunch: [], dinner: [] },
            Sábado: { lunch: [], dinner: [] },
            Domingo: { lunch: [], dinner: [] }
        };

        planEntries.forEach(entry => {
            const formattedRecipe = {
                id: entry.recipe.id,
                name: entry.recipe.name,
                type: entry.recipe.type.split(','),
                ingredients: entry.recipe.ingredients.map(ing => ({
                    name: ing.name,
                    quantity: ing.quantity
                }))
            };

            if (entry.slot === 'lunch') {
                weeklyPlan[entry.day].lunch.push(formattedRecipe);
            } else {
                weeklyPlan[entry.day].dinner.push(formattedRecipe);
            }
        });

        res.json(weeklyPlan);
    } catch (error) {
        console.error('Error obteniendo plan semanal:', error);
        res.status(500).json({ error: 'Error al obtener plan semanal' });
    }
});

// Add recipe to weekly plan
router.post('/', async (req: Request, res: Response) => {
    try {
        const { userId, day, slot, recipeId } = req.body;

        if (!userId) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        const entry = await prisma.weeklyPlanEntry.create({
            data: {
                userId: Number(userId),
                day,
                slot,
                recipeId: Number(recipeId)
            }
        });

        res.status(201).json(entry);
    } catch (error) {
        console.error('Error añadiendo receta al plan:', error);
        res.status(500).json({ error: 'Error al añadir receta al plan' });
    }
});

// Remove recipe from weekly plan
router.delete('/', async (req: Request, res: Response) => {
    try {
        const { userId, day, slot, recipeId } = req.body;

        if (!userId) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        await prisma.weeklyPlanEntry.deleteMany({
            where: {
                userId: Number(userId),
                day,
                slot,
                recipeId: Number(recipeId)
            }
        });

        res.json({ message: 'Receta eliminada del plan' });
    } catch (error) {
        console.error('Error eliminando receta del plan:', error);
        res.status(500).json({ error: 'Error al eliminar receta del plan' });
    }
});

export default router;
