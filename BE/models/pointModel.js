import mongoose from 'mongoose';

const pointSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['earn', 'spend'], required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
});

export const PointTransaction = mongoose.model('PointTransaction', pointSchema); 