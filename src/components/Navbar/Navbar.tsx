"use client";

import { Film } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { MenuDesktop } from "./MenuDesktop";
import { MenuMobile } from "./MenuMobile";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  console.log({ isMobileMenuOpen });

  return (
    <>
      <motion.nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky z-50 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-8">
          <div className="flex items-center justify-between h-16">
            {/* LOGO */}
            <Link href="/">
              <motion.div
                className="flex items-center space-x-2 hover:cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Film className="h-8 w-8 text-primary" />
                <span className="text-xl font-medium text-foreground">
                  MovieApp
                </span>
              </motion.div>
            </Link>

            {/* Right side */}
            <div className="hidden sm:block">
              <MenuDesktop />
            </div>

            {/* Hamburger menu */}
            <motion.button
              className="sm:hidden relative z-50"
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen((prevState) => !prevState)}
            >
              <motion.div
                className="w-6 h-6 flex items-center justify-center"
                animate={isMobileMenuOpen ? "open" : "closed"}
              >
                <motion.span
                  className="absolute block h-0.5 w-6 bg-foreground"
                  transition={{ duration: 0.3 }}
                  variants={{
                    closed: { rotate: 0, y: -6 },
                    open: { rotate: 45, y: 0 },
                  }}
                />
                <motion.span
                  className="absolute block h-0.5 w-6 bg-foreground"
                  transition={{ duration: 0.3 }}
                  variants={{
                    open: { opacity: 0 },
                    closed: { opacity: 1 },
                  }}
                />
                <motion.span
                  className="absolute block h-0.5 w-6 bg-foreground"
                  transition={{ duration: 0.3 }}
                  variants={{
                    closed: { rotate: 0, y: 6 },
                    open: { rotate: -45, y: 0 },
                  }}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MenuMobile closeMenu={() => setIsMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};
