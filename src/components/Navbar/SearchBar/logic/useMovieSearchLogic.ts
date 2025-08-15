import { MovieApi } from "@/api/movies/movies";
import { NetworkLib } from "@/lib/NetworkLib";
import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const useMovieSearchLogic = () => {
  const [query, setQuery] = useState("");
  const [isResultOpen, setIsResultOpen] = useState(false);
  const searchParams = useSearchParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["searchMovies", query],
    queryFn: async () => {
      const network = NetworkLib.withTMDBToken();
      return await MovieApi.getMoviesByQuery(network, {
        query,
        include_adult: searchParams.get("adult_content_enabled") === "true",
      });
    },
    enabled: !!query,
  });

  const form = useForm({
    defaultValues: {
      searchQuery: "",
    },
  });

  const onChangeQuery = (newQuery: string) => setQuery(newQuery);

  const onInputFocusOrBlur = (isFocus: boolean) => setIsResultOpen(isFocus);

  return {
    query,
    isResultOpen,
    data,
    error,
    isLoading,
    form,
    onChangeQuery,
    onInputFocusOrBlur,
  };
};
