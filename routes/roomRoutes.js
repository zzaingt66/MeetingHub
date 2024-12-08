import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { createRoom, getRoomById, updateRoom, getRooms, deleteRoom } from '../controllers/roomController.js';

const router = express.Router();

router.post('/', authMiddleware, createRoom);

router.get('/', getRooms);

router.get('/:id', getRoomById);

router.put('/:id', authMiddleware, updateRoom);

router.delete('/:id', authMiddleware, deleteRoom);

export default router;