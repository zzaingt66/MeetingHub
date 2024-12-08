import { z } from "zod";

export const roomSchema = z.object({
  photos: z.array(z.string().url()).min(1),
  name: z.string().min(2),
  capacity: z.number().int().min(2),
  place: z.string(),
  address: z.object({
    street: z.string().min(3).max(50),
    number: z.number(),
    city: z.string().min(3).max(50),
  }),
  isActive: z.boolean().default(true),
  desc: z.string().min(1),
  reservations: z.array(z.string()).optional(),
  rating: z.number().gte(1).lte(5).int(),
});
