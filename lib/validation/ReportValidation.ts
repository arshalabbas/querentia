import { z } from "zod";

export const ReportValidation = z.object({
  reason: z
    .string()
    .min(1, { message: "This field is required" })
    .max(500, { message: "Maximum 500 characters" }),
});

export type ReportValidationType = z.infer<typeof ReportValidation>;
