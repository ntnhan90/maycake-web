import discountApiRequest from "@/apiRequests/discountApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateDiscountBodyType } from "@/models/product/discountModel";

export const useGetDiscountListQuery =() =>{
    return useQuery({
        queryKey: ['discount'],
        queryFn: discountApiRequest.list,
        refetchOnMount: 'always',
    })
}

export const useCreateDiscountMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: discountApiRequest.create,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['discount']
            })
        }
    })
}

export const useGetDiscountQuery = (id: number) =>{
    return useQuery({
        queryKey: ['discount', id],
        queryFn: () => discountApiRequest.get(id),
   //     enabled
    })
}

export const useUpdateDiscountMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({id,...body}: CreateDiscountBodyType & {id:number}) =>
            discountApiRequest.update(id, body),
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['discount'],
                exact: true
            })
        }
    })
}

export const useDeleteDiscountCateMutaion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: discountApiRequest.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['discount']
            })
        }
    })
}