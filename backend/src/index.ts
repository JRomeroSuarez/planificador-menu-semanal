import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth';
import recipesRoutes from './routes/recipes';
import plansRoutes from './routes/plans';
import uploadsRoutes from './routes/uploads';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV === 'production') {
    if (!process.env.DATABASE_URL) {
        console.error('❌ CRITICAL ERROR: DATABASE_URL is not defined!');
    }
    if (!process.env.JWT_SECRET) {
        console.error('❌ CRITICAL ERROR: JWT_SECRET is not defined!');
    }
}

const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express.json());

app.use((req, _res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipesRoutes);
app.use('/api/plans', plansRoutes);
app.use('/api/uploads', uploadsRoutes);

app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'Backend is running!' });
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

export default app;
export { prisma };
