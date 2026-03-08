import warehouseApiRequest from "@/apiRequests/franchise/warehouseApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateWarehouseBodyType } from "@/models/franchise/warehouseModel";
import { QueryParams } from "@/types/query";

export const useGetWarehouseListQuery =() =>{
    return useQuery({
        queryKey: ['warehouse'],
        queryFn: ({ queryKey: [, params] }) => warehouseApiRequest.list(params as QueryParams),
    })
}

export const useCreateWarehouseMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => warehouseApiRequest.delete(id),
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['warehouse']
            })
        }
    })
}

export const useGetWarehouseQuery = (id: number) =>{
    return useQuery({
        queryKey: ['warehouse', id],
        queryFn: () => warehouseApiRequest.get(id),
   //     enabled
    })
}

export const useUpdateWarehouseMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({id,...body}: CreateWarehouseBodyType & {id:number}) =>
            warehouseApiRequest.update(id, body),
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['warehouse'],
                exact: true
            })
        }
    })
}

export const useDeleteWarehouseMutaion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: warehouseApiRequest.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['warehouse']
            })
        }
    })
}