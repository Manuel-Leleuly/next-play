import { FetchLib } from "@/lib/fetchLib";
import { AxiosInstance } from "axios";
import {
  GenresResponseSchema,
  GenresResponseType,
  MovieCastsAndCrewsSchema,
  MovieCastsAndCrewsType,
  MovieSchema,
  MoviesRequestType,
  MoviesResponseSchema,
  MoviesResponseType,
  MovieType,
  MovieVideosResponseSchema,
  MovieVideosResponseType,
  NowPlayingMoviesSchema,
  NowPlayingMoviesType,
  SearchMovieRequestType,
} from "./movieModels";

export class MovieApi {
  static getAllMovies = async (
    network: AxiosInstance,
    params?: MoviesRequestType
  ) => {
    return await FetchLib.validateResponse<MoviesResponseType>(
      () => network.get("/discover/movie", { params }),
      MoviesResponseSchema
    );
  };

  static getMoviesByQuery = async (
    network: AxiosInstance,
    params: SearchMovieRequestType
  ) => {
    return await FetchLib.validateResponse<MoviesResponseType>(
      () => network.get("/search/movie", { params }),
      MoviesResponseSchema
    );
  };

  static getMovieById = async (network: AxiosInstance, movieId: number) => {
    return await FetchLib.validateResponse<MovieType>(
      () => network.get(`/movie/${movieId}`),
      MovieSchema
    );
  };

  static getMovieGenres = async (network: AxiosInstance) => {
    return await FetchLib.validateResponse<GenresResponseType>(
      () => network.get("/genre/movie/list"),
      GenresResponseSchema
    );
  };

  static getNowPlayingMovies = async (network: AxiosInstance) => {
    return await FetchLib.validateResponse<NowPlayingMoviesType>(
      () => network.get("/movie/now_playing"),
      NowPlayingMoviesSchema
    );
  };

  static getMovieCastsAndCrews = async (
    network: AxiosInstance,
    movieId: number
  ) => {
    return await FetchLib.validateResponse<MovieCastsAndCrewsType>(
      () => network.get(`/movie/${movieId}/credits`),
      MovieCastsAndCrewsSchema
    );
  };

  static getMovieRecommendations = async (
    network: AxiosInstance,
    movieId: number
  ) => {
    return await FetchLib.validateResponse<MoviesResponseType>(
      () => network.get(`/movie/${movieId}/recommendations`),
      MoviesResponseSchema
    );
  };

  static getMovieVideos = async (network: AxiosInstance, movieId: number) => {
    return await FetchLib.validateResponse<MovieVideosResponseType>(
      () => network.get(`/movie/${movieId}/videos`),
      MovieVideosResponseSchema
    );
  };
}
