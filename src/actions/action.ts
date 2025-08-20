"use server";

import { AddOrRemoveFavoritesReqType } from "@/api/movies/movieModels";
import { MovieApi } from "@/api/movies/movies";
import { TmdbApi } from "@/api/tmdb/tmdb";
import { NetworkLib } from "@/lib/NetworkLib";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const addOrRemoveFavorite = async (
  data: AddOrRemoveFavoritesReqType
) => {
  const network = NetworkLib.withTMDBToken();
  await MovieApi.addOrRemoveMovieFromFavorites(network, data);
};

export const logout = async (sessionId: string) => {
  const serverCookies = await cookies();
  const network = NetworkLib.withTMDBToken();
  await TmdbApi.logout(network, sessionId);
  serverCookies.delete("user");
  revalidatePath("/");
};
