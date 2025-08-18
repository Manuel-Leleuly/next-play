"use client";

import { Filters } from "@/app/(with_header_footer)/(index)/_components/Filters/Filters";
import {
  Funnel,
  Heart,
  LogOut,
  Moon,
  Search,
  Settings,
  Sun,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { SearchBar } from "./SearchBar/SearchBar";

export const MenuMobile = ({ closeMenu }: { closeMenu: () => void }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 sm:hidden top-[56px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-background/95 backdrop-blur-sm h-full overflow-y-auto"
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="p-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Accordion type="single" collapsible>
              <AccordionItem value="search">
                <AccordionTrigger>
                  <div className="text-lg flex items-center justify-start space-x-3">
                    <Search className="w-5 h-5 text-muted-foreground" />
                    <span>Search movies</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <SearchBar />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="filter">
                <AccordionTrigger className="text-lg">
                  <div className="text-lg flex items-center justify-start space-x-3">
                    <Funnel className="w-5 h-5 text-muted-foreground" />
                    <span>Filter movies</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Filters />
                </AccordionContent>
              </AccordionItem>

              {/* Avatar */}
              <AccordionItem value="avatar">
                <AccordionTrigger>
                  <div className="text-lg flex items-center justify-start space-x-3">
                    <Avatar className="bg-white p-1">
                      <AvatarImage src={"/avatar.svg"} />
                    </Avatar>
                    <span>Account</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <AnimatePresence>
                    <motion.div
                      className="space-y-2 pl-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <button className="w-full flex items-center space-x-3 p-3 hover:bg-accent rounded-md transition-colors">
                        <Settings className="h-5 w-5 text-muted-foreground" />
                        <span className="text-lg">Settings</span>
                      </button>
                      <button
                        className="w-full flex items-center space-x-3 p-3 hover:bg-accent rounded-md transition-colors"
                        onClick={toggleTheme}
                      >
                        {theme === "light" ? (
                          <Moon className="mr-2 h-5 w-5" />
                        ) : (
                          <Sun className="mr-2 h-5 w-5" />
                        )}
                        <span className="text-lg">
                          {theme === "light" ? "Dark mode" : "Light mode"}
                        </span>
                      </button>
                      <div className="border-t border-border pt-2">
                        <button className="w-full flex items-center space-x-3 p-3 hover:bg-accent rounded-md transition-colors text-destructive">
                          <LogOut className="h-5 w-5" />
                          <span className="text-lg">Log out</span>
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>

          <Link href={"/favorites"} onClick={closeMenu}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button className="w-full flex justify-start items-center space-x-3 px-4 py-8 bg-foreground rounded-lg hover:bg-muted transition-color">
                <Heart className="h-7 w-7 text-white dark:text-black" />
                <span className="text-white dark:text-black text-lg">
                  My Favorites
                </span>
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};
