import { useAddRemoveFavoritesLogic } from "@/hooks/useAddOrRemoveFavoritesLogic";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { ClipLoader } from "react-spinners";

export const AddToFavorites = ({ movieId }: { movieId: number }) => {
  const { addOrRemoveMutation, isFavorite } = useAddRemoveFavoritesLogic();

  const { isPending } = addOrRemoveMutation;

  if (isPending) {
    return (
      <div className="p-2 bg-transparent">
        <ClipLoader size={16} color="white" />
      </div>
    );
  }

  return (
    <motion.button
      className={cn(
        "p-2 rounded-full transition-colors hover:cursor-pointer relative",
        isFavorite
          ? "bg-red-500 text-white"
          : "bg-black/50 text-white hover:bg-red-500"
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addOrRemoveMutation.mutate(movieId);
      }}
      disabled={isPending}
    >
      <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
    </motion.button>
  );
};
