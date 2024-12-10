import { z } from "zod";

export const reservationSchema = z
  .object({
    roomId: z.string().min(1, "El ID de la sala es requerido"),
    userId: z.string().min(1, "El ID del usuario es requerido"),
    numberOfPeople: z.number().int().min(1, "Debe haber al menos una persona"),
    date: z.coerce.date().refine((date) => date >= new Date(), {
      message: "Debe ser una fecha actual o futura",
    }),
    startHour: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "La hora debe ser algo, como  00:00",
    }),
    endHour: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "La hora debe ser algo, como  00:00",
    }),
  })
  .refine((data) => data.startHour < data.endHour, {
    message: "Debe escoger una hora inicial menor a la hora de fin que ingreso",
});
