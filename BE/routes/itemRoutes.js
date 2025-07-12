import express from 'express';
import { createItem, getItems, getItemById, updateItem, deleteItem } from '../controllers/itemController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import parser from '../utilis/multer.js';

const router = express.Router();

router.post('/upload', parser.single('image'), (req, res) => {
    try {
        if (!req.file || !req.file.path) {
            return res.status(400).json({ success: false, message: 'Image upload failed' });
        }
        res.json({ success: true, imageUrl: req.file.path });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ success: false, message: error.message || 'Upload failed' });
    }
});

router.post('/', authMiddleware, createItem);
router.get('/', getItems);
router.get('/:id', getItemById);
router.put('/:id', authMiddleware, updateItem);
router.delete('/:id', authMiddleware, deleteItem);

export default router; 