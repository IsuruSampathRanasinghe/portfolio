import { z } from "zod";

const employmentTypes = [
  "Internship",
  "Full-time",
  "Part-time",
  "Freelance",
  "Contract",
  "Volunteer",
  "Other",
];

export const createExperienceSchema = z.object({
  company: z
    .string()
    .min(2, "Company name must contain at least 2 characters.")
    .max(150, "Company name is too long."),

  position: z
    .string()
    .min(2, "Position is required.")
    .max(150, "Position is too long."),

  employmentType: z
    .enum(employmentTypes)
    .optional()
    .default("Internship"),

  startDate: z
    .string()
    .min(1, "Start date is required."),

  endDate: z
    .string()
    .optional()
    .nullable(),

  currentlyWorking: z
    .boolean()
    .optional()
    .default(false),

  description: z
    .string()
    .max(4000, "Description is too long.")
    .optional()
    .default(""),

  location: z
    .string()
    .max(150, "Location is too long.")
    .optional()
    .default(""),

  technologies: z
    .array(z.string().min(1))
    .optional()
    .default([]),

  companyUrl: z
    .string()
    .url("Company URL must be valid.")
    .optional()
    .or(z.literal("")),

  displayOrder: z
    .number()
    .int()
    .min(0)
    .optional()
    .default(0),
});

export const updateExperienceSchema =
  createExperienceSchema.partial();