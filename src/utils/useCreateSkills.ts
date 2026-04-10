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
        const response = await userServiceApi.post(
          "/skills",
          { skills },
          {
            headers: {
              Authorization: `${jwtToken}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data)=>{
        toast.success(data.message || "Skills Added successfully");
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
