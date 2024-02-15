import { z } from 'zod';

export const UserSchema = z.object({
  sub: z.string(),
});

export type UserAuthDTO = z.infer<typeof UserSchema>;

export const UserAuth0InfoSchema = z.object({ nickname: z.string() });

export type UserAuth0InfoDTO = z.infer<typeof UserAuth0InfoSchema>;
