import { Footer } from "@/components/Footer/Footer";
import { PageRouteProps } from "@/models/models";
import { Suspense } from "react";
import { ClipLoader } from "react-spinners";
import { Filters } from "./_components/Filters/Filters";
import { MovieList } from "./_components/MovieList/MovieList";
import { NowPlayingCarousel } from "./_components/NowPlayingCarousel/NowPlayingCarousel";
import { PageContainer } from "./_components/PageContainer/PageContainer";

type Props = PageRouteProps<
  undefined,
  { year: string; adult_content_enabled: string; with_genres: string }
>;

export default async function Home({ searchParams }: Props) {
  const queryParams = await searchParams;

  return (
    <PageContainer>
      <NowPlayingCarousel />
      <div className="hidden sm:block">
        <Filters />
      </div>
      <Suspense
        fallback={
          <div className="w-full flex justify-center">
            <ClipLoader />
          </div>
        }
      >
        <MovieList searchParams={queryParams} />
      </Suspense>
      <Footer />
    </PageContainer>
  );
}
