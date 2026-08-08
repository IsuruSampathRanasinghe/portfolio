import { z } from "zod";

const imageSchema = z
  .object({
    url: z.string().url("Image URL must be valid.").optional().or(z.literal("")),
    publicId: z.string().optional(),
  })
  .optional();

export const createProjectSchema = z.object({
  title: z
    .string()
    .min(3, "Title must contain at least 3 characters."),

  description: z
    .string()
    .min(10, "Description must contain at least 10 characters."),

  technologies: z
    .array(z.string().min(1))
    .optional()
    .default([]),

  image: imageSchema,

  githubUrl: z
    .string()
    .url("GitHub URL must be valid.")
    .optional()
    .or(z.literal("")),

  liveUrl: z
    .string()
    .url("Live URL must be valid.")
    .optional()
    .or(z.literal("")),

  featured: z.boolean().optional(),

  category: z.string().min(1).optional(),

  status: z
    .enum(["Completed", "In Progress"])
    .optional(),
});

export const updateProjectSchema =
  createProjectSchema.partial();