import jwt from "jsonwebtoken";
import { createError } from "../utils/erros.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "No hay token, autorización denegada" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role || "client",
    };

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Token no válido" });
  }
};

export const verifyUser = (req, res, next) => {
  authMiddleware(req, res, () => {
    if (req.user.id === req.params.id || req.user.role === "admin") {
      next();
    } else {
      return next(createError(403, "No estas autorizado pillin"));
    }
  });
};

export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(createError(403, "Access denied"));
  }
  next();
};
