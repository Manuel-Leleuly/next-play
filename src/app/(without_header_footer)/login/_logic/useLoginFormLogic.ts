import { LoginRequestBodySchema } from "@/api/tmdb/tmdbModels";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { submitLogin } from "../actions";

export const useLoginFormLogic = (requestToken: string) => {
  const router = useRouter();
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (value: {
      username: string;
      password: string;
      request_token: string;
    }) => {
      const errorData = await submitLogin(value);
      if (errorData) {
        throw new Error(JSON.stringify(errorData));
      }
    },
    onSuccess: () => {
      toast.success("Successfully logged in. Redirecting...");
      router.replace("/");
    },
    onError: () => {
      toast.error("Failed to log in. Please try again");
    },
  });

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
      await loginMutation.mutateAsync(value);
    },
    canSubmitWhenInvalid: false,
  });

  const onChangePasswordVisibility = () =>
    setIsPasswordShown((prevState) => !prevState);

  return {
    form,
    isPasswordShown,
    onChangePasswordVisibility,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
};
