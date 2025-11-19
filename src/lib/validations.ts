import { z } from "zod";

// Login validation schema
export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// Signup validation schema
export const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

// Profile update validation schema
export const profileUpdateSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    age: z.number().min(16, "Age must be at least 16").max(100, "Invalid age").optional(),
    phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits").optional(),
    department: z.string().optional(),
    semester: z.number().min(1).max(12).optional(),
    batch: z.string().optional(),
    address: z.string().optional(),
    emergencyContact: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits").optional(),
    emergencyContactName: z.string().optional(),
});

// Feedback validation schema
export const feedbackSchema = z.object({
    subject: z.string().min(3, "Subject must be at least 3 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    rating: z.number().min(1).max(5).optional(),
    category: z.enum(["academic", "infrastructure", "faculty", "administration", "other"]).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
export type FeedbackInput = z.infer<typeof feedbackSchema>;
