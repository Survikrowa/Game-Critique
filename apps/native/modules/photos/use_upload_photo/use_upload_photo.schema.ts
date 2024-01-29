import { z } from "zod";

export const UseUploadPhotoSchema = z.object({
  photo_url: z.string(),
});
