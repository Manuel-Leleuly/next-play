"use client";

import { GenresResponseType } from "@/api/movies/movieModels";
import { MovieApi } from "@/api/movies/movies";
import { TmdbApi } from "@/api/tmdb/tmdb";
import { TmdbConfigType, UserDetailType } from "@/api/tmdb/tmdbModels";
import { NetworkLib } from "@/lib/NetworkLib";
import { UserCookiesType } from "@/models/fetchModels";
import { useQueries } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useMemo } from "react";

interface ConfigContextType {
  genres: GenresResponseType["genres"];
  config: TmdbConfigType | null;
  userDetail:
    | (UserDetailType & { username: string; session_id: string })
    | null;
  hasUserDetail: boolean;
  isAllLoading: boolean;
}

const ConfigContext = createContext<ConfigContextType>({} as ConfigContextType);

export const useConfigContext = () => useContext(ConfigContext);

export const ConfigContextProvider = ({
  children,
  userCookies,
}: {
  children: ReactNode;
  userCookies?: UserCookiesType;
}) => {
  const fetchGenres = async () => {
    try {
      const network = NetworkLib.withTMDBToken();
      return await MovieApi.getMovieGenres(network);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchConfig = async () => {
    try {
      const network = NetworkLib.withTMDBToken();
      return await TmdbApi.getConfig(network);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserDetail = async () => {
    try {
      if (!userCookies) return null;

      const network = NetworkLib.withTMDBToken();
      const result = await TmdbApi.getUserDetail(
        network,
        userCookies.session_id
      );
      return {
        ...result,
        ...userCookies,
      };
    } catch (error) {
      console.error(error);
    }
  };

  const [
    { data: genres, isLoading: isFetchingGenre },
    { data: config, isLoading: isFetchingConfig },
    { data: userDetail, isLoading: isFetchingUserDetail },
  ] = useQueries({
    queries: [
      { queryKey: ["genre"], queryFn: fetchGenres },
      { queryKey: ["config"], queryFn: fetchConfig },
      {
        queryKey: ["userDetail"],
        queryFn: fetchUserDetail,
        enabled: !!userCookies,
      },
    ],
  });

  const hasUserDetail = useMemo(() => !!userDetail, [userDetail]);
  const isAllLoading = useMemo(() => {
    return isFetchingConfig || isFetchingGenre || isFetchingUserDetail;
  }, [isFetchingConfig, isFetchingGenre, isFetchingUserDetail]);

  return (
    <ConfigContext.Provider
      value={{
        genres: genres?.genres ?? [],
        config: config ?? null,
        userDetail: userDetail ?? null,
        hasUserDetail,
        isAllLoading,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
