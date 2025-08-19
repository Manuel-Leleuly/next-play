import { MovieType } from "@/api/movies/movieModels";
import { MovieApi } from "@/api/movies/movies";
import { NetworkLib } from "@/lib/NetworkLib";
import { useConfigContext } from "@/providers/ConfigProvider";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useFavoriteMoviesLogic = () => {
  const { userDetail, isAllLoading } = useConfigContext();

  const [isAllowedRun, setIsAllowedRun] = useState(false);

  useEffect(() => {
    if (!isAllLoading) setIsAllowedRun(true);
  }, [isAllLoading]);

  const { data, error, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["infiniteFavorites"],
      queryFn: async ({ pageParam = 1 }) => {
        if (!userDetail) return;
        const network = NetworkLib.withTMDBToken();
        return await MovieApi.getFavoriteMovies(network, userDetail.id ?? 0, {
          page: pageParam,
          session_id: userDetail?.session_id,
        });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        if (!lastPage) return;
        if (
          lastPage.total_pages === 0 ||
          lastPage.page === lastPage.total_pages
        ) {
          return;
        }
        return lastPageParam + 1;
      },
      enabled: isAllowedRun,
    });

  const allMovies: MovieType[] = [];
  data?.pages.forEach((page) => {
    if (page) {
      allMovies.push(...page.results);
    }
  });

  return {
    allMovies,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
  };
};
