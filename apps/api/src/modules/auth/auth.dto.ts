import { z } from 'zod';

export const UserSchema = z.object({
  sub: z.string(),
});

export type UserDTO = z.infer<typeof UserSchema>;
