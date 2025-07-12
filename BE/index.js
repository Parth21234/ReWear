import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './models/userModels.js';
import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import swapRoutes from './routes/swapRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB().catch(err => {
  console.error('Failed to connect to MongoDB:', err.message);
  console.log('Please make sure MongoDB is running or set up a cloud MongoDB instance');
  console.log('You can use MongoDB Atlas (free tier) or install MongoDB locally');
});

app.get('/', (req, res) => {
    res.json({ message: 'ReWear API is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/swaps', swapRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use(errorMiddleware);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}`);
    console.log(`Frontend should be running at http://localhost:3000`);
});
