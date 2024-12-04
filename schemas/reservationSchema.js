import { z } from 'zod';

export const reservationSchema = z.object({
    roomId: z.string().min(1),
    userId: z.string().min(1),
    startTime: z.date(),
    endTime: z.date(),
    numberOfPeople: z.number().int().min(1).optional(),
    status: z.enum(['Pendiente', 'confirmado', 'cancelado']).default('pendiente')
});
