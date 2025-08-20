import { addOrRemoveFavorite } from "@/actions/action";
import { getQueryClient } from "@/lib/reactQueryLib";
import { useConfigContext } from "@/providers/ConfigProvider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const useAddRemoveFavoritesLogic = (isAlreadyFavorite?: boolean) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(!!isAlreadyFavorite);
  const { userDetail } = useConfigContext();
  const queryClient = getQueryClient();

  const addOrRemoveMutation = useMutation({
    mutationKey: ["addOrRemoveMovieToFavorites"],
    mutationFn: async (movieId: number) => {
      if (!userDetail) {
        router.push("/login");
        throw new Error("user is not logged in");
      }
      await addOrRemoveFavorite({
        account_id: userDetail.id,
        session_id: userDetail.session_id,
        req_body: {
          favorite: !isFavorite,
          media_id: movieId,
          media_type: "movie",
        },
      });
    },
    onSuccess: () => {
      setIsFavorite((prevState) => !prevState);
      queryClient.invalidateQueries({ queryKey: ["infiniteFavorites"] });

      let message = "Movie is successfully added to favorites";
      if (isFavorite) {
        message = "Movie is successfully removed from favorites";
      }

      toast.success(message);
    },
    onError: () => {
      let message = "Failed to add movie to favorites";
      if (isFavorite) {
        message = "Failed to remove movie to favorites";
      }
      toast.error(message);
    },
  });

  return { addOrRemoveMutation, isFavorite };
};
