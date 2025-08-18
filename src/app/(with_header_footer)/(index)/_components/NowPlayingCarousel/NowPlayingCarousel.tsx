import { NowPlayingMoviesType } from "@/api/movies/movieModels";
import { MovieApi } from "@/api/movies/movies";
import { LoadingOrErrorWrapper } from "@/components/Wrappers/LoadingOrErrorWrapper";
import { NetworkLib } from "@/lib/NetworkLib";
import { NowPlayingCarouselContent } from "./NowPlayingCarouselContent";

export const NowPlayingCarousel = async () => {
  let data: NowPlayingMoviesType | null = null;
  let fetchError: Error | null = null;

  try {
    const network = NetworkLib.withTMDBToken();
    data = await MovieApi.getNowPlayingMovies(network);
  } catch (error) {
    fetchError = error as Error;
  }

  return (
    <LoadingOrErrorWrapper isLoading={false} error={fetchError}>
      <NowPlayingCarouselContent nowPlayingMovies={data?.results ?? []} />
    </LoadingOrErrorWrapper>
  );
};
