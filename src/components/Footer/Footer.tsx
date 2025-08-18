"use client";

import { Film } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            className="col-span-1 md:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <Film className="h-8 w-8 text-primary" />
              <span className="text-xl font-medium text-foreground">
                MovieApp
              </span>
            </div>
            <p className="text-muted-foreground mb-2 max-w-md">
              Discover amazing movies, create your personal watchlist, and dive
              into the world of cinema. Your next favorite film is just a click
              away.
            </p>
            <p className="text-muted-foreground text-sm mb-4 italic">
              DISCLAIMER: This product uses the TMDB API but is not endorsed or
              certified by TMDB.
            </p>
            <div className="flex space-x-4">
              {[FiGithub, FaXTwitter, FaInstagram].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-2 sm:space-y-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground text-sm">
            © {currentYear} MovieApp. All rights reserved.
          </p>

          <div className="flex items-center justify-between space-x-3">
            <p className="text-muted-foreground text-sm text-nowrap">
              Powered by
            </p>
            <Link
              href={"https://www.themoviedb.org/"}
              target="_blank"
              className="w-24"
            >
              <img src={"/tmdb.svg"} />
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
