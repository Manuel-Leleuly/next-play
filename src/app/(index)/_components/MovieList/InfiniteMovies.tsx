"use client";

import { MovieType } from "@/api/movies/movieModels";
import { MovieApi } from "@/api/movies/movies";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import { LoadingOrErrorWrapper } from "@/components/Wrappers/LoadingOrErrorWrapper";
import { NetworkLib } from "@/lib/NetworkLib";
import { cn } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";

export const InfiniteMovies = ({
  serverMovies,
}: {
  serverMovies: MovieType[];
}) => {
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams);

  const { adult_content_enabled, year, with_genres } = queryParams;

  const { data, error, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
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

  return (
    <InfiniteScroll
      dataLength={allMovies.length}
      hasMore={hasNextPage}
      next={fetchNextPage}
      loader={
        <div className="flex items-center justify-center p-8">
          <ClipLoader />
        </div>
      }
      className="w-full"
    >
      <div
        className={cn(
          "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6 mt-2"
        )}
      >
        <LoadingOrErrorWrapper isLoading={status === "pending"} error={error}>
          {allMovies.map((movie, index) => (
            <MovieCard
              key={movie.id + movie.original_title + index}
              id={movie.id}
              genreIds={movie.genre_ids}
              title={movie.title}
              posterPath={movie.poster_path}
            />
          ))}
        </LoadingOrErrorWrapper>
      </div>
    </InfiniteScroll>
  );
};
