import mongoose from 'mongoose';

const mongooseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'client'], default: 'client' },
    favoriteRooms: { type: [String], default: [] },
    phone: { type: String, default: '' },
}, { timestamps: true });

const User = mongoose.model('User', mongooseSchema);

export { User };