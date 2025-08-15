"use client";

import { GenresResponseType } from "@/api/movies/movieModels";
import { MovieApi } from "@/api/movies/movies";
import { TmdbApi } from "@/api/tmdb/tmdb";
import { TmdbConfigType } from "@/api/tmdb/tmdbModels";
import { NetworkLib } from "@/lib/NetworkLib";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ConfigContextType {
  genres: GenresResponseType["genres"];
  config: TmdbConfigType | null;
}

const ConfigContext = createContext<ConfigContextType>({} as ConfigContextType);

export const useConfigContext = () => useContext(ConfigContext);

export const ConfigContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [genres, setGenres] = useState<GenresResponseType["genres"]>([]);
  const [config, setConfig] = useState<TmdbConfigType | null>(null);

  const fetchGenres = async () => {
    try {
      const network = NetworkLib.withTMDBToken();
      const result = await MovieApi.getMovieGenres(network);
      setGenres(result.genres);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchConfig = async () => {
    try {
      const network = NetworkLib.withTMDBToken();
      const result = await TmdbApi.getConfig(network);
      setConfig(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGenres();
    fetchConfig();
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        config,
        genres,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
