import { withPagination } from "@/models/fetchModels";
import { z } from "zod";

export const MovieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullish(),
  belongs_to_collection: z
    .object({
      id: z.number(),
      name: z.string(),
      poster_path: z.string().nullish(),
      backdrop_path: z.string().nullish(),
    })
    .nullish(),
  budget: z.number().nullish(),
  genre_ids: z.array(z.number()).nullish(),
  genres: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      })
    )
    .nullish(),
  homepage: z.string().nullish(),
  id: z.number(),
  imdb_id: z.string().nullish(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullish(),
  production_companies: z
    .array(
      z.object({
        id: z.number(),
        logo_path: z.string().nullish(),
        name: z.string(),
        origin_country: z.string(),
      })
    )
    .nullish(),
  production_countries: z
    .array(
      z.object({
        iso_3166_1: z.string(),
        name: z.string(),
      })
    )
    .nullish(),
  release_date: z.string(),
  revenue: z.number().nullish(),
  runtime: z.number().nullish(),
  spoken_languages: z
    .array(
      z.object({
        english_name: z.string(),
        iso_639_1: z.string(),
        name: z.string(),
      })
    )
    .nullish(),
  status: z.string().nullish(),
  tagline: z.string().nullish(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export type MovieType = z.infer<typeof MovieSchema>;

export const MoviesResponseSchema = withPagination(MovieSchema);

export type MoviesResponseType = z.infer<typeof MoviesResponseSchema>;

export const MoviesRequestSchema = z.object({
  certification: z.string().nullish(),
  "certification.gte": z.string().nullish(),
  "certification.lte": z.string().nullish(),
  certification_country: z.string().nullish(),
  include_adult: z.boolean().nullish(),
  include_video: z.boolean().nullish(),
  language: z.string().nullish(),
  page: z.number().nullish(),
  primary_release_year: z.number().nullish(),
  "primary_release_year.gte": z.date().nullish(),
  "primary_release_year.lte": z.date().nullish(),
  region: z.string().nullish(),
  "release_date.gte": z.date().nullish(),
  "release_date.lte": z.date().nullish(),
  sort_by: z
    .enum([
      "original_title.desc",
      "original_title.asc",
      "popularity.desc",
      "popularity.asc",
      "revenue.desc",
      "revenue.asc",
      "primary_release_date.desc",
      "primary_release_date.asc",
      "title.desc",
      "title.asc",
      "vote_average.desc",
      "vote_average.asc",
      "vote_count.desc",
      "vote_count.asc",
    ])
    .nullish(),
  "vote_average.gte": z.number().nullish(),
  "vote_average.lte": z.number().nullish(),
  "vote_count.gte": z.number().nullish(),
  "vote_count.lte": z.number().nullish(),
  watch_region: z.string().nullish(),
  with_cast: z.string().nullish(),
  with_companies: z.string().nullish(),
  with_crew: z.string().nullish(),
  with_genres: z.string().nullish(),
  with_keywords: z.string().nullish(),
  with_origin_country: z.string().nullish(),
  with_origin_language: z.string().nullish(),
  with_people: z.string().nullish(),
  with_release_type: z
    .union([
      z.literal(1),
      z.literal(2),
      z.literal(3),
      z.literal(4),
      z.literal(5),
      z.literal(6),
    ])
    .nullish(),
  "with_runtime.gte": z.int32().nullish(),
  "with_runtime.lte": z.int32().nullish(),
  with_watch_monetization_types: z
    .enum(["flatrate", "free", "ads", "rent", "buy"])
    .nullish(),
  with_watch_providers: z.string().nullish(),
  without_companies: z.string().nullish(),
  without_genres: z.string().nullish(),
  without_keywords: z.string().nullish(),
  without_watch_providers: z.string().nullish(),
  year: z.int32().nullish(),
});

export type MoviesRequestType = z.infer<typeof MoviesRequestSchema>;

export const GenresResponseSchema = z.object({
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
});

export type GenresResponseType = z.infer<typeof GenresResponseSchema>;

export const NowPlayingMovieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullish(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullish(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export type NowPlayingMovieType = z.infer<typeof NowPlayingMovieSchema>;

export const NowPlayingMoviesSchema = withPagination(
  NowPlayingMovieSchema
).extend({
  dates: z.object({
    maximum: z.string().nullish(),
    minimum: z.string().nullish(),
  }),
});

export type NowPlayingMoviesType = z.infer<typeof NowPlayingMoviesSchema>;

export const SearchMovieRequestSchema = z.object({
  query: z.string(),
  include_adult: z.boolean().nullish(),
  language: z.string().nullish(),
  primary_release_year: z.string().nullish(),
  page: z.number().nullish(),
  region: z.string().nullish(),
  year: z.string().nullish(),
});

export type SearchMovieRequestType = z.infer<typeof SearchMovieRequestSchema>;

export const CastSchema = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullish(),
  cast_id: z.number(),
  character: z.string(),
  credit_id: z.string(),
  order: z.number(),
});

export type CastType = z.infer<typeof CastSchema>;

export const CrewSchema = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullish(),
  credit_id: z.string(),
  department: z.string(),
  job: z.string(),
});

export type CrewType = z.infer<typeof CrewSchema>;

export const MovieCastsAndCrewsSchema = z.object({
  id: z.number(),
  cast: z.array(CastSchema),
  crew: z.array(CrewSchema),
});

export type MovieCastsAndCrewsType = z.infer<typeof MovieCastsAndCrewsSchema>;

export const MovieVideoSchema = z.object({
  iso_639_1: z.string(),
  iso_3166_1: z.string(),
  name: z.string(),
  key: z.string(),
  site: z.string(),
  size: z.number(),
  type: z.string(),
  official: z.boolean(),
  published_at: z.string(),
  id: z.string(),
});

export type MovieVideoType = z.infer<typeof MovieVideoSchema>;

export const MovieVideosResponseSchema = z.object({
  id: z.number(),
  results: z.array(MovieVideoSchema),
});

export type MovieVideosResponseType = z.infer<typeof MovieVideosResponseSchema>;

export const FavoriteMoviesRequestSchema = z.object({
  language: z.string().nullish(),
  page: z.number().nullish(),
  session_id: z.string().nullish(),
  sort_by: z.enum(["created_at.asc", "created_at.desc"]).nullish(),
});

export type FavoriteMoviesRequestType = z.infer<
  typeof FavoriteMoviesRequestSchema
>;

export const AddOrRemoveFavoritesReqSchema = z.object({
  account_id: z.number(),
  session_id: z.string(),
  req_body: z.object({
    media_type: z.enum(["movie", "tv"]),
    media_id: z.number(),
    favorite: z.boolean(),
  }),
});

export type AddOrRemoveFavoritesReqType = z.infer<
  typeof AddOrRemoveFavoritesReqSchema
>;

export const AddOrRemoveFavoritesSuccessSchema = z.object({
  status_code: z.number(),
  status_message: z.string(),
});

export type AddOrRemoveFavoritesSuccessType = z.infer<
  typeof AddOrRemoveFavoritesSuccessSchema
>;
