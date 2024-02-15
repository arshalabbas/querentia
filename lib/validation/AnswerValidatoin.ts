import { z } from "zod";

export const AnswerValidation = z.object({
  text: z.string().min(3).max(1000),
});

export type AnswerValidationType = z.infer<typeof AnswerValidation>;
