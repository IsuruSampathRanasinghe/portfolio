import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address."),

  password: z
    .string()
    .min(6, "Password must contain at least 6 characters."),
});