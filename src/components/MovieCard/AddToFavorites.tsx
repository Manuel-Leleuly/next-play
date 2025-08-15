"use client";

import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export const AddToFavorites = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const mutation = useMutation({
    mutationKey: ["addMovieToFavorites"],
    mutationFn: async () => {
      setIsFavorite((prevState) => !prevState);
      console.log("adding movie to favorites");
    },
    onSuccess: () => {
      console.log("success");
    },
    onError: (error) => {
      setIsFavorite(false);
      console.error(error);
    },
  });

  return (
    <motion.button
      className={cn(
        "p-2 rounded-full transition-colors hover:cursor-pointer",
        isFavorite
          ? "bg-red-500 text-white"
          : "bg-black/50 text-white hover:bg-red-500"
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        mutation.mutate();
      }}
    >
      <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
    </motion.button>
  );
};
