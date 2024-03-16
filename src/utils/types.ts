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
