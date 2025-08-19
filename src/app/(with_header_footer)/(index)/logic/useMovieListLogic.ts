import { MovieType } from "@/api/movies/movieModels";
import { MovieApi } from "@/api/movies/movies";
import { NetworkLib } from "@/lib/NetworkLib";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useMovieListLogic = (serverMovies: MovieType[]) => {
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams);

  const { adult_content_enabled, year, with_genres } = queryParams;

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["infinitePosts"],
    queryFn: async ({ pageParam = 2 }) => {
      const network = NetworkLib.withTMDBToken();
      return await MovieApi.getAllMovies(network, {
        page: pageParam,
        include_adult: adult_content_enabled === "true",
        year: year ? parseInt(year) : undefined,
        with_genres,
      });
    },
    initialPageParam: 2,
    getNextPageParam: (lastPage) => {
      if (lastPage.page !== lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
  });

  const allMovies = serverMovies.concat(
    data?.pages.flatMap((page) => page.results) ?? []
  );

  return {
    allMovies,
    hasNextPage,
    fetchNextPage,
  };
};
