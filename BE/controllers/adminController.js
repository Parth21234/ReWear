import { Item } from '../models/itemModel.js';
import { User } from '../models/userModels.js';

// Get all items pending approval
export const getPendingItems = async (req, res) => {
    try {
        const items = await Item.find({ status: 'pending' }).populate('uploader', 'fullname email');
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

// Approve or reject an item
export const moderateItem = async (req, res) => {
    try {
        const { status } = req.body; // 'available' or 'rejected'
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }
        item.status = status;
        await item.save();
        res.status(200).json({ success: true, message: `Item ${status}` });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

// Remove a user (ban)
export const removeUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

// Remove an item (delete inappropriate/spam)
export const removeItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }
        res.status(200).json({ success: true, message: 'Item removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
}; 