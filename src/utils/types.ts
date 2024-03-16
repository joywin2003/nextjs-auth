import { z } from "zod";

export const zod = z;

export const resetpasswordSchema = z
  .object({
    password: z.string().min(10, "Password must be at least 10 characters"),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords must match",
    path: ["confirmpassword"],
  });
export type TResetpasswordSchema = z.infer<typeof resetpasswordSchema>;


export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Email must be a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(10, "Password must be at least 10 characters"),
});
export type TLoginSchema = z.infer<typeof loginSchema>;


export const signupSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Email must be a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(10, "Password must be at least 10 characters"),
});

export type TSignupSchema = z.infer<typeof signupSchema>;