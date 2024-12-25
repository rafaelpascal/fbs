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

export const TokenSchema = z.object({
  "access-token": z.string(),
  "access-token-expiry": z.string(),
  "refresh-token": z.string().optional(),
  "refresh-token-expiry": z.string().optional(),
});

export const SessionSchema = z.object({
  user: AuthResponseSchema,
  token: TokenSchema,
});

export type SessionToken = z.infer<typeof TokenSchema>;

export type SessionUser = z.infer<typeof AuthResponseSchema>;

export type Session = {
  user: SessionUser;
  token: SessionToken;
};
