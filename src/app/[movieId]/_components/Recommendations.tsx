"use client";

import { MovieType } from "@/api/movies/movieModels";
import { POSTER_SIZE } from "@/constants/ImageSize";
import { ImageLib } from "@/lib/imageLib";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const getPosterUrl = (posterPath: string | null | undefined) => {
  if (!posterPath) return ImageLib.getDefaultImageUrl(200, 300);
  return ImageLib.getImageUrl(POSTER_SIZE.W342, posterPath);
};

export const Recommendations = ({
  movieRecommendations,
}: {
  movieRecommendations: MovieType[];
}) => {
  return (
    <motion.section
      className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl text-foreground mb-8">You Might Also Like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {movieRecommendations.slice(0, 6).map((rec, index) => (
            <Link href={`/${rec.id}`} key={rec.id}>
              <motion.div
                key={rec.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={getPosterUrl(rec.poster_path)}
                    alt={rec.title}
                    fill
                    priority={false}
                    className={cn(
                      "overflow-hidden object-cover transition-transform duration-300 group-hover:scale-110",
                      !rec.poster_path && "w-full h-full"
                    )}
                    unoptimized={!rec.poster_path}
                  />
                </div>
                <div className="mt-3 space-y-1">
                  <h4 className="text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {rec.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {new Date(rec.release_date).getFullYear()}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
