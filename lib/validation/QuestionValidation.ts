import { z } from "zod";

export const QuestionValidation = z.object({
  // avatar: z.string().url(),
  title: z
    .string()
    .min(4, "Minimum 4 characters.")
    .max(100, "Maximum 20 characters."),
  description: z.string().optional(),
  //   tags: z.string().array(),
});

export type QuestionValidationType = z.infer<typeof QuestionValidation>;
