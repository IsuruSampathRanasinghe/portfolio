import { z } from "zod";

export const createEducationSchema = z.object({
  institution: z
    .string()
    .min(2, "Institution name must contain at least 2 characters.")
    .max(150, "Institution name is too long."),

  degree: z
    .string()
    .min(2, "Degree is required.")
    .max(150, "Degree name is too long."),

  fieldOfStudy: z
    .string()
    .max(150, "Field of study is too long.")
    .optional()
    .default(""),

  startDate: z
    .string()
    .min(1, "Start date is required."),

  endDate: z
    .string()
    .optional()
    .nullable(),

  currentlyStudying: z
    .boolean()
    .optional()
    .default(false),

  description: z
    .string()
    .max(3000, "Description is too long.")
    .optional()
    .default(""),

  location: z
    .string()
    .max(150, "Location is too long.")
    .optional()
    .default(""),

  displayOrder: z
    .number()
    .int()
    .min(0)
    .optional()
    .default(0),
});

export const updateEducationSchema =
  createEducationSchema.partial();