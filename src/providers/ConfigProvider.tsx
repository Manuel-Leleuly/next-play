"use client";

import { GenresResponseType } from "@/api/movies/movieModels";
import { MovieApi } from "@/api/movies/movies";
import { TmdbApi } from "@/api/tmdb/tmdb";
import { TmdbConfigType, UserDetailType } from "@/api/tmdb/tmdbModels";
import { useLocalStorage } from "@/hooks/useLocaleStorage";
import { NetworkLib } from "@/lib/NetworkLib";
import { useQueries } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";

interface ConfigContextType {
  genres: GenresResponseType["genres"];
  config: TmdbConfigType | null;
  userDetail: UserDetailType | null;
  hasUserDetail: boolean;
}

const ConfigContext = createContext<ConfigContextType>({} as ConfigContextType);

export const useConfigContext = () => useContext(ConfigContext);

export const ConfigContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { getValue } = useLocalStorage();

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
      const user = getValue("user");
      if (!user) return null;
      const userObj = JSON.parse(user);

      const network = NetworkLib.withTMDBToken();
      return await TmdbApi.getUserDetail(network, userObj.session_id);
    } catch (error) {
      console.error(error);
    }
  };

  const [{ data: genres }, { data: config }, { data: userDetail }] = useQueries(
    {
      queries: [
        { queryKey: ["genre"], queryFn: fetchGenres },
        { queryKey: ["config"], queryFn: fetchConfig },
        { queryKey: ["userDetail"], queryFn: fetchUserDetail },
      ],
    }
  );

  return (
    <ConfigContext.Provider
      value={{
        genres: genres?.genres ?? [],
        config: config ?? null,
        userDetail: userDetail ?? null,
        hasUserDetail: !!userDetail,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
