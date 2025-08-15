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
