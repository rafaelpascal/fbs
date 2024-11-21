import { z } from "zod";
import { Validator } from "~/utils/packages/validators";

export const authSchema = Validator.object({
  email: Validator.email("Email"),
  password: Validator.string("Password"),
});
export type AuthFormPayload = z.infer<typeof authSchema>;

export const registerSchema = Validator.object({
  email: Validator.email("Email"),
  firstName: Validator.string("First Name"),
  lastName: Validator.string("Last Name"),
  phone: Validator.string("Phone Number"),
  roleId: Validator.string("Role"),
  baseUrl: Validator.string("Verify Email Link"),
});

export type RegisterFormPayload = z.infer<typeof registerSchema>;

export const editPermissionSchema = Validator.object({
  roleId: Validator.string("Role ID"),
});

export type EditFormPayload = z.infer<typeof editPermissionSchema>;

export const createPassSchema = Validator.object({
  token: Validator.string("Token"),
  password: Validator.string("Password"),
  confirmPassword: Validator.string("Confirm Password"),
});

export type newPassFormPayload = z.infer<typeof createPassSchema>;

export const forgotPassSchema = Validator.object({
  email: Validator.email("Email"),
  baseUrl: Validator.string("baseUrl"),
});

export type forgotPasswordPayload = z.infer<typeof forgotPassSchema>;

export const resetPassSchema = Validator.object({
  token: Validator.string("Token"),
  newPassword: Validator.string("password"),
});

export type resetPasswordPayload = z.infer<typeof resetPassSchema>;

export const changePassSchema = Validator.object({
  oldPassword: Validator.string("password"),
  newPassword: Validator.string("password"),
});

export type changePasswordPayload = z.infer<typeof changePassSchema>;

export const authenticateSchema = Validator.object({
  userId: Validator.string("adminId"),
  mfaType: Validator.string("code"),
});

export type AuthenticatePayload = z.infer<typeof authenticateSchema>;

export const mfaverificationSchema = Validator.object({
  userId: Validator.string("adminId"),
  mfaType: Validator.string("code"),
  token: Validator.string("token"),
});

export type CodeVerificationPayload = z.infer<typeof mfaverificationSchema>;

export const setupMFASchema = Validator.object({
  code: Validator.string("code"),
});

export type SetupPayload = z.infer<typeof setupMFASchema>;

export const disablemfaSchema = Validator.object({
  password: Validator.string("Password"),
});
export type MFADisableAllPayload = z.infer<typeof disablemfaSchema>;
