import { z } from "zod";

const profileImageSchema = z
  .object({
    url: z
      .string()
      .url("Profile image URL must be valid.")
      .optional()
      .or(z.literal("")),

    publicId: z.string().optional(),
  })
  .optional();

export const updateSettingsSchema = z.object({
  name: z
    .string()
    .min(2, "Name must contain at least 2 characters.")
    .max(100, "Name is too long.")
    .optional(),

  headline: z
    .string()
    .max(200, "Headline is too long.")
    .optional(),

  shortBio: z
    .string()
    .max(500, "Short bio is too long.")
    .optional(),

  about: z
    .string()
    .max(5000, "About section is too long.")
    .optional(),

  email: z
    .string()
    .email("Please provide a valid email address.")
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .max(50, "Phone number is too long.")
    .optional(),

  location: z
    .string()
    .max(150, "Location is too long.")
    .optional(),

  profileImage: profileImageSchema,

  resumeUrl: z
    .string()
    .url("Resume URL must be valid.")
    .optional()
    .or(z.literal("")),

  githubUrl: z
    .string()
    .url("GitHub URL must be valid.")
    .optional()
    .or(z.literal("")),

  linkedinUrl: z
    .string()
    .url("LinkedIn URL must be valid.")
    .optional()
    .or(z.literal("")),

  portfolioUrl: z
    .string()
    .url("Portfolio URL must be valid.")
    .optional()
    .or(z.literal("")),

  availabilityStatus: z
    .enum([
      "Available",
      "Open to Opportunities",
      "Not Available",
    ])
    .optional(),
});