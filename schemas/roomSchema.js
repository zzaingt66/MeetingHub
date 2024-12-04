import { z } from 'zod';

export const roomSchema = z.object({
    photo: z.string().url().optional(),
    name: z.string().min(1),
    capacity: z.number().int().min(1),
    location: z.string().min(1),
    isActive: z.boolean().default(true),
    description: z.string().min(1).optional(),
    reservations: z.array(z.string()).optional(), 
});