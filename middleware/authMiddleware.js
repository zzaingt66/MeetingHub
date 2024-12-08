import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // DIVIDE EL TOKEN EN POR CADA ESPACIO, EN ESTE CASO EN DOS Y TOMA EL SEUGNDO VALOR DEL TOKEN 

    if (!token) {
      return res.status(401).json({ message: 'No se proporcionó token de autenticación' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // VEIFICA SI EL TOKEN ES VALIDO, SI NO ES VALIDO PORQUE ESTA CORRUPTO, EXPIRO O ESTA FIRMADO POR UNA CLAVE INCORRECTA, SI ES VALIDO TRAE EL OBJ, USER DECODIFICADO

    const user = await User.findById(decoded.userId).select('-password');
    // BUSCA USANDO EL ID DEL USUARIO DECODIFICADO, MENO SU CONTRASEÑA

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    req.user = user; // SI EL TOKEN ES VALIDO DESPUES DE LAS VALIDACIONES, SE ALMACENA EL USUARIO, EN req.user Y SE LLAMA NEXT PARA QUE SIGA CON SU PROCESO

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token de autenticación inválido' });
  }
};

export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado' });
  }
  next();
};