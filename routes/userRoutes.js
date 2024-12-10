import express from "express";
import { adminMiddleware, authMiddleware, verifyUser } from "../middleware/authMiddleware.js";
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", authMiddleware, verifyUser, getUserById);

router.get("/", authMiddleware, adminMiddleware, getUsers);


router.put("/:id", authMiddleware, verifyUser, updateUser);

router.delete("/:id", authMiddleware, verifyUser, deleteUser);

export default router;
