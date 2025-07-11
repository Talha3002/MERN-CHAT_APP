import express from 'express';
import { sendMessage, getMessages } from '../controllers/messageroute.js';
import { protectRoute } from '../middleware/protectedRoute.js';

const router = express.Router();

router.post('/send/:id', protectRoute, sendMessage);
router.get('/:id', protectRoute, getMessages);

export default router;
