import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { validateSchema } from "../middleware/validateMiddleware.js";
import { userSchema, loginSchema } from "../schemas/userSchema.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", validateSchema(userSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", authMiddleware, logout);

export default router;
