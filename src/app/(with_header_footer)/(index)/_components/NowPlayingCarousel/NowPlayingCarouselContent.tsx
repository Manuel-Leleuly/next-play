"use client";

import { NowPlayingMovieType } from "@/api/movies/movieModels";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { BACKDROP_SIZE } from "@/constants/ImageSize";
import { ImageLib } from "@/lib/imageLib";
import { cn } from "@/lib/utils";
import { useConfigContext } from "@/providers/ConfigProvider";
import Autoplay from "embla-carousel-autoplay";
import { Link, Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

const getBackdropUrl = (backdropPath?: string | null) => {
  const { getDefaultImageUrl, getImageUrl } = ImageLib;
  if (!backdropPath) return getDefaultImageUrl(3000, 2000);
  return getImageUrl(BACKDROP_SIZE.w1280, backdropPath);
};

export const NowPlayingCarouselContent = ({
  nowPlayingMovies,
}: {
  nowPlayingMovies: NowPlayingMovieType[];
}) => {
  const pluginRef = useRef(Autoplay({ delay: 5000 }));
  const { genres } = useConfigContext();

  return (
    <Carousel plugins={[pluginRef.current]}>
      <CarouselContent>
        {nowPlayingMovies.map((nowPlayingMovie) => (
          <CarouselItem key={nowPlayingMovie.id}>
            <div className="relative h-[70vh] overflow-hidden">
              {/* Backdrop */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={nowPlayingMovie.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.7 }}
                >
                  <Image
                    src={getBackdropUrl(nowPlayingMovie.backdrop_path)}
                    alt={nowPlayingMovie.title}
                    fill
                    priority={false}
                    className={cn(
                      "-z-10 overflow-hidden object-cover",
                      !nowPlayingMovie.backdrop_path && "w-full h-full"
                    )}
                    unoptimized={!nowPlayingMovie.backdrop_path}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
                </motion.div>
              </AnimatePresence>

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-lg">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={"content" + nowPlayingMovie.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <motion.p
                          className="text-sm text-gray-300 mb-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          Now Playing
                        </motion.p>
                        <motion.h1
                          className="text-4xl md:text-6xl mb-4 text-white"
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          {nowPlayingMovie.title}
                        </motion.h1>
                        <motion.p
                          className="text-lg mb-2 flex space-x-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          {genres
                            .filter((genre) =>
                              nowPlayingMovie.genre_ids.includes(genre.id)
                            )
                            .map((genre) => (
                              <Badge
                                key={genre.id}
                                variant="outline"
                                className="border-white"
                              >
                                <span className="capitalize text-white">
                                  {genre.name}
                                </span>
                              </Badge>
                            ))}
                        </motion.p>
                        <motion.p
                          className="text-gray-200 mb-6 leading-relaxed line-clamp-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          {nowPlayingMovie.overview}
                        </motion.p>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          <Link href={`/${nowPlayingMovie.id}`}>
                            <Button
                              size="lg"
                              className="bg-white hover:bg-white/90 text-black"
                            >
                              <Play className="mr-2 h-5 w-5 fill-black" />
                              Watch Details
                            </Button>
                          </Link>
                        </motion.div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
