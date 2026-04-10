import { userServiceApi } from "@/lib/axios.config";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/ErrorResponse";

const useCreateRole = () => {
  return useMutation({
    mutationFn: async ({
      authJwtToken,
      roleName,
    }: {
      authJwtToken: string | undefined;
      roleName: string;
    }) => {
      if (!roleName || roleName.trim() === "") {
        throw new Error("Role name cannot be empty");
      }

      const response = await userServiceApi.post(
        "/role",
        { name: roleName },
        {
          headers: {
            Authorization: `${authJwtToken}`,
          },
        }
      );

      return response.data;
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const message =
              error.response?.data?.message ||
              error.message ||
              "Something went wrong";

      toast.error(message);
    },

    onSuccess: (data) => {
      toast.success(data.message || "Role created successfully!");
    },
  });
};

export default useCreateRole;