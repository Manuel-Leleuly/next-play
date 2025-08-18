import { z } from "zod";

export const TmdbConfigSchema = z.object({
  images: z.object({
    base_url: z.string(),
    secure_base_url: z.string(),
    backdrop_sizes: z.array(z.string()),
    logo_sizes: z.array(z.string()),
    poster_sizes: z.array(z.string()),
    profile_sizes: z.array(z.string()),
    still_sizes: z.array(z.string()),
  }),
  change_keys: z.array(z.string()),
});

export type TmdbConfigType = z.infer<typeof TmdbConfigSchema>;

export const RequestTokenSchema = z.object({
  success: z.boolean(),
  expires_at: z.string(),
  request_token: z.string(),
});

export type RequestTokenType = z.infer<typeof RequestTokenSchema>;

export const LoginRequestBodySchema = z.object({
  username: z.string().nonempty({ error: "username is required" }),
  password: z.string().nonempty({ error: "password is required" }),
  request_token: z.string(),
});

export type LoginRequestBodyType = z.infer<typeof LoginRequestBodySchema>;

export const CreateSessionReqBodySchema = z.object({
  request_token: z.string(),
});

export type CreateSessionReqBodyType = z.infer<
  typeof CreateSessionReqBodySchema
>;

export const CreateSessionSuccessSchema = z.object({
  success: z.literal(true),
  session_id: z.string(),
});

export type CreateSessionSuccessType = z.infer<
  typeof CreateSessionSuccessSchema
>;

export const CreateSessionFailedSchema = z.object({
  success: z.literal(false),
  failure: z.boolean(),
  status_code: z.number(),
  status_message: z.string(),
});

export type CreateSessionFailedType = z.infer<typeof CreateSessionFailedSchema>;

export const CreateSessionResponseSchema = z.union([
  CreateSessionSuccessSchema,
  CreateSessionFailedSchema,
]);

export type CreateSessionResponseType = z.infer<
  typeof CreateSessionResponseSchema
>;
