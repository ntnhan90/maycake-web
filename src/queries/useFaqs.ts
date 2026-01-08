import faqApiRequest from "@/apiRequests/faqApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateFaqsBodyType } from "@/models/faqModel";

export const useGetFaqsListQuery = () =>{
    return useQuery({
        queryKey: ['faqs'],
        queryFn: faqApiRequest.list,
        refetchOnMount: 'always',
    })
}

export const useCreateFaqsMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: faqApiRequest.create,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['faqs']
            })
        }
    })
}

export const useGetFaqsQuery = (id: number) =>{
    return useQuery({
        queryKey: ['faqs', id],
        queryFn: () => faqApiRequest.get(id),
   //     enabled
    })
}

export const useUpdateFaqsMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({id,...body}: CreateFaqsBodyType & {id:number}) =>
            faqApiRequest.update(id, body),
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['faqs'],
                exact: true
            })
        }
    })
}

export const useDeleteFaqsMutaion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: faqApiRequest.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['faqs']
            })
        }
    })
}
