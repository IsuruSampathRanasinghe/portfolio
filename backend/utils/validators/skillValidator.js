import { z } from "zod";

const skillCategories = [
  "Frontend",
  "Backend",
  "Database",
  "Programming Language",
  "Tools",
  "Cloud",
  "Other",
];

export const createSkillSchema = z.object({
  name: z
    .string()
    .min(1, "Skill name is required.")
    .max(100, "Skill name is too long."),

  category: z.enum(skillCategories, {
    error: "Please select a valid skill category.",
  }),

  proficiency: z
    .number()
    .min(0, "Proficiency cannot be less than 0.")
    .max(100, "Proficiency cannot be greater than 100."),

  icon: z.string().optional().default(""),

  displayOrder: z
    .number()
    .int()
    .min(0)
    .optional()
    .default(0),

  featured: z
    .boolean()
    .optional()
    .default(false),
});

export const updateSkillSchema =
  createSkillSchema.partial();