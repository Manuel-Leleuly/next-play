"use server";

import { AddOrRemoveFavoritesReqType } from "@/api/movies/movieModels";
import { MovieApi } from "@/api/movies/movies";
import { NetworkLib } from "@/lib/NetworkLib";
import { revalidatePath } from "next/cache";

export const addOrRemoveFavorite = async (
  data: AddOrRemoveFavoritesReqType
) => {
  const network = NetworkLib.withTMDBToken();
  await MovieApi.addOrRemoveMovieFromFavorites(network, data);
  revalidatePath("/favorite");
};
