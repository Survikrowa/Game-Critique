import { z } from 'zod';

export const RegisterPushTokenSchema = z.object({
  token: z.string().min(1),
  platform: z.enum(['ios', 'android']),
});

export const UpdateNotificationPreferencesSchema = z.object({
  friendActivity: z.boolean().optional(),
  friendInvites: z.boolean().optional(),
  weeklySummary: z.boolean().optional(),
  releaseReminders: z.boolean().optional(),
});
