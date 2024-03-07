import z from "zod";

const optionsValidation = z.object({
  id: z.number(),
  name: z.string(),
});

const pollValidation = z.object({
  title: z
    .string()
    .min(4, { message: "Minimum 4 characters." })
    .max(200, { message: "Maximum 200 characters" }),
  description: z
    .string()
    .min(4, { message: "Minimum 4 characters." })
    .max(1000, { message: "Maximum 1000 characters" })
    .optional(),
  options: z.array(optionsValidation),
});

export type pollValidationType = z.infer<typeof pollValidation>;

export default pollValidation;
