import currencyApiRequest from "@/apiRequests/currencyApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateCurrencyBodyType } from "@/models/currencyModel";
import { QueryParams } from "@/types/query";
export const useGetCurrencyListQuery = () =>{
    return useQuery({
        queryKey: ['currencies'],
        queryFn: ({ queryKey: [, params] }) => currencyApiRequest.list(params as QueryParams),
    })
}

export const useCreateCurrencyMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: currencyApiRequest.create,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['currencies']
            })
        }
    })
}

export const useGetCurrencyQuery = (id: number) =>{
    return useQuery({
        queryKey: ['currencies', id],
        queryFn: () => currencyApiRequest.get(id),
    })
}

export const useUpdateCurrencyMutation = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({id,...body}: CreateCurrencyBodyType & {id:number}) =>
            currencyApiRequest.update(id, body),
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['currencies'],
                exact: true
            })
        }
    })
}

export const useDeleteCurrencyMutaion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: currencyApiRequest.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['currencies']
            })
        }
    })
}