import { useIsMobile } from "@/hooks/use-mobile";
import { sleepAsync } from "@/lib/utils";
import { SelectOption } from "@/models/models";
import { useConfigContext } from "@/providers/ConfigProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import z from "zod";

export const Modals = z.enum(["ADULT_CONTENT_WARNING"]).enum;

export const defaultGenre: SelectOption = {
  label: "All Genres",
  value: "all",
};

export const defaultYear: SelectOption = {
  label: "All Year",
  value: "all",
};

export const useFilterLogic = () => {
  const searchParams = useSearchParams();
  const searchParamsObj = Object.fromEntries(searchParams);
  const { genres } = useConfigContext();
  const router = useRouter();
  const isMobile = useIsMobile();

  const genreOptions: SelectOption[] = [
    defaultGenre,
    ...genres.map(
      (genre): SelectOption => ({
        label: genre.name,
        value: genre.id.toString(),
      })
    ),
  ];

  const yearOptions: SelectOption[] = [defaultYear];
  for (let i = new Date().getFullYear(); i >= 1970; i--) {
    yearOptions.push({ label: i, value: i.toString() });
  }

  const [selectedGenre, setSelectedGenre] = useState<SelectOption>(() => {
    const selectedOption = genreOptions.find(
      (genreOption) => genreOption.value === searchParamsObj?.with_genres
    );
    return selectedOption ?? defaultGenre;
  });
  const [selectedYear, setSelectedYear] = useState<SelectOption>(() => {
    const selectedOption = yearOptions.find(
      (yearOption) => yearOption.value === searchParamsObj?.year
    );
    return selectedOption ?? defaultYear;
  });
  const [isAdultContentEnabled, setIsAdultContentEnabled] = useState(
    searchParamsObj?.adult_content_enabled === "true"
  );
  const [selectedModal, setSelectedModal] = useState<
    keyof typeof Modals | null
  >(null);

  useEffect(() => {
    const queryParams: Record<string, string> = {};

    if (selectedGenre.value !== defaultGenre.value) {
      queryParams["with_genres"] = selectedGenre.value;
    }

    if (selectedYear.value !== defaultYear.value) {
      queryParams["year"] = selectedYear.value;
    }

    if (isAdultContentEnabled) {
      queryParams["adult_content_enabled"] = "true";
    }

    const searchParams = new URLSearchParams(queryParams);
    router.push("?" + searchParams.toString());
  }, [selectedGenre, selectedYear, isAdultContentEnabled]);

  const onFilterChange = (
    type: "genre" | "year" | "isAdult",
    value: string | boolean
  ) => {
    switch (type) {
      case "genre":
        const selectedGenreOption = genreOptions.find(
          (genreOption) => genreOption.value === value
        );
        setSelectedGenre((prevState) => selectedGenreOption ?? prevState);
        break;
      case "year":
        const selectedYearOption = yearOptions.find(
          (yearOption) => yearOption.value === value
        );
        setSelectedYear((prevState) => selectedYearOption ?? prevState);
        break;
      case "isAdult":
        if (typeof value !== "boolean") return;
        if (value) setSelectedModal(Modals.ADULT_CONTENT_WARNING);
        else setIsAdultContentEnabled(false);
    }
  };

  const onModalChange = (modalName: keyof typeof Modals | null) =>
    setSelectedModal(modalName);

  const onAdultContentModalConfirm = async () => {
    setSelectedModal(null);
    await sleepAsync(1000);
    setIsAdultContentEnabled(true);
  };

  return {
    selectedGenre,
    selectedYear,
    isAdultContentEnabled,
    selectedModal,
    onFilterChange,
    genreOptions,
    yearOptions,
    onModalChange,
    onAdultContentModalConfirm,
  };
};
