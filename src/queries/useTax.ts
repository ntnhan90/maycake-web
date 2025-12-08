import taxApiRequest from "@/apiRequests/tax";
import { cookies } from "next/headers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateTaxBodyType } from "@/models/taxModel";
import { number } from "zod";

export const useGetTaxListQuery =() =>{
    return useQuery({
        queryKey: ['tax'],
        queryFn: taxApiRequest.list
    })
}

export const useCreateTaxMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: taxApiRequest.create,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['tax']
            })
        }
    })
}

export const useGetTaxQuery = (id: number) =>{
    return useQuery({
        queryKey: ['tax', id],
        queryFn: () => taxApiRequest.get(id),
   //     enabled
    })
}

export const useUpdateTaxMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({id,...body}: CreateTaxBodyType & {id:number}) =>
            taxApiRequest.update(id, body),
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['tax'],
                exact: true
            })
        }
    })
}

export const useDeleteTaxMutaion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: taxApiRequest.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tax']
            })
        }
    })
}