import { z } from "zod";

export const withPagination = <D>(Codec: z.ZodType<D>) => {
  return z.object({
    results: z.array(Codec),
    page: z.number(),
    total_pages: z.number(),
    total_results: z.number(),
  });
};

export const UserCookiesSchema = z.object({
  username: z.string(),
  session_id: z.string(),
});

export type UserCookiesType = z.infer<typeof UserCookiesSchema>;
