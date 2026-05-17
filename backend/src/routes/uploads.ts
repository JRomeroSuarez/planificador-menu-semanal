import { Router, Response } from 'express';
import multer from 'multer';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.post('/image', authenticate, upload.single('image'), async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se recibió ninguna imagen' });
        }

        if (!process.env.BLOB_READ_WRITE_TOKEN) {
            return res.status(503).json({ error: 'Subida de imágenes no configurada' });
        }

        const { put } = await import('@vercel/blob');
        const { url } = await put(
            `recipes/${req.userId}/${Date.now()}-${req.file.originalname}`,
            req.file.buffer,
            { access: 'public', contentType: req.file.mimetype }
        );

        res.json({ url });
    } catch (error) {
        console.error('Error subiendo imagen:', error);
        res.status(500).json({ error: 'Error al subir la imagen' });
    }
});

export default router;
