"use client";

import { MovieType } from "@/api/movies/movieModels";
import { POSTER_SIZE } from "@/constants/ImageSize";
import { ImageLib } from "@/lib/imageLib";
import { cn } from "@/lib/utils";
import { useConfigContext } from "@/providers/ConfigProvider";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ClipLoader } from "react-spinners";

const getPosterUrl = (posterPath?: string | null) => {
  if (!posterPath) return ImageLib.getDefaultImageUrl(300, 400);
  return ImageLib.getImageUrl(POSTER_SIZE.W154, posterPath);
};

export const SearchResultContent = ({
  movies,
  isLoading,
  error,
}: {
  movies: MovieType[];
  isLoading: boolean;
  error: Error | null;
}) => {
  const { genres } = useConfigContext();

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-4">
        <ClipLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center text-wrap py-4">
        An error occured. Please try again
      </div>
    );
  }

  if (!movies.length) {
    return (
      <div className="w-full flex justify-center text-wrap py-4 text-lg">
        No movies available
      </div>
    );
  }

  return (
    <>
      {movies.map((movie) => (
        <Link href={`/${movie.id}`} key={movie.id}>
          <motion.div
            key={movie.id}
            className={cn(
              "relative group cursor-pointer w-full px-4 pb-2 pt-6 sm:pt-2 flex items-center space-x-3"
            )}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Poster */}
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden w-36">
              <AnimatePresence mode="wait">
                <motion.div
                  key={movie.id}
                  className="absolute inset-0 overflow-hidden rounded-lg"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.7 }}
                >
                  <Image
                    src={getPosterUrl(movie.poster_path)}
                    alt={movie.title}
                    fill
                    priority={false}
                    className={cn(
                      "overflow-hidden",
                      !movie.poster_path && "w-full h-full object-cover"
                    )}
                    unoptimized={!movie.poster_path}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* INFO */}
            <AnimatePresence mode="wait">
              <motion.div
                className="w-full flex flex-col space-y-1"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7 }}
              >
                <p className="overflow-hidden line-clamp-3 text-lg font-bold text-muted-foreground">
                  {movie.title}
                </p>
                <p className="text-muted-foreground">
                  {new Date(movie.release_date).getFullYear()}
                </p>
                <p className="text-wrap text-[12px] text-muted-foreground">
                  {genres
                    .filter((genres) => movie.genre_ids.includes(genres.id))
                    .map((genre) => genre.name)
                    .join(", ")}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </Link>
      ))}
    </>
  );
};
