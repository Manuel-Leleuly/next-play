"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

export const PageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      className="min-h-screen bg-background transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
