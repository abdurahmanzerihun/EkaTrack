import { z } from "zod";

export const registerStaffSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .max(50),

    lastName: z
      .string()
      .trim()
      .min(2, "Last name must be at least 2 characters")
      .max(50),

    email: z
      .email("Invalid email address")
      .transform((email) => email.toLowerCase().trim()),

    role: z.enum(["ADMIN", "MANAGER", "STAFF"]),

    phoneNumber: z
      .string()
      .trim()
      .min(7, "Phone number is too short")
      .max(20)
      .optional(),

    gender: z
      .enum(["MALE", "FEMALE"])
      .optional()
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .email("Invalid email address")
      .transform((email) => email.toLowerCase().trim()),

    password: z
      .string()
      .min(1, "Password is required")
  })
});

export type RegisterStaffInput =
  z.infer<typeof registerStaffSchema>["body"];

export type LoginInput =
  z.infer<typeof loginSchema>["body"];