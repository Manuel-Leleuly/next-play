import { DynamicMetadataFunction } from "@/models/models";
import { FavoriteMoviePageContent } from "./_components/FavoriteMoviePageContent";

export const generateMetadata: DynamicMetadataFunction = async () => {
  return {
    title: "MovieApp | Favorites",
  };
};

export default function FavoritesPage() {
  return <FavoriteMoviePageContent />;
}
