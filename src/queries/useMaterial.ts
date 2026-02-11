import materialApiRequest from "@/apiRequests/materialApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateMaterialBodyType } from "@/models/materialModel";
import { QueryParams } from "@/types/query";

export const useGetMaterialListQuery = () =>{
    return useQuery({
        queryKey: ['material'],
        queryFn: ({ queryKey: [, params] }) => materialApiRequest.list(params as QueryParams),
        refetchOnMount: 'always',
    })
}

export const useCreateMaterialMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: materialApiRequest.create,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['material']
            })
        }
    })
}

export const useGetMaterialQuery = (id: number) =>{
    return useQuery({
        queryKey: ['material', id],
        queryFn: () => materialApiRequest.get(id),
   //     enabled
    })
}

export const useUpdateMaterialMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({id,...body}: CreateMaterialBodyType & {id:number}) =>
            materialApiRequest.update(id, body),
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['material'],
                exact: true
            })
        }
    })
}

export const useDeleteMaterialMutaion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: materialApiRequest.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['material']
            })
        }
    })
}
