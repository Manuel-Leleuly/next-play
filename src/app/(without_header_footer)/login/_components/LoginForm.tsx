"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { motion } from "motion/react";
import { useLoginFormLogic } from "../_logic/useLoginFormLogic";

export const LoginForm = ({ requestToken }: { requestToken: string }) => {
  const {
    form,
    isPasswordShown,
    onChangePasswordVisibility,
    isLoading,
    error,
  } = useLoginFormLogic(requestToken);

  const getErrorMessage = () => {
    if (axios.isAxiosError(error)) {
      const { response } = error;
      if (!response) return "";

      if (response.status === 401 && response.data.status_code === 30) {
        return "Invalid username and/or password";
      } else if (response.status.toString()[0] === "5") {
        return "Internal server error. Please try again!";
      }
    }
    return "";
  };

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field name="request_token">
        {(field) => <input type="hidden" value={field.state.value} />}
      </form.Field>

      <form.Field name="username">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={(e) => {
                e.preventDefault();
                field.handleChange(e.target.value);
              }}
              placeholder="Enter your username"
              className="w-full"
              disabled={isLoading}
            />
            {!!field.state.meta.errors.length && (
              <em className="text-red-500">
                {field.state.meta.errors
                  .map((error) => error?.message)
                  .join(", ")}
              </em>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="password">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                type={isPasswordShown ? "text" : "password"}
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => {
                  e.preventDefault();
                  field.handleChange(e.target.value);
                }}
                placeholder="Enter your password"
                className="w-full pr-10"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={onChangePasswordVisibility}
                disabled={isLoading}
              >
                {isPasswordShown ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
            {!!field.state.meta.errors.length && (
              <em className="text-red-500">
                {field.state.meta.errors
                  .map((error) => error?.message)
                  .join(", ")}
              </em>
            )}
          </div>
        )}
      </form.Field>

      <div className="flex flex-col space-y-2">
        <Button
          type="submit"
          className="w-full"
          disabled={!form.state.isFieldsValid || isLoading}
        >
          {isLoading ? (
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              <span>Signing in...</span>
            </motion.div>
          ) : (
            <>
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </>
          )}
        </Button>
        <em className="text-red-500">{getErrorMessage()}</em>
      </div>
    </form>
  );
};
