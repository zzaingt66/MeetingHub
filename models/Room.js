import mongoose from 'mongoose';
import { roomSchema } from '../schemas/roomSchema';

const RoomSchema = new mongoose.Schema(roomSchema.shape);

export default mongoose.model('Room', RoomSchema);