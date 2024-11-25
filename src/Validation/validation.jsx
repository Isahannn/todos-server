import { z } from 'zod';

export const validationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  userName: z.string().min(3, 'Username is required'),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[@$!%*?&#]/, 'Password must contain at least one special character')
    .min(8,'Password is required'),
  confirmPassword: z.string().min(1, 'Confirm Password is required'),
  phone: z.string().min(9,'Phone number is required'),
  countryCode: z.string().min(1, 'Country code is required'),
  avatar: z.any().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'],
}).refine((data) => {
  const forbidden = [data.name, data.userName, data.email.split('@')[0]];
  return !forbidden.some((forbiddenPart) => data.password.includes(forbiddenPart));
}, {
  message: 'Password cannot contain parts of your name, username, or email',
  path: ['password'],
});

