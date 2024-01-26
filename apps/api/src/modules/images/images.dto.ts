import { z } from 'zod';

export const TransformOptionsSchema = z.object({
  transformOptions: z.object({
    width: z.coerce.number().int().positive(),
    height: z.coerce.number().int().positive(),
  }),
});

export type TransformOptionsDTO = z.infer<typeof TransformOptionsSchema>;

export const ImageUploadSchema = z.object({
  photo_url: z.string().url(),
});

export type ImageUploadDTO = z.infer<typeof ImageUploadSchema>;
