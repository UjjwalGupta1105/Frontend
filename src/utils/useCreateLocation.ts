import { userServiceApi } from "@/lib/axios.config";
import { ErrorResponse } from "@/types/ErrorResponse";
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { toast } from "sonner";

const useCreateLocation = () => {
    return useMutation({
        mutationFn: async({jwtToken, city, state, country}: {jwtToken: string, city: string, state: string, country: string})=> {
            try {
                const response = await userServiceApi.post('/locations', {city, state, country}, {
                    headers: {
                        Authorization: jwtToken
                    }
                });

                return response.data ;
            } catch (error) {
                throw error ;
            }
        },
        onSuccess: (data)=>{
            toast.success(data.message || "Location Added successfully");
        },
        onError: (error: AxiosError<ErrorResponse>)=>{
            const message =
                error.response?.data?.message ||
                error.message ||
                "Something went wrong";

            toast.error(message);
        }
    })
}

export default useCreateLocation ;