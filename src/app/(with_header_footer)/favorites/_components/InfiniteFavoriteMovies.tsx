"use client";

import { MoviesResponseType, MovieType } from "@/api/movies/movieModels";
import { LoadingOrErrorWrapper } from "@/components/Wrappers/LoadingOrErrorWrapper";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";
import { FavoriteMovieCard } from "./FavoriteMovieCard";

export const InfiniteFavoriteMovies = ({
  allMovies,
  isLoading,
  error,
  hasNextPage,
  fetchNextPage,
}: {
  allMovies: MovieType[];
  isLoading: boolean;
  error: Error | null;
  hasNextPage: boolean;
  fetchNextPage: ReturnType<
    typeof useInfiniteQuery<MoviesResponseType | undefined>
  >["fetchNextPage"];
}) => {
  return (
    <LoadingOrErrorWrapper isLoading={isLoading} error={error}>
      <AnimatePresence mode="wait">
        <InfiniteScroll
          dataLength={allMovies.length}
          hasMore={hasNextPage}
          next={fetchNextPage}
          loader={
            <div className="flex items-center justify-center p-8">
              <ClipLoader />
            </div>
          }
          className="w-full min-h-screen"
        >
          <motion.div
            key="grid"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {allMovies.map((movie, index) => (
              <FavoriteMovieCard movie={movie} key={movie.id} />
            ))}
          </motion.div>
        </InfiniteScroll>
      </AnimatePresence>
    </LoadingOrErrorWrapper>
  );
};
