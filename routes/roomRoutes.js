import express from 'express';
import { adminMiddleware, authMiddleware } from '../middleware/authMiddleware.js';
import { createRoom, getRoomById, updateRoom, getRooms, deleteRoom } from '../controllers/roomController.js';

const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, createRoom);

router.get('/', getRooms);

router.get('/:id', getRoomById);

router.put('/:id', authMiddleware, adminMiddleware, updateRoom);

router.delete('/:id', authMiddleware, adminMiddleware, deleteRoom);

export default router;