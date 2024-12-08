import { userSchema, loginSchema } from "../schemas/userSchema";
import { User } from "../models/User";
import {
  hashPassword,
  generateToken,
  verifyPassword,
} from "../utils/authUtils";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

// REGISTRARSE
export const register = async (req, res) => {
  try {
    const validatedData = userSchema.parse(req.body);
    const { name, email, password, adminToken } = validatedData;
    const hashedPassword = await hashPassword(password);

    const role = adminToken === ADMIN_TOKEN ? "admin" : "client";

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    const token = generateToken(user._id);

    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({
      message: "Usuario registrado exitosamente",
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "Error en el registro:" }, error);
  }
};

// INICIAR SESION
export const login = async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({
      message: `Bienvenido ${user.name}, te has logeado exitosamente`,
    });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// CERRAR SESION
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true });
    res.status(200).json({ message: "Sesión cerrada exitosamente " });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    res.status(500).json({ message: "Error al cerrar sesión" });
  }
};
