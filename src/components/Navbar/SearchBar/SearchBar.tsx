"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { Input } from "../../ui/input";
import { SearchResult } from "./SearchResult";
import { useMovieSearchLogic } from "./logic/useMovieSearchLogic";

export const SearchBar = () => {
  const {
    form,
    query,
    onChangeQuery,
    onInputFocusOrBlur,
    data,
    error,
    isLoading,
    isResultOpen,
  } = useMovieSearchLogic();

  return (
    <div className="relative">
      <motion.form
        className="relative w-full sm:w-[200px] sm:focus:w-[280]"
        transition={{ duration: 0.2 }}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <form.Field
          name="searchQuery"
          validators={{
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: async ({ value }) => onChangeQuery(value),
          }}
        >
          {(field) => (
            <div>
              <Search
                className={cn(
                  "absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground",
                  "sm:h-4 sm:w-4"
                )}
              />
              <Input
                type="text"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => {
                  e.preventDefault();
                  field.handleChange(e.target.value);
                }}
                placeholder="Search movies..."
                className={cn("pl-10 pr-4 w-full text-lg bg-muted")}
                onBlur={() => onInputFocusOrBlur(false)}
                onFocus={() => onInputFocusOrBlur(true)}
              />
            </div>
          )}
        </form.Field>
      </motion.form>

      <SearchResult
        error={error}
        isLoading={isLoading}
        movies={data?.results.slice(0, 3) ?? []}
        isOpen={!!query && isResultOpen}
      />
    </div>
  );
};
