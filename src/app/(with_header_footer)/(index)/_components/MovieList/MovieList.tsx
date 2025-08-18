import { MovieApi } from "@/api/movies/movies";
import { NetworkLib } from "@/lib/NetworkLib";
import { InfiniteMovies } from "./InfiniteMovies";

export const MovieList = async ({
  searchParams,
}: {
  searchParams: {
    year: string;
    adult_content_enabled: string;
    with_genres: string;
  };
}) => {
  const { adult_content_enabled, with_genres, year } = searchParams;

  const network = NetworkLib.withTMDBToken();
  const { results: movies } = await MovieApi.getAllMovies(network, {
    include_adult: adult_content_enabled === "true",
    year: year ? parseInt(year) : undefined,
    with_genres,
  });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <InfiniteMovies serverMovies={movies} />
    </section>
  );
};
