"use client";

import { MovieType } from "@/api/movies/movieModels";
import { Card, CardContent } from "@/components/ui/card";
import { useConfigContext } from "@/providers/ConfigProvider";
import { motion } from "motion/react";
import { useMemo } from "react";

export const Statistics = ({
  favoriteMovies,
}: {
  favoriteMovies: MovieType[];
}) => {
  const { genres } = useConfigContext();

  const stats = useMemo(() => {
    const favoriteMoviesLength = favoriteMovies.length;

    const avgRating = !!favoriteMoviesLength
      ? favoriteMovies.reduce((acc, movie) => acc + movie.vote_average, 0) /
        favoriteMoviesLength
      : 0;

    let topGenre = "N/A";
    let highestGenreCount = 0;
    const genreCounts: Record<string, number> = {};
    for (const movie of favoriteMovies) {
      if (!movie.genre_ids) continue;
      for (const genreId of movie.genre_ids) {
        const selectedGenre = genres.find((genre) => genre.id === genreId);
        if (!selectedGenre) continue;

        if (!(selectedGenre.name in genreCounts)) {
          genreCounts[selectedGenre.name] = 0;
        }

        genreCounts[selectedGenre.name]++;

        if (genreCounts[selectedGenre.name] > highestGenreCount) {
          highestGenreCount = genreCounts[selectedGenre.name];
          topGenre = selectedGenre.name;
        }
      }
    }

    return {
      total: favoriteMoviesLength,
      avgRating: Math.round(avgRating * 10) / 10,
      topGenre,
      topGenreCount: highestGenreCount,
      recentlyAdded: favoriteMovies.slice(0, 3),
    };
  }, [favoriteMovies]);

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/10 border-blue-200 dark:border-blue-800">
        <CardContent className="p-4 text-center">
          <div className="space-y-1">
            <p className="text-2xl font-medium text-blue-700 dark:text-blue-300">
              {stats.total}
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Total Movies
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/10 border-yellow-200 dark:border-yellow-800">
        <CardContent className="p-4 text-center">
          <div className="space-y-1">
            <p className="text-2xl font-medium text-yellow-700 dark:text-yellow-300">
              {stats.avgRating}
            </p>
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              Avg Rating
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/10 border-purple-200 dark:border-purple-800">
        <CardContent className="p-4 text-center">
          <div className="space-y-1">
            <p className="text-xl font-medium text-purple-700 dark:text-purple-300">
              {stats.topGenre}
            </p>
            <p className="text-sm text-purple-600 dark:text-purple-400">
              Top Genre
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
