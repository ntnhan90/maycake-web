import shopApiRequest from "@/apiRequests/franchise/shopApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateShopBodyType } from "@/models/franchise/shopModel";
import { QueryParams } from "@/types/query";

export const useGetShopListQuery =() =>{
    return useQuery({
        queryKey: ['shop'],
        queryFn: ({ queryKey: [, params] }) => shopApiRequest.list(params as QueryParams),
        refetchOnMount: 'always',
    })
}

export const useCreateShopMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: shopApiRequest.create,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['shop']
            })
        }
    })
}

export const useGetShopQuery = (id: number) =>{
    return useQuery({
        queryKey: ['shop', id],
        queryFn: () => shopApiRequest.get(id),
   //     enabled
    })
}

export const useUpdateShopMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({id,...body}: CreateShopBodyType & {id:number}) =>
            shopApiRequest.update(id, body),
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['shop'],
                exact: true
            })
        }
    })
}

export const useDeleteShopMutaion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: shopApiRequest.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['shop']
            })
        }
    })
}