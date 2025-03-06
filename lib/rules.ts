import { z } from "zod";

export const RegisterFormSchema = z.object({
    email: z.string()
        // .min(1, { message: "Email is required" })
        .email({ message: 'Please enter a valid email' }).trim(),
    password: z.string().min(1, { message: "Not be empty" })
        .min(5, { message: "Be at least 5 characters long" })
        .regex(/[a-zA-Z]/, { message: "Contain at least one letter" })
        .regex(/[0-9]/, { message: "Contain at least one number" })
        .regex(/[^a-zA-Z0-9]/, { message: "Contain at least one special character" })
        .trim(),
    confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),

}).superRefine((value, context) => {
    if (value.password !== value.confirmPassword) {
        context.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password fields do not match",
            path: ["confirmPassword"],
        })
    }
})