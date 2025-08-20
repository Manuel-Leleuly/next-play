import {
  MovieCastsAndCrewsType,
  MoviesResponseType,
  MovieType,
} from "@/api/movies/movieModels";
import { MovieApi } from "@/api/movies/movies";
import { NetworkLib } from "@/lib/NetworkLib";
import { DynamicMetadataFunction, PageRouteProps } from "@/models/models";
import { notFound } from "next/navigation";
import { MovieDetailBackdrop } from "./_components/MovieDetailBackdrop";
import { MovieDetailContent } from "./_components/MovieDetailContent";
import { Recommendations } from "./_components/Recommendations";

export const generateMetadata: DynamicMetadataFunction<{
  movieId: string;
}> = async ({ params }) => {
  const { movieId } = await params;
  const network = NetworkLib.withTMDBToken();
  const movieDetail = await MovieApi.getMovieById(network, parseInt(movieId));

  return {
    title: `MovieApp | ${movieDetail.title}`,
  };
};

type Props = PageRouteProps<{ movieId: string }>;

export default async function MovieDetailPage({ params }: Props) {
  const { movieId } = await params;

  let movieDetail: MovieType | null = null;
  let credits: MovieCastsAndCrewsType | null = null;
  let recommendations: MoviesResponseType | null = null;

  try {
    const network = NetworkLib.withTMDBToken();
    movieDetail = await MovieApi.getMovieById(network, parseInt(movieId));
    credits = await MovieApi.getMovieCastsAndCrews(network, parseInt(movieId));
    recommendations = await MovieApi.getMovieRecommendations(
      network,
      parseInt(movieId)
    );
  } catch (error) {
    console.error(error);
    return notFound();
  }

  if (!movieDetail || !credits || !recommendations) return notFound();

  return (
    <div>
      <MovieDetailBackdrop movie={movieDetail} />
      <MovieDetailContent movie={movieDetail} credits={credits} />
      <Recommendations movieRecommendations={recommendations.results} />
    </div>
  );
}
