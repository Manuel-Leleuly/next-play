import { TmdbApi } from "@/api/tmdb/tmdb";
import { LoginRequestBodySchema } from "@/api/tmdb/tmdbModels";
import { useLocalStorage } from "@/hooks/useLocaleStorage";
import { NetworkLib } from "@/lib/NetworkLib";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

export const useLoginFormLogic = (requestToken: string) => {
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
        const network = NetworkLib.withTMDBToken();
        const loginResult = await TmdbApi.login(network, value);
        const createSessionResult = await TmdbApi.getSessionId(network, {
          request_token: loginResult.request_token,
        });
        if (createSessionResult.success) {
          setValue("session_id", createSessionResult.session_id);
        }
      } catch (error) {
        setError(error as Error);
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
