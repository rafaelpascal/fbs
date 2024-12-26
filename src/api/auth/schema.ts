import { z } from "zod";

export const AuthResponseSchema = z.object({
  message: z.string(),
  statusCode: z.string(),
  data: z
    .object({
      adminId: z.string(),
    })
    .optional(),
});

export const LoginResponse = z.string();

export const SessionSchema = z.object({
  user: LoginResponse,
});

export type SessionUser = z.infer<typeof LoginResponse>;

export type Session = {
  user: SessionUser;
};
