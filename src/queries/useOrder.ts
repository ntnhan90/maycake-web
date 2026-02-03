import orderApiRequest from "@/apiRequests/product/orderApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateOrderBodyType } from "@/models/product/orderModel";
import { QueryParams } from "@/types/query";

export const useGetOrderListQuery =() =>{
    return useQuery({
        queryKey: ['order'],
        queryFn: ({ queryKey: [, params] }) => orderApiRequest.list(params as QueryParams),
        refetchOnMount: 'always',
    })
}

export const useCreateOrderMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: orderApiRequest.create,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['order']
            })
        }
    })
}

export const useGetOrderQuery = (id: number) =>{
    return useQuery({
        queryKey: ['order', id],
        queryFn: () => orderApiRequest.get(id),
   //     enabled
    })
}

export const useUpdateOrderMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({id,...body}: CreateOrderBodyType & {id:number}) =>
            orderApiRequest.update(id, body),
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['order'],
                exact: true
            })
        }
    })
}

export const useDeleteOrderCateMutaion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: orderApiRequest.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['order']
            })
        }
    })
}