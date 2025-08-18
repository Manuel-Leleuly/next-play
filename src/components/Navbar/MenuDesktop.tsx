"use client";

import { useConfigContext } from "@/providers/ConfigProvider";
import { Heart, LogIn, LogOut, Moon, Settings, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SearchBar } from "./SearchBar/SearchBar";

export const MenuDesktop = () => {
  const { hasUserDetail } = useConfigContext();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Search Bar */}
      <SearchBar />

      {/* Login Button */}
      {!hasUserDetail && (
        <Link href={"/login"}>
          <Button variant={"ghost"} className="flex items-center space-x-2">
            <LogIn className="h-4 w-4" />
            <span>Log In</span>
          </Button>
        </Link>
      )}

      {/* My Favorites */}
      {hasUserDetail && (
        <Link href={"/favorites"}>
          <Button variant={"ghost"} className="flex items-center space-x-2">
            <Heart className="h-4 w-4" />
            <span>My Favorites</span>
          </Button>
        </Link>
      )}

      {/* Avatar with dropdown */}
      {hasUserDetail && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button
              className="relative hover:cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Avatar className="bg-white p-1">
                <AvatarImage src={"/avatar.svg"} />
              </Avatar>
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <Settings className="mr-2 h-2 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="mr-2 h-2 w-4" />
              ) : (
                <Sun className="mr-2 h-2 w-4" />
              )}
              <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 w-2 h-2" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
