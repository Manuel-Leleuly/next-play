"use client";

import { globalVar } from "@/constants/globalVar";
import { ExternalLink, Film } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { LoginForm } from "./LoginForm";

export const RightSide = ({ requestToken }: { requestToken: string }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
      <motion.div
        className="w-full max-w-md space-y-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Mobile Logo */}
        <div className="flex items-center justify-center space-x-3 mb-8 lg:hidden">
          <Film className="h-8 w-8 text-primary" />
          <span className="text-2xl font-medium text-foreground">MovieApp</span>
        </div>

        {/* Header */}
        <div className="space-y-2 text-center lg:text-left">
          <h1 className="text-2xl text-foreground">Welcome back</h1>
          <p className="text-base text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Form */}
        <LoginForm requestToken={requestToken} />

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don&lsquo;t have an account?{" "}
            <Link
              href={globalVar.TMDB_SIGN_UP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors"
            >
              <span>Sign up here</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
