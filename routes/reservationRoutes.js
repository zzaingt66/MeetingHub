import express from 'express';
import { adminMiddleware, authMiddleware } from '../middleware/authMiddleware.js';
import { createReservation, getReservations, getReservationById, updateReservation, deleteReservation } from '../controllers/reservationController.js';

const router = express.Router();


router.get('/', authMiddleware, getReservations);
router.post('/', authMiddleware, createReservation);
router.get('/:id', authMiddleware, getReservationById);
router.put('/:id', authMiddleware, updateReservation);
router.delete('/:id', authMiddleware, deleteReservation);

export default router;