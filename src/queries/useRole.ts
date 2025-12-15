import roleApiRequest from "@/apiRequests/roleApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateRoleBodyType } from "@/models/roleModel";
import { number } from "zod";

export const useGetRoleListQuery = () =>{
    return useQuery({
        queryKey: ['role'],
        queryFn: roleApiRequest.list
    })
}

export const useCreateRoleMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: roleApiRequest.create,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['role']
            })
        }
    })
}

export const useGetRoleQuery = (id: number) =>{
    return useQuery({
        queryKey: ['role', id],
        queryFn: () => roleApiRequest.get(id),
   //     enabled
    })
}

export const useUpdateRoleMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({id,...body}: CreateRoleBodyType & {id:number}) =>
            roleApiRequest.update(id, body),
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['role'],
                exact: true
            })
        }
    })
}

export const useDeleteRoleMutaion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: roleApiRequest.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['role']
            })
        }
    })
}