import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export const connectDB = async () => {
    try {
        // Use a local MongoDB URI if MONGODB_URI is not set
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rewear';
        const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        console.log('Please set up MongoDB:');
        console.log('1. Install MongoDB locally: https://docs.mongodb.com/manual/installation/');
        console.log('2. Or use MongoDB Atlas (free): https://www.mongodb.com/atlas');
        console.log('3. Set MONGODB_URI environment variable');
        // Don't exit process, let the app run without DB for now
        console.log('App will continue without database connection');
    }
};

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        profilePhoto: {
            type: String,
            default: ""
        },
    },

}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', userSchema);