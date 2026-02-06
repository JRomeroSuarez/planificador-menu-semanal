import { Router, Request, Response } from 'express';
import { prisma } from '../index';

const router = Router();

// Register
router.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { username }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        // Create user (in production, hash the password!)
        const user = await prisma.user.create({
            data: { username, password }
        });

        res.json({
            message: 'Usuario creado exitosamente',
            user: { id: user.id, username: user.username }
        });
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        res.json({
            message: 'Login exitoso',
            user: { id: user.id, username: user.username }
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

export default router;
