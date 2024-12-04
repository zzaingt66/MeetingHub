import express from "express";
import { register, login } from "../controllers/authController.js";
import { validateSchema } from "../middleware/validateMiddleware.js";
import { userSchema, loginSchema } from '../schemas/userSchema';


const router = express.Router();

router.post("/register", validateSchema(userSchema), register);
router.post("/login", validateSchema(loginSchema),login);

export default router;
