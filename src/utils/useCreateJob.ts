import { jobServiceApi } from "@/lib/axios.config";
import { CreateJobFormSchema } from "@/schema/createJob.validator";
import { ErrorResponse } from "@/types/ErrorResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import z from "zod";

type CreateJobFormValues = z.infer<typeof CreateJobFormSchema>;

const useCreateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      createJobData,
      authJwtToken,
    }: {
      createJobData: CreateJobFormValues;
      authJwtToken: string | null;
    }) => {
      const response = await jobServiceApi.post("/jobs", createJobData, {
        headers: {
          Authorization: `${authJwtToken}`,
        },
      });
      return response.data;
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      toast.error(message);
    },
    onSuccess: () => {
      toast.success("Job posted successfully!");
      queryClient.invalidateQueries({ queryKey: ["jobList"] });
    },
  });
};

export default useCreateJob;
