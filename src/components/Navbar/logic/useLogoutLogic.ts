import { logout } from "@/actions/action";
import { getQueryClient } from "@/lib/reactQueryLib";
import { useConfigContext } from "@/providers/ConfigProvider";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLogoutLogic = () => {
  const { userDetail } = useConfigContext();
  const queryClient = getQueryClient();

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      if (!userDetail) throw new Error("user detail is missing");
      await logout(userDetail.session_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userDetail"] });
      toast.success("Successfully log out");
    },
    onError: () => {
      toast.error("Failed to log out. Please try again");
    },
  });

  return { logoutMutation };
};
