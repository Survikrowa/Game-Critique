import { z } from 'zod';
export const oAuthTokenSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  token_type: z.string(),
});

export type OAuthTokenDto = z.infer<typeof oAuthTokenSchema>;
