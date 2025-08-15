"use client";

import { MovieType } from "@/api/movies/movieModels";
import { useIsMobile } from "@/hooks/use-mobile";
import { AnimatePresence, motion } from "motion/react";
import { SearchResultContent } from "./SearchResultContent";

interface Props {
  isOpen: boolean;
  movies: MovieType[];
  isLoading: boolean;
  error: Error | null;
}

export const SearchResult = ({ isOpen, movies, isLoading, error }: Props) => {
  const isMobile = useIsMobile();

  if (!isOpen) return;

  if (isMobile) {
    return (
      <AnimatePresence>
        <SearchResultContent
          error={error}
          isLoading={isLoading}
          movies={movies}
        />
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="absolute top-full right-0 mt-1 w-full min-w-[300px] bg-popover border border-border rounded-md shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        <SearchResultContent
          error={error}
          isLoading={isLoading}
          movies={movies}
        />
      </motion.div>
    </AnimatePresence>
  );
};
