import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  name: z.string().min(2, "Name must be at least 2 characters long").max(50),
  role: z.enum(["ADMIN", "AGENT"]),
  inviteToken: z.string().optional(),
});

export const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const fieldSchema = z.object({
  name: z.string().min(2, "Field name is required"),
  cropType: z.string().min(2, "Crop type is required"),
  location: z.string().optional(),
  size: z.string().optional(),
});

export const observationSchema = z.object({
  note: z.string().min(5, "Observation note is too short"),
  stage: z.string(),
  fieldId: z.string(),
});
