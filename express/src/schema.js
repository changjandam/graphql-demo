import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string(),
});

export const VehicleSchema = z.object({
  type: z.string(),
  model: z.string(),
  userId: z.number(),
});
