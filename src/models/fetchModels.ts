import { z } from "zod";

export const withPagination = <D>(Codec: z.ZodType<D>) => {
  return z.object({
    results: z.array(Codec),
    page: z.number(),
    total_pages: z.number(),
    total_results: z.number(),
  });
};
