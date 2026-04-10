import { userServiceApi } from "@/lib/axios.config";
import { ErrorResponse } from "@/types/ErrorResponse";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useCreateSkill = () => {
  return useMutation({
    mutationFn: async ({
      jwtToken,
      skills,
    }: {
      jwtToken: string;
      skills: string[];
    }) => {
      try {
        const response = userServiceApi.post(
          "/skills",
          { skills },
          {
            headers: {
              Authorization: `${jwtToken}`,
            },
          }
        );
        return response;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (response)=>{
        toast.success(response.data.message || "Skills Added successfully");
    },
    onError: (error: AxiosError<ErrorResponse>)=>{
        const message =
              error.response?.data?.message ||
              error.message ||
              "Something went wrong";

        toast.error(message);
    }
  });
};

export default useCreateSkill;
