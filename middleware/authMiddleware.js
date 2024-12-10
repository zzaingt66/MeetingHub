import jwt from "jsonwebtoken";
import { createError } from "../utils/erros.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(createError(401, "No estas atenticado chikilin"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(401, "Token invalidoo"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  authMiddleware(req, res, () =>{
    if(req.user.id === req.params.id || req.user.role === 'admin'){
      next()
    }else{
      return next( createError(403, 'No estas autorizado pillin'))
    }
  })
}

export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(createError(403, "Access denied"));
  }
  next();
};
