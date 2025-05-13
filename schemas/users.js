import z from "zod";
import {
  passwordLengthValidation,
  passwordLowercaseValidation,
  passwordUppercaseValidation,
  passwordNumberValidation,
  passwordSpecialValidation,
} from "./validations/stringValidations.js";
const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  lastname: z.string().min(3, "Last name must be at least 3 characters long"),
  birthday_year: z.number().int().positive("Age must be a positive number"),
  address: z.string().min(3, "Address must be at least 3 characters long"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, passwordLengthValidation)
    .refine((password) => /[a-z]/.test(password), passwordLowercaseValidation)
    .refine((password) => /[A-Z]/.test(password), passwordUppercaseValidation)
    .refine((password) => /[0-9]/.test(password), passwordNumberValidation)
    .refine(
      (password) => /[^a-zA-Z0-9\s]/.test(password),
      passwordSpecialValidation
    ),
});

export const validateUser = (object) => userSchema.safeParse(object);
export const validatePartialUser = (object) =>
  userSchema.partial().safeParse(object);
