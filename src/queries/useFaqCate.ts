import faqCateApiRequest from "@/apiRequests/faqCateApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateFaqCateBodyType } from "@/models/faqModel";

export const useGetFaqCateListQuery = () =>{
    return useQuery({
        queryKey: ['faq-cate'],
        queryFn: faqCateApiRequest.list,
        refetchOnMount: 'always',
    })
}

export const useCreateFaqCateMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: faqCateApiRequest.create,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['faq-cate']
            })
        }
    })
}

export const useGetFaqCateQuery = (id: number) =>{
    return useQuery({
        queryKey: ['faq-cate', id],
        queryFn: () => faqCateApiRequest.get(id),
   //     enabled
    })
}

export const useUpdateFaqCateMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({id,...body}: CreateFaqCateBodyType & {id:number}) =>
            faqCateApiRequest.update(id, body),
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['faq-cate'],
                exact: true
            })
        }
    })
}

export const useDeleteFaqCateMutaion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: faqCateApiRequest.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['faq-cate']
            })
        }
    })
}
