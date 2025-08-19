"use client";

import { MovieType } from "@/api/movies/movieModels";
import { MovieCard } from "@/components/MovieCard/MovieCard";
import { cn } from "@/lib/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";
import { useMovieListLogic } from "../../logic/useMovieListLogic";

export const InfiniteMovies = ({
  serverMovies,
}: {
  serverMovies: MovieType[];
}) => {
  const { allMovies, hasNextPage, fetchNextPage } =
    useMovieListLogic(serverMovies);

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
        {allMovies.map((movie, index) => (
          <MovieCard
            key={movie.id + movie.original_title + index}
            id={movie.id}
            genreIds={movie.genre_ids ?? []}
            title={movie.title}
            posterPath={movie.poster_path}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
};
