import { userSchema, loginSchema } from "../schemas/userSchema";
import { User } from "../models/User";
import {
  hashPassword,
  generateToken,
  verifyPassword,
} from "../utils/authUtils";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

// REGISTRARSE
export const register = async (req, res, next) => {
  try {
    const validatedData = userSchema.parse(req.body);
    const { name, email, password, adminToken } = validatedData;
    const hashedPassword = await hashPassword(password);

    const role = adminToken === ADMIN_TOKEN ? "admin" : "client";

    const createdUser = new User({ name, email, password: hashedPassword, role });
    await createdUser.save();

    const token = generateToken(createdUser);

    res.cookie("access_token", token, { httpOnly: true });
    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: {
        name: createdUser.name,
        email: createdUser.email,
      },
    });
  } catch (error) {
    next(error)
  }
};

// INICIAR SESION
export const login = async (req, res, next) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isPasswordCorrect = await verifyPassword(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Contraseña incorrecta!" });
    }

    const token = generateToken(user);

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({
      message: `Bienvenido, ${user.name}.`,
    });
  } catch (error) {
    next(error)
  }
};

// CERRAR SESION
export const logout = async (req, res, next) => {
  try {
    const { name } = req.user;
    res.clearCookie("token", { httpOnly: true });
    res.status(200).json({ message: `Sesión cerrada exitosamente, ${name}` });
  } catch (error) {
    next(error)
  }
};

