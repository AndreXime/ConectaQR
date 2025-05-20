import { Router } from 'express';
import { Feedback } from '../controllers/index.js';

const router = Router();

// Rotas de feedback
router.post('/feedback', Feedback.postFeedback);
router.get('/feedbackadmin', Feedback.getFeedback);

export default router;
