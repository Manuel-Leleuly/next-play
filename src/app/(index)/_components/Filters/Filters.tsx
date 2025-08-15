"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { TbRating18Plus } from "react-icons/tb";
import { AdultContentWarningModal } from "./AdultContentWarningModal";
import { Modals, useFilterLogic } from "./logic/useFilterLogic";

export const Filters = () => {
  const {
    selectedGenre,
    selectedModal,
    selectedYear,
    onFilterChange,
    genreOptions,
    yearOptions,
    isAdultContentEnabled,
    onModalChange,
    onAdultContentModalConfirm,
  } = useFilterLogic();

  return (
    <>
      <motion.section
        className="py-8 px-4 sm:px-6 lg:px-8 bg-muted/20 sm:border-y sm:border-border"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-center gap-10 sm:gap-4 lg:gap-6">
            {/* Genre Filter */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center space-x-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Label
                htmlFor="genre"
                className="text-lg sm:text-sm text-muted-foreground whitespace-nowrap"
              >
                Genre:
              </Label>
              <Select
                value={selectedGenre.value}
                onValueChange={(value) => onFilterChange("genre", value)}
              >
                <SelectTrigger
                  className={cn(
                    "w-full text-xl data-[size=default]:h-fit bg-accent [&_svg]:size-8",
                    "sm:w-[140px] sm:bg-transparent sm:text-sm sm:data-[size=default]:h-9 sm:[&_svg]:size-4"
                  )}
                  id="genre"
                >
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  {genreOptions.map((genreOption) => (
                    <SelectItem
                      key={genreOption.value}
                      value={genreOption.value}
                      className="text-md"
                    >
                      {genreOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            {/* Year Filter */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center space-x-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Label
                htmlFor="year"
                className="text-lg sm:text-sm text-muted-foreground whitespace-nowrap"
              >
                Release Year:
              </Label>
              <Select
                value={selectedYear.value}
                onValueChange={(value) => onFilterChange("year", value)}
              >
                <SelectTrigger
                  className={cn(
                    "w-full text-xl data-[size=default]:h-fit bg-accent [&_svg]:size-8",
                    "sm:w-[140px] sm:bg-transparent sm:text-sm sm:data-[size=default]:h-9 sm:[&_svg]:size-4"
                  )}
                  id="year"
                >
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map((yearOption) => (
                    <SelectItem
                      key={yearOption.value}
                      value={yearOption.value}
                      className="text-md"
                    >
                      {yearOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            {/* Adult content toggle */}
            <motion.div
              className="flex items-center justify-between sm:justify-start space-x-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-start space-x-3">
                <TbRating18Plus className="h-10 w-10 sm:h-6 sm:w-6 text-red-500" />
                <Label
                  htmlFor="adultContent"
                  className="text-xl sm:text-sm text-muted-foreground whitespace-nowrap"
                >
                  Explicit Content:
                </Label>
              </div>
              <Switch
                id="adult"
                checked={isAdultContentEnabled}
                onCheckedChange={(checked) =>
                  onFilterChange("isAdult", checked)
                }
                className="h-8 w-14 [&>span]:size-6 sm:h-5 sm:w-8 sm:[&>span]:size-4"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>
      <AdultContentWarningModal
        isOpen={selectedModal === Modals.ADULT_CONTENT_WARNING}
        onCancel={() => onModalChange(null)}
        onConfirm={onAdultContentModalConfirm}
      />
    </>
  );
};
