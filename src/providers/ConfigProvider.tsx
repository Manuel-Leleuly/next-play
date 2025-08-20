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
  userDetail,
}: {
  children: ReactNode;
  userCookies?: UserCookiesType;
  userDetail:
    | (UserDetailType & { username: string; session_id: string })
    | null;
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

  const [
    { data: genres, isLoading: isFetchingGenre },
    { data: config, isLoading: isFetchingConfig },
  ] = useQueries({
    queries: [
      { queryKey: ["genre"], queryFn: fetchGenres },
      { queryKey: ["config"], queryFn: fetchConfig },
    ],
  });

  const hasUserDetail = useMemo(() => !!userDetail, [userDetail]);
  const isAllLoading = useMemo(() => {
    return isFetchingConfig || isFetchingGenre;
  }, [isFetchingConfig, isFetchingGenre]);

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
