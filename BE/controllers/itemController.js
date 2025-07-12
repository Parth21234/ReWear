import { Item } from '../models/itemModel.js';

// Create a new item
export const createItem = async (req, res) => {
    try {
        const { title, description, images, category, type, size, condition, tags, pointsValue } = req.body;
        if (!title || !description || !images || !category || !type || !size || !condition) {
            return res.status(400).json({ success: false, message: 'All required fields must be filled' });
        }
        const item = new Item({
            title,
            description,
            images,
            category,
            type,
            size,
            condition,
            tags,
            pointsValue,
            uploader: req.userId
        });
        await item.save();
        res.status(201).json({ success: true, message: 'Item created successfully', data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

// Get all items (with optional filters)
export const getItems = async (req, res) => {
    try {
        const filters = req.query || {};
        const items = await Item.find(filters).populate('uploader', 'fullname email profile.profilePhoto');
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

// Get a single item by ID
export const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('uploader', 'fullname email profile.profilePhoto');
        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

// Update an item
export const updateItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }
        if (item.uploader.toString() !== req.userId) {
            return res.status(403).json({ success: false, message: 'Not authorized to update this item' });
        }
        Object.assign(item, req.body);
        await item.save();
        res.status(200).json({ success: true, message: 'Item updated successfully', data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

// Delete an item
export const deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }
        if (item.uploader.toString() !== req.userId) {
            return res.status(403).json({ success: false, message: 'Not authorized to delete this item' });
        }
        await item.deleteOne();
        res.status(200).json({ success: true, message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
}; 