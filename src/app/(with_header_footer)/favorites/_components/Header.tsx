"use client";

import { Heart } from "lucide-react";
import { motion } from "motion/react";

export const Header = ({ totalMovies }: { totalMovies: number }) => {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-2">
          <h1 className="text-foreground flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-500 fill-current" />
            My Favorites
          </h1>
          <p className="text-base text-muted-foreground">
            Your personal collection of {totalMovies} favorite movie
            {totalMovies !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
