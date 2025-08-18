import { PageRouteProps } from "@/models/models";
import { Suspense } from "react";
import { PageContainer } from "../../../components/PageContainer/PageContainer";
import { Filters } from "./_components/Filters/Filters";
import { MovieList } from "./_components/MovieList/MovieList";
import { NowPlayingCarousel } from "./_components/NowPlayingCarousel/NowPlayingCarousel";

type Props = PageRouteProps<
  undefined,
  { year: string; adult_content_enabled: string; with_genres: string }
>;

export default async function Home({ searchParams }: Props) {
  const queryParams = await searchParams;

  return (
    <PageContainer>
      <Suspense>
        <NowPlayingCarousel />
      </Suspense>
      <div className="hidden sm:block">
        <Filters />
      </div>
      <Suspense>
        <MovieList searchParams={queryParams} />
      </Suspense>
    </PageContainer>
  );
}
