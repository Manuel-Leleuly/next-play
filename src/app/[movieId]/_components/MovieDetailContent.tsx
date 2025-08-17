"use client";

import { MovieCastsAndCrewsType, MovieType } from "@/api/movies/movieModels";
import { motion } from "motion/react";
import { Casts } from "./Casts";
import { SynopsisAndDetails } from "./SynopsisAndDetails";

export const MovieDetailContent = ({
  movie,
  credits,
}: {
  movie: MovieType;
  credits: MovieCastsAndCrewsType;
}) => {
  let director = "";
  const writers: string[] = [];

  for (const crew of credits.crew) {
    switch (crew.job.toLowerCase()) {
      case "director":
        director = crew.name;
        break;
      case "writer":
        writers.push(crew.name);
        break;
      default:
        break;
    }
  }

  return (
    <motion.section
      className="py-16 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Synopsis and Details */}
          <SynopsisAndDetails
            director={director}
            writers={writers}
            overview={movie.overview}
          />

          {/* Right Column - Cast */}
          <Casts casts={credits.cast} />
        </div>
      </div>
    </motion.section>
  );
};
