import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth';
import recipesRoutes from './routes/recipes';
import plansRoutes from './routes/plans';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Basic check for environment variables in production
if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
    console.error('❌ CRITICAL ERROR: DATABASE_URL is not defined in environment variables!');
} else if (process.env.DATABASE_URL) {
    console.log('✅ DATABASE_URL is defined');
}

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express.json());

// Global Error logging middleware to help debug 500s in Vercel
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipesRoutes);
app.use('/api/plans', plansRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running!' });
});

// Start server
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

export default app;
export { prisma };
