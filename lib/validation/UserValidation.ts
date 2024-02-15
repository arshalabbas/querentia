import { z } from "zod";

export const UserValidation = z.object({
  // avatar: z.string().url(),
  name: z
    .string()
    .min(4, "Minimum 4 characters.")
    .max(20, "Maximum 20 characters."),
  username: z
    .string()
    .min(4, "Minimum 4 characters.")
    .max(20, "Minimum 20 characters."),
  bio: z.string().max(1000, "Maximum 1000 characters.").optional(),
});

export type UserValidationType = z.infer<typeof UserValidation>;
