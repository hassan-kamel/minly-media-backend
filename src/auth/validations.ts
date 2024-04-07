import { z } from 'zod';
import { prisma } from '../shared/utils/prismaClient';
z.custom(async (email) => {
  const user = await prisma.user.findUnique({ where: { email: email as string } });
  return user ? false : true;
});

export const signupDataSchema = z.object({
  body: z.object({
    fullName: z
      .string({
        required_error: 'Full name is required'
      })
      .min(5, 'Full name Minimum length is 5 characters')
      .max(32, 'Full name Maximum length is 32 Characters'),
    email: z
      .string({
        required_error: 'Email is required'
      })
      .email('Not a valid email')
      .refine(async (email) => {
        const user = await prisma.user.findUnique({ where: { email: email as string } });
        return user ? false : true;
      }, 'Email already exists'),
    password: z
      .string({
        required_error: 'Password is required'
      })
      .min(8, 'Password Minimum length is 8 characters')
  })
});

export const loginDataSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required'
      })
      .email('Not a valid email'),
    password: z
      .string({
        required_error: 'Password is required'
      })
      .min(8, 'Password Minimum length is 8 characters')
  })
});
