"use client";

import { Film } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export const LeftSide = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 items-center justify-center p-8">
      <motion.div
        className="max-w-md text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="flex items-center justify-center space-x-3 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Film className="h-12 w-12 text-primary" />
          <span className="text-4xl font-medium text-foreground">MovieApp</span>
        </motion.div>

        <motion.div
          className="space-y-4 flex flex-col justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl text-foreground">
            Discover Your Next Favorite Movie
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Access thousands of movies, create your personal watchlist, and
            discover new content tailored just for you.
          </p>
          <div className="flex space-x-2 mx-auto items-center">
            <p className="text-base text-muted-foreground leading-relaxed">
              Powered by
            </p>
            <Link
              href={"https://www.themoviedb.org/"}
              target="_blank"
              className="w-24"
            >
              <img src={"/tmdb.svg"} alt="tmbd-logo" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
