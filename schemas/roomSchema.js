import { z } from "zod";

export const roomSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder los 100 caracteres"),
  roomNumber: z
    .string()
    .regex(
      /^[A-Za-z0-9]+$/,
      "El número de sala solo puede contener letras y números"
    )
    .min(1, "El número de sala es requerido"),
  city: z
    .string()
    .min(2, "La ciudad debe tener al menos 2 caracteres")
    .max(100, "La ciudad no puede exceder los 100 caracteres"),
  address: z
    .string()
    .min(5, "La dirección debe tener al menos 5 caracteres")
    .max(200, "La dirección no puede exceder los 200 caracteres"),
  photos: z.array(z.string().url()).min(1, "Debe incluir al menos una foto"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede exceder los 500 caracteres"),
  equipment: z
    .array(z.string()).max(20, "No puede haber más de 20 elementos en el equipo")
    .optional()
    ,
  pricePerHour: z.number().positive("El precio por hora debe ser mayor a 0"),
  maxCapacity: z
    .number()
    .int("La capacidad máxima debe ser un número entero")
    .positive("La capacidad máxima debe ser mayor a 0"),
  featured: z.boolean().default(false),
  bookings: z.array(z.string()).default([]),
});
