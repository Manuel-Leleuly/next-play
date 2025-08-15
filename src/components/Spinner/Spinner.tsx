"use client";

import { useTheme } from "next-themes";
import { ClipLoader } from "react-spinners";

export const Spinner = () => {
  const { theme } = useTheme();

  return <ClipLoader color={theme === "light" ? "#000000" : "#ffffff"} />;
};
