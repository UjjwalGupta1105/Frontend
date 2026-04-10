import { jobServiceApi } from "@/lib/axios.config"
import { ErrorResponse } from "@/types/ErrorResponse"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

const  useCreateApplication= ()=>{
    return useMutation({
        mutationFn: async({jobId, jwtToken}:{
            jobId: number | null,
            jwtToken: string | null
        })=>{
            try{
                if(!jwtToken){
                    toast.error('Log in to continue')
                    throw new Error("No jwt token provided");
                }
                const response= await jobServiceApi.post('/applications', {jobId}, {
                    headers: {
                        Authorization: jwtToken
                    }
                })

                return response.data ;
            }catch(error){
                throw error ;
            }
        },
        onError: (error: AxiosError<ErrorResponse>)=>{
            const message =
                error.response?.data?.message ||
                error.message ||
                "Something went wrong";

            toast.error(message);
        },
        onSuccess: (data)=>{
            toast.success(data.message || "Succesfully applied");
        }
    })
}

export default useCreateApplication ;