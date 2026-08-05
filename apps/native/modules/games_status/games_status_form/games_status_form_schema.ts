import { z } from "zod";

import { GameStatus } from "../../../__generated__/types";

const NUMBERS_ONLY_REGEX = /^\d+$/;

export const GamesStatusAddFormSchema = z
  .object({
    hours: z.string().optional(),
    minutes: z.string().optional(),
    platform: z.string().min(1, "Platforma jest wymagana"),
    score: z.string().optional(),
    status: z
      .nativeEnum(GameStatus)
      .and(z.string().min(1, "Status jest wymagany")),
    review: z.string().optional(),
    platinium: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.minutes && Number(data.minutes) > 59) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["minutes"],
        message: "W godzinie występuje tylko 60 minut.",
      });
    }
    if (data.hours && !NUMBERS_ONLY_REGEX.test(data.hours)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["hours"],
        message: "Akceptuję tylko liczby",
      });
    }
    if (data.minutes && !NUMBERS_ONLY_REGEX.test(data.minutes)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["minutes"],
        message: "Akceptuję tylko liczby",
      });
    }

    if (data.status === "COMPLETED" && data.score?.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["score"],
        message: "Ocena jest wymagana",
      });
    }
  });

export type GamesStatusAddFormFields = z.infer<typeof GamesStatusAddFormSchema>;
