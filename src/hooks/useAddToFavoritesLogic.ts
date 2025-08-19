import { MovieApi } from "@/api/movies/movies";
import { NetworkLib } from "@/lib/NetworkLib";
import { useConfigContext } from "@/providers/ConfigProvider";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const useAddToFavoritesLogic = (isAlreadyFavorite?: boolean) => {
  const [isFavorite, setIsFavorite] = useState(!!isAlreadyFavorite);
  const { userDetail } = useConfigContext();

  const addOrRemoveMutation = useMutation({
    mutationKey: ["addOrRemoveMovieToFavorites"],
    mutationFn: async ({
      movieId,
      isFavorite,
    }: {
      movieId: number;
      isFavorite: boolean;
    }) => {
      if (!userDetail) return;
      const network = NetworkLib.withTMDBToken();
      await MovieApi.addOrRemoveMovieFromFavorites(network, {
        account_id: userDetail.id,
        session_id: userDetail.session_id,
        req_body: {
          favorite: isFavorite,
          media_id: movieId,
          media_type: "movie",
        },
      });
    },
    onSuccess: () => {
      setIsFavorite((prevState) => !prevState);
    },
  });

  return { addOrRemoveMutation, isFavorite };
};
