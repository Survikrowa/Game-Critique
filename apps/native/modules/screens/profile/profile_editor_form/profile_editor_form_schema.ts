import { z } from "zod";

export const ProfileEditorFormFields = z.object({
  name: z
    .string()
    .min(5, "Nazwa użytkownika musi posiadać minimum 5 znaków")
    .max(25, "Nazwa użytkownika nie może przekraczać 25 znaków"),
  avatar: z
    .string()
    .min(1, "Nie załączono żadnego avataru")
    .url({ message: "Invalid URL" }),
});

export type ProfileEditorFields = z.infer<typeof ProfileEditorFormFields>;
