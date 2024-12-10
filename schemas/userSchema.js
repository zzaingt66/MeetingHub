import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio y debe tener almenos dos caracteres"),
  email: z.string().email("Correo invalido"),
  password: z
    .string()
    .min(6, "La contraseña debe contener almenos 6 caracteres")
    .regex(/[A-Z]/, "La contraseña debe incluir al menos una letra mayúscula")
    .regex(/[a-z]/, "La contraseña debe incluir al menos una letra minúscula")
    .regex(/\d/, "La contraseña debe incluir al menos un número"),
  adminToken: z.string().default("client"),
  favoriteRooms: z.array(z.string()).optional(),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});


