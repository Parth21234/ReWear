import express from 'express';
import { getPendingItems, moderateItem, removeUser, removeItem } from '../controllers/adminController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/pending-items', authMiddleware, adminMiddleware, getPendingItems);
router.put('/item/:id', authMiddleware, adminMiddleware, moderateItem);
router.delete('/user/:id', authMiddleware, adminMiddleware, removeUser);
router.delete('/item/:id', authMiddleware, adminMiddleware, removeItem);

export default router; 