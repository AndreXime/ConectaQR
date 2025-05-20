import type { Response, Request } from 'express';
import { Router } from 'express';
import authRoutes from './auth.route.js';
import privateRoutes from './private.route.js';
import publicRoutes from './public.route.js';
import feedbackRoutes from './feedback.route.js';

const router = Router();

// Sub-rotas
router.use(authRoutes);
router.use(privateRoutes);
router.use(publicRoutes);
router.use(feedbackRoutes);

// Rota de ping
router.all('/', async (req: Request, res: Response) => {
	res.status(200).json({ message: 'Pong' });
});

// Rota 404
router.use(async (req: Request, res: Response) => {
	res.status(404).json({ message: 'Não encontrado' });
});

export default router;
