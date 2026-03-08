import supplyOrderApiRequest from "@/apiRequests/franchise/supplyOrderApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateSupplyOrderBodyType } from "@/models/franchise/supplyOrderModel";
import { QueryParams } from "@/types/query";

export const useGetSupplyOrderListQuery =() =>{
    return useQuery({
        queryKey: ['supply-order'],
        queryFn: ({ queryKey: [, params] }) => supplyOrderApiRequest.list(params as QueryParams),
    })
}

export const useCreateSupplyOrderMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
         mutationFn: (id: number) => supplyOrderApiRequest.delete(id),
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['supply-order']
            })
        }
    })
}

export const useGetSupplyOrderQuery = (id: number) =>{
    return useQuery({
        queryKey: ['supply-order', id],
        queryFn: () => supplyOrderApiRequest.get(id),
   //     enabled
    })
}

export const useUpdateSupplyOrderMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({id,...body}: CreateSupplyOrderBodyType & {id:number}) =>
            supplyOrderApiRequest.update(id, body),
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['supply-order'],
                exact: true
            })
        }
    })
}

export const useDeleteSupplyOrderMutaion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: supplyOrderApiRequest.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['supply-order']
            })
        }
    })
}