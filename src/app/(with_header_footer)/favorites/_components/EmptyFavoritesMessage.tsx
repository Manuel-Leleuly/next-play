"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export const EmptyFavoritesMessage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4">
            <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-foreground">No Favorites Yet</h1>
            <p className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
              Start building your collection by adding movies to your favorites.
              Click the heart icon on any movie to save it here.
            </p>
          </div>

          <Button onClick={() => router.push("/")} className="px-8">
            Discover Movies
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
