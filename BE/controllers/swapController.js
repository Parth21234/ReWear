import { Swap } from '../models/swapModel.js';
import { Item } from '../models/itemModel.js';

// Create a swap request
export const createSwapRequest = async (req, res) => {
    try {
        const { itemId, message } = req.body;
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }
        if (item.uploader.toString() === req.userId) {
            return res.status(400).json({ success: false, message: 'You cannot request a swap for your own item' });
        }
        const swap = new Swap({
            item: itemId,
            requester: req.userId,
            owner: item.uploader,
            message
        });
        await swap.save();
        res.status(201).json({ success: true, message: 'Swap request created', data: swap });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

// Get all swap requests for a user (as owner or requester)
export const getUserSwaps = async (req, res) => {
    try {
        const swaps = await Swap.find({ $or: [ { requester: req.userId }, { owner: req.userId } ] })
            .populate('item')
            .populate('requester', 'fullname email')
            .populate('owner', 'fullname email');
        res.status(200).json({ success: true, data: swaps });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

// Update swap status (accept/reject/complete)
export const updateSwapStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const swap = await Swap.findById(req.params.id);
        if (!swap) {
            return res.status(404).json({ success: false, message: 'Swap request not found' });
        }
        // Only owner can accept/reject
        if (swap.owner.toString() !== req.userId) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
        swap.status = status;
        swap.updatedAt = Date.now();
        await swap.save();
        // If accepted, mark item as swapped
        if (status === 'accepted') {
            const item = await Item.findById(swap.item);
            item.status = 'swapped';
            item.swapWith = swap.requester;
            await item.save();
        }
        res.status(200).json({ success: true, message: 'Swap status updated', data: swap });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
}; 