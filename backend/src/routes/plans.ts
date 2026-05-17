import { Router, Response } from 'express';
import { prisma } from '../index';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const planEntries = await prisma.weeklyPlanEntry.findMany({
            where: { userId: req.userId },
            include: {
                recipe: { include: { ingredients: true } }
            }
        });

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
            const recipe = {
                id: entry.recipe.id,
                name: entry.recipe.name,
                type: entry.recipe.type.split(','),
                ingredients: entry.recipe.ingredients.map(ing => ({
                    name: ing.name,
                    quantity: ing.quantity
                }))
            };
            weeklyPlan[entry.day][entry.slot as 'lunch' | 'dinner'].push(recipe);
        });

        res.json(weeklyPlan);
    } catch (error) {
        console.error('Error obteniendo plan semanal:', error);
        res.status(500).json({ error: 'Error al obtener plan semanal' });
    }
});

// Guarda el plan completo reemplazando todas las entradas del usuario
router.post('/sync', authenticate, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { plan } = req.body; // { Lunes: { lunch: [{ id }], dinner: [{ id }] }, ... }

        await prisma.weeklyPlanEntry.deleteMany({ where: { userId: req.userId } });

        const entries: { userId: number; day: string; slot: string; recipeId: number }[] = [];
        for (const [day, slots] of Object.entries(plan as Record<string, { lunch: any[]; dinner: any[] }>)) {
            for (const meal of slots.lunch) {
                entries.push({ userId: req.userId!, day, slot: 'lunch', recipeId: meal.id });
            }
            for (const meal of slots.dinner) {
                entries.push({ userId: req.userId!, day, slot: 'dinner', recipeId: meal.id });
            }
        }

        if (entries.length > 0) {
            await prisma.weeklyPlanEntry.createMany({ data: entries });
        }

        res.json({ message: 'Plan sincronizado' });
    } catch (error) {
        console.error('Error sincronizando plan:', error);
        res.status(500).json({ error: 'Error al sincronizar plan' });
    }
});

router.post('/', authenticate, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { day, slot, recipeId } = req.body;
        const entry = await prisma.weeklyPlanEntry.create({
            data: { userId: req.userId!, day, slot, recipeId: Number(recipeId) }
        });
        res.status(201).json(entry);
    } catch (error) {
        console.error('Error añadiendo receta al plan:', error);
        res.status(500).json({ error: 'Error al añadir receta al plan' });
    }
});

router.delete('/', authenticate, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { day, slot, recipeId } = req.body;
        await prisma.weeklyPlanEntry.deleteMany({
            where: { userId: req.userId, day, slot, recipeId: Number(recipeId) }
        });
        res.json({ message: 'Receta eliminada del plan' });
    } catch (error) {
        console.error('Error eliminando receta del plan:', error);
        res.status(500).json({ error: 'Error al eliminar receta del plan' });
    }
});

export default router;
