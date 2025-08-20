import { LoginRequestBodySchema } from "@/api/tmdb/tmdbModels";
import { useLocalStorage } from "@/hooks/useLocaleStorage";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { submitLogin } from "../actions";

export const useLoginFormLogic = (requestToken: string) => {
  const router = useRouter();
  const { setValue } = useLocalStorage();

  const [isPasswordShown, setIsPasswordShown] = useState(false);

  // TODO: find out why form "isSubmitting" never goes back to false
  // after form submission
  const [isLoading, setIsLoading] = useState(false);

  // TODO: I couldn't find proper documentation on tanstack form
  // onSubmit network error handling
  const [error, setError] = useState<Error | null>(null);

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      request_token: requestToken,
    },
    validators: {
      onSubmit: LoginRequestBodySchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setIsLoading(true);
        setError(null);
        await submitLogin(value);
        toast.success("Successfully logged in. Redirecting...");
      } catch (error) {
        setError(error as Error);
        toast.error("Failed to log in. Please try again");
      } finally {
        setIsLoading(false);
      }
    },
    canSubmitWhenInvalid: false,
  });

  const onChangePasswordVisibility = () =>
    setIsPasswordShown((prevState) => !prevState);

  return {
    form,
    isPasswordShown,
    onChangePasswordVisibility,
    isLoading,
    error,
  };
};
