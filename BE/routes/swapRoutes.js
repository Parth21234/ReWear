import express from 'express';
import { createSwapRequest, getUserSwaps, updateSwapStatus } from '../controllers/swapController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createSwapRequest);
router.get('/', authMiddleware, getUserSwaps);
router.put('/:id', authMiddleware, updateSwapStatus);

export default router; 