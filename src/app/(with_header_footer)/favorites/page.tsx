"use client";

import { EmptyFavoritesMessage } from "./_components/EmptyFavoritesMessage";
import { Header } from "./_components/Header";
import { InfiniteFavoriteMovies } from "./_components/InfiniteFavoriteMovies";
import { Statistics } from "./_components/Statistics";
import { useFavoriteMoviesLogic } from "./logic/useFavoriteMoviesLogic";

export default function FavoritesPage() {
  const { allMovies, isLoading, error, hasNextPage, fetchNextPage } =
    useFavoriteMoviesLogic();

  if (!allMovies.length && !isLoading) {
    return <EmptyFavoritesMessage />;
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header totalMovies={allMovies.length} />

        <Statistics favoriteMovies={allMovies} />

        <InfiniteFavoriteMovies
          allMovies={allMovies}
          isLoading={isLoading}
          error={error}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      </div>
    </div>
  );
}
