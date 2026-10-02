import { z } from "zod";

import { ChallengeType } from "../../../../../__generated__/types";

export const CreateChallengeFormSchema = z
  .object({
    recipientId: z.string().min(1, "Wybierz odbiorcę"),
    type: z.nativeEnum(ChallengeType),
    gameId: z.number().nullable(),
    description: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.gameId === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["gameId"],
        message: "Wybierz grę",
      });
    }
    if (
      data.type === ChallengeType.InGameChallenge &&
      data.description.trim().length === 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["description"],
        message: "Opis jest wymagany dla wyzwania w grze",
      });
    }
  });

export type CreateChallengeFormFields = z.infer<
  typeof CreateChallengeFormSchema
>;
