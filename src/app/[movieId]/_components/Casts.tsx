"use client";

import { CastType } from "@/api/movies/movieModels";
import { PROFILE_SIZE } from "@/constants/ImageSize";
import { ImageLib } from "@/lib/imageLib";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";

const getAvatarUrl = (imagePath: string | null | undefined) => {
  if (!imagePath) return ImageLib.getDefaultImageUrl(100, 100);
  return ImageLib.getImageUrl(PROFILE_SIZE.W185, imagePath);
};

export const Casts = ({ casts }: { casts: CastType[] }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-foreground">Cast</h2>
      <div className="space-y-4">
        {casts.slice(0, 5).map((actor, index) => (
          <motion.div
            key={actor.id}
            className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={getAvatarUrl(actor.profile_path)}
                alt={actor.name}
                fill
                priority={false}
                className={cn(
                  "overflow-hidden object-cover",
                  !actor.profile_path && "w-full h-full"
                )}
                unoptimized={!actor.profile_path}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-base text-foreground truncate">{actor.name}</p>
              <p className="text-sm text-muted-foreground truncate">
                {actor.character}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
