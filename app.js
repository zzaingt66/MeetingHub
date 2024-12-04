import express from 'express';
import cors from 'cors'
import morgan from 'morgan';
import {connectDB} from './config/db.js'
import authRoutes from './routes/authRoutes.js';
/* import roomRoutes from './routes/roomRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import userRoutes from './routes/userRoutes.js'; */
import { errorMiddleware } from './middleware/errorMiddleware.js';
require('dotenv').config()
connectDB();

const app = express();
const corsOptions = {
    origin: process.env.FRONTEND_URL, 
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.json())

app.use('/api/auth', authRoutes);
/*   app.use('/api/rooms', roomRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/users', userRoutes); */

app.use(errorMiddleware);

export default app;