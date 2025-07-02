import * as z from "zod";

export const FormSchema = z
  .object({
    username: z.string().min(2, {
      message: "min 2 characters.",
    }),

    email: z.string().email({
      message: "to nie jest email byczku",
    }),

    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),

    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),

    firstName: z.string().min(2).optional().or(z.literal("")),
    lastName: z.string().min(2).optional().or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
