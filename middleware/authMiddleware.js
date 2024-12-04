import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No se proporcionó token de autenticación' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token de autenticación inválido' });
  }
};