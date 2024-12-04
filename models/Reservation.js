import mongoose from 'mongoose';
import { reservationSchema } from '../schemas/reservationSchema';

const ReservationSchema = new mongoose.Schema(reservationSchema.shape);

export default mongoose.model('Reservation', ReservationSchema);