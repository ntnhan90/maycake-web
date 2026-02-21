import contractApiRequest from "@/apiRequests/franchise/contractApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateContractBodyType } from "@/models/franchise/contractModel";
import { QueryParams } from "@/types/query";

export const useGetContractListQuery =() =>{
    return useQuery({
        queryKey: ['contract'],
        queryFn: ({ queryKey: [, params] }) => contractApiRequest.list(params as QueryParams),
        refetchOnMount: 'always',
    })
}

export const useCreateContractMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: contractApiRequest.create,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['contract']
            })
        }
    })
}

export const useGetContractQuery = (id: number) =>{
    return useQuery({
        queryKey: ['contract', id],
        queryFn: () => contractApiRequest.get(id),
   //     enabled
    })
}

export const useUpdateContractMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({id,...body}: CreateContractBodyType & {id:number}) =>
            contractApiRequest.update(id, body),
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['contract'],
                exact: true
            })
        }
    })
}

export const useDeleteContractMutaion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: contractApiRequest.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['contract']
            })
        }
    })
}