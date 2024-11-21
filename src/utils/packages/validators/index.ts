import { z } from "zod";
import { emailSchema, genericStringSchema, stringNumberSchema } from "./schema";
import { reactHookHandler, ValidationError, ZodExtension } from "./handlers";

/**
 * Validator uses zod + a collection of helper functions to create a helper utility method
 * see [zod](https://zod.dev/) docs for validator guide
 * @link https://zod.dev/
 */
export const Validator = {
  string: genericStringSchema,
  number: stringNumberSchema,
  email: emailSchema,
  object: z.object,
  array: z.array,
  reactHookHandler,

  createError: <T extends ZodExtension>(
    _schema: T
  ): ValidationError<T> | undefined => {
    return {};
  },
};

// Password Validation
export const validatePassword = z
  .string({
    required_error: "*Password is required",
  })
  .min(8, { message: "*Password must be at least 8 characters" })
  .max(100, { message: "*Value exceeds max. character length" })
  .regex(/(?=.*[a-z])/, {
    message: "*Password must contain at least 1 lowercase letter",
  })
  .regex(/(?=.*[A-Z])/, {
    message: "*Password must contain at least 1 uppercase letter",
  })
  .regex(/(?=.*\d)/, { message: "*Password must contain at least 1 number" })
  .regex(/[^a-zA-Z0-9]/, {
    message: "*Password must contain at least 1 special character",
  });
