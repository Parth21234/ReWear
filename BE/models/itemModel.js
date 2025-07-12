import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }], // URLs or file paths
    category: { type: String, required: true },
    type: { type: String, required: true }, // e.g., shirt, pants
    size: { type: String, required: true },
    condition: { type: String, required: true },
    tags: [{ type: String }],
    status: { type: String, enum: ['available', 'swapped', 'pending'], default: 'available' },
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    swapWith: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // If swapped
    pointsValue: { type: Number, default: 0 }, // For point-based redemption
}, { timestamps: true });

export const Item = mongoose.model('Item', itemSchema); 