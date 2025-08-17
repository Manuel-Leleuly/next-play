"use client";

import { MovieType } from "@/api/movies/movieModels";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BACKDROP_SIZE } from "@/constants/ImageSize";
import { ImageLib } from "@/lib/imageLib";
import { cn } from "@/lib/utils";
import { ArrowLeft, Calendar, Clock, Heart, Play, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import z from "zod";
import { AdultContentWarningModal } from "./modals/AdultContentWarningModal";
import { TrailerModal } from "./modals/TrailerModal";

const getBackdropUrl = (backdropPath: string | null | undefined) => {
  if (!backdropPath) return ImageLib.getDefaultImageUrl(5000, 3000);
  return ImageLib.getImageUrl(BACKDROP_SIZE.w1280, backdropPath);
};

const Modals = z.enum(["TRAILER", "ADULT_CONTENT"]).enum;

export const MovieDetailBackdrop = ({ movie }: { movie: MovieType }) => {
  const router = useRouter();

  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedModal, setSelectedModal] = useState<
    keyof typeof Modals | null
  >(null);

  return (
    <>
      <motion.section
        className="relative h-[70vh] md:h-[80vh] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Backdrop */}
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src={getBackdropUrl(movie.backdrop_path)}
              alt={movie.title}
              fill
              priority={false}
              className={cn(
                "-z-10 overflow-hidden object-cover",
                !movie.backdrop_path && "w-full h-full"
              )}
              unoptimized={!movie.backdrop_path}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/60" />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
              <motion.div
                className="max-w-2xl"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* back to movies button */}
                <motion.button
                  onClick={() => router.push("/")}
                  className="mb-6 flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors hover:cursor-pointer"
                  whileHover={{ x: -4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span className="text-sm">Back to Movies</span>
                </motion.button>

                {/* info */}
                <div className="space-y-4">
                  {movie.adult && (
                    <Badge className="bg-red-600 text-white hover:bg-red-700">
                      Explicit Content
                    </Badge>
                  )}

                  <h1 className="text-4xl md:text-6xl text-foreground font-medium leading-tight">
                    {movie.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-foreground/80">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-base">
                        {Math.floor(movie.vote_average)}/10
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-base">
                        {new Date(movie.release_date).getFullYear()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-base">{movie.runtime} min</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {movie.genres?.map((genre) => (
                      <Badge key={genre.id} variant={"secondary"}>
                        <span className="capitalize text-sm">{genre.name}</span>
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={() =>
                          setSelectedModal(
                            movie.adult ? Modals.ADULT_CONTENT : Modals.TRAILER
                          )
                        }
                        size="lg"
                        className="bg-foreground text-background hover:bg-foreground/90 min-w-[140px]"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Watch Trailer
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={() => setIsFavorite((prevState) => !prevState)}
                        variant="outline"
                        size="lg"
                        className={`min-w-[160px] border-2 ${
                          isFavorite
                            ? "bg-red-50 border-red-200 text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300"
                            : "border-foreground/20 hover:border-foreground/40"
                        }`}
                      >
                        <Heart
                          className={`h-4 w-4 mr-2 ${
                            isFavorite ? "fill-current" : ""
                          }`}
                        />
                        {isFavorite
                          ? "Remove from Favorites"
                          : "Add to Favorites"}
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatePresence>
      </motion.section>

      <TrailerModal
        id={movie.id}
        isOpen={selectedModal === Modals.TRAILER}
        onOpenChange={() => setSelectedModal(null)}
        title={movie.title}
      />

      <AdultContentWarningModal
        isOpen={selectedModal === Modals.ADULT_CONTENT}
        onCancel={() => setSelectedModal(null)}
        onConfirm={() => setSelectedModal(Modals.TRAILER)}
      />
    </>
  );
};
