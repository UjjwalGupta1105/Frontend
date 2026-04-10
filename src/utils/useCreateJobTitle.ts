import { jobServiceApi } from "@/lib/axios.config";
import { ErrorResponse } from "@/types/ErrorResponse";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const useCreateJobTitle = () => {
  return useMutation({
    mutationFn: async ({
      authJwtToken,
      title,
    }: {
      authJwtToken: string | null;
      title: string;
    }) => {
      return await createJob(authJwtToken, title);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const message =
                error.response?.data?.message ||
                error.message ||
                "Something went wrong";

      toast.error(message);
    },
    onSuccess: (response) => {
       toast.success(response.data.message || "Title created successfully");
    },
  });
};

const createJob = async (authJwtToken: string | null, title: string) => {
  try {
    const response = await jobServiceApi.post(
      "/job-title",
      { title },
      {
        headers: {
          Authorization: authJwtToken,
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export default useCreateJobTitle;
