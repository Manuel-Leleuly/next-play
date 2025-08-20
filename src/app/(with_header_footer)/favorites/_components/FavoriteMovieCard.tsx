"use client";

import { MovieType } from "@/api/movies/movieModels";
import { POSTER_SIZE } from "@/constants/ImageSize";
import { useAddRemoveFavoritesLogic } from "@/hooks/useAddOrRemoveFavoritesLogic";
import { ImageLib } from "@/lib/imageLib";
import { cn } from "@/lib/utils";
import { useConfigContext } from "@/providers/ConfigProvider";
import { Star, X } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const getPosterUrl = (posterPath: string | null | undefined) => {
  if (!posterPath) return ImageLib.getDefaultImageUrl(200, 300);
  return ImageLib.getImageUrl(POSTER_SIZE.W342, posterPath);
};

export const FavoriteMovieCard = ({ movie }: { movie: MovieType }) => {
  const { genres } = useConfigContext();
  const router = useRouter();
  const { addOrRemoveMutation } = useAddRemoveFavoritesLogic(true);

  return (
    <motion.div
      key={movie.id}
      className="group relative cursor-pointer mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => router.push(`/${movie.id}`)}
    >
      <div className="w-49 h-73 aspect-[2/3] rounded-lg overflow-hidden bg-muted relative">
        <Image
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title}
          fill
          priority={false}
          className={cn(
            "overflow-hidden object-cover transition-transform duration-300 group-hover:scale-110",
            !movie.poster_path && "w-full h-full"
          )}
          unoptimized={!movie.poster_path}
        />

        {/* Adult content indicator */}
        {movie.adult && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-red-600 text-white text-xs rounded">
            🔞
          </div>
        )}

        {/* Remove button */}
        <motion.button
          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:cursor-pointer disabled:bg-muted-foreground disabled:cursor-not-allowed"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addOrRemoveMutation.mutate(movie.id);
          }}
          disabled={addOrRemoveMutation.isPending}
        >
          <X className="h-3 w-3" />
        </motion.button>

        {/* Rating badge */}
        <div className="absolute bottom-2 left-2 flex items-center space-x-1 bg-black/70 text-white px-2 py-1 rounded text-xs">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <h4 className="text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {movie.title}
        </h4>
        <p className="text-xs text-muted-foreground">
          {new Date(movie.release_date).getFullYear()}
        </p>
        <p className="text-xs text-muted-foreground">
          {genres
            .filter((genre) => movie.genre_ids?.includes(genre.id))
            .map((genre) => genre.name)
            .join(", ")}
        </p>
      </div>
    </motion.div>
  );
};
