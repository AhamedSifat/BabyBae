import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(4, { message: 'Password must be at least 4 characters' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  role: z.string().nonempty({ message: 'Please select a role' }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
