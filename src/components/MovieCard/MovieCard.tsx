"use client";

import { POSTER_SIZE } from "@/constants/ImageSize";
import { ImageLib } from "@/lib/imageLib";
import { cn } from "@/lib/utils";
import { useConfigContext } from "@/providers/ConfigProvider";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { AddToFavorites } from "./AddToFavorites";

export const MovieCard = ({
  id,
  title,
  genreIds,
  posterPath,
}: {
  id: number;
  title: string;
  genreIds: number[];
  posterPath?: string | null;
}) => {
  const { genres } = useConfigContext();
  const posterUrl = posterPath
    ? ImageLib.getImageUrl(POSTER_SIZE.W342, posterPath)
    : ImageLib.getDefaultImageUrl(342, 500);

  return (
    <Link href={`/${id}`}>
      <motion.div
        key={id}
        className={cn(
          "relative group cursor-pointer aspect-[2/3] max-w-49 max-h-73 mx-auto rounded-lg overflow-hidden"
        )}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* POSTER */}
        <AnimatePresence mode="wait">
          <motion.div
            key={id}
            className="absolute inset-0 overflow-hidden rounded-lg"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src={posterUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
              className={cn(
                "overflow-hidden",
                !posterPath && "w-full h-full object-cover"
              )}
              unoptimized={!posterPath}
            />
          </motion.div>
        </AnimatePresence>

        {/* DESCRIPTION */}
        <motion.div
          className="absolute inset-0 bg-black/70 flex flex-col justify-between p-2 pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div className="flex justify-end">
            <AddToFavorites />
          </div>
          <div className="flex flex-col space-y-2">
            <p className="overflow-hidden line-clamp-1 text-sm text-white">
              {title}
            </p>
            <div className="flex gap-2 flex-wrap">
              {genres
                .filter((genre) => genreIds.includes(genre.id))
                .map((genre) => (
                  <Badge
                    key={genre.id}
                    variant="outline"
                    className="border-white text-white"
                  >
                    {genre.name}
                  </Badge>
                ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
};
