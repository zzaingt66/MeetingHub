/* // routes/reservationRoutes.js

import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { createReservation, getReservations, getReservationById, updateReservation, deleteReservation } from '../controllers/reservationController.js';

const router = express.Router();

router.post('/', authMiddleware, createReservation);

router.get('/', getReservations);

router.get('/:id', getReservationById);

router.put('/:id', authMiddleware, updateReservation);

router.delete('/:id', authMiddleware, deleteReservation);

export default router; */