import currencyApiRequest from "@/apiRequests/currency";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateCurrencyBodyType } from "@/models/currencyModel";

export const useGetCurrencyListQuery = () =>{
    return useQuery({
        queryKey: ['currencies'],
        queryFn: currencyApiRequest.list
    })
}

export const useCreateCurrencyMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: currencyApiRequest.create,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['tax']
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

export const useDeleteTaxMutaion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: currencyApiRequest.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tax']
            })
        }
    })
}