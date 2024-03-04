import { z } from "zod";

export const FeedValidation = z.object({
  title: z
    .string()
    .min(4, "Minimum 4 characters.")
    .max(100, "Maximum 20 characters."),
  description: z.string().max(1000),
});

export type FeedValidationType = z.infer<typeof FeedValidation>;
