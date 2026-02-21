import franchiseApiRequest from "@/apiRequests/franchise/franchiseApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateFranchiseBodyType } from "@/models/franchise/crmModel";
import { QueryParams } from "@/types/query";

export const useGetFranchiseListQuery =() =>{
    return useQuery({
        queryKey: ['franchise'],
        queryFn: ({ queryKey: [, params] }) => franchiseApiRequest.list(params as QueryParams),
        refetchOnMount: 'always',
    })
}

export const useCreateFranchiseMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: franchiseApiRequest.create,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['franchise']
            })
        }
    })
}

export const useGetFranchiseQuery = (id: number) =>{
    return useQuery({
        queryKey: ['franchise', id],
        queryFn: () => franchiseApiRequest.get(id),
   //     enabled
    })
}

export const useUpdateFranchiseMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({id,...body}: CreateFranchiseBodyType & {id:number}) =>
            franchiseApiRequest.update(id, body),
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['franchise'],
                exact: true
            })
        }
    })
}

export const useDeleteFranchiseMutaion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: franchiseApiRequest.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['franchise']
            })
        }
    })
}