"use client";

import {
  MovieVideosResponseType,
  MovieVideoType,
} from "@/api/movies/movieModels";
import { MovieApi } from "@/api/movies/movies";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  VIDEO_SOURCE,
  VIDEO_SOURCE_BASE_URL,
  VIDEO_TYPE,
} from "@/constants/Video";
import { NetworkLib } from "@/lib/NetworkLib";
import { useQuery } from "@tanstack/react-query";
import ReactPlayer from "react-player";
import { ClipLoader } from "react-spinners";

export const TrailerModal = ({
  id,
  isOpen,
  onOpenChange,
  title,
}: {
  id: number;
  isOpen: boolean;
  onOpenChange: () => void;
  title: string;
}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["fetchVideos"],
    queryFn: () => {
      const network = NetworkLib.withTMDBToken();
      return MovieApi.getMovieVideos(network, id);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>{title} - Official Trailer</DialogTitle>
        </DialogHeader>
        <ModalContent data={data} isLoading={isLoading} error={error} />
      </DialogContent>
    </Dialog>
  );
};

const ModalContent = ({
  data,
  isLoading,
  error,
}: {
  data: MovieVideosResponseType | undefined;
  isLoading: boolean;
  error: Error | null;
}) => {
  if (isLoading) {
    return (
      <div className="p-6 flex items-center">
        <ClipLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-muted-foreground">
        There's an error getting the trailer. Please try again
      </div>
    );
  }

  if (!data) {
    return <div className="p-6 text-muted-foreground">No trailer found</div>;
  }

  const trailers: Record<string, MovieVideoType> = {};
  for (const trailerData of data.results) {
    if ("official" in trailerData && "fanmade" in trailerData) break;
    if (trailerData.type !== VIDEO_TYPE.TRAILER) continue;
    if (trailerData.official) {
      trailers["official"] = trailerData;
    } else {
      trailers["fanmade"] = trailerData;
    }
  }

  const trailerData = trailers?.["official"] ?? trailers?.["fanmade"];

  if (!trailerData) {
    return <div className="p-6 text-muted-foreground">No trailer found</div>;
  }

  const trailerUrl = (() => {
    switch (trailerData.site) {
      case VIDEO_SOURCE.YOUTUBE:
        return VIDEO_SOURCE_BASE_URL.YOUTUBE + trailerData.key;
      case VIDEO_SOURCE.VIMEO:
        return VIDEO_SOURCE_BASE_URL.VIMEO + trailerData.key;
      default:
        return null;
    }
  })();

  return (
    <div className="p-6">
      <div className="aspect-video bg-black rounded-lg overflow-hidden">
        <ReactPlayer
          src={trailerUrl ?? undefined}
          controls
          width="100%"
          fallback={<ClipLoader />}
        />
      </div>
    </div>
  );
};
