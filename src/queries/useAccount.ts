import accountApiRequest from "@/apiRequests/accountApi";
import { cookies } from 'next/headers'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UpdateAccountBodyType } from "@/models/accountModel";

export const useAccountProfile = () =>{
    return useQuery({
        queryKey: ['account-profile'],
        queryFn: accountApiRequest.me
    })
}

export const useGetAccountList = () =>{
    return useQuery({
        queryKey: ['user'],
        queryFn: accountApiRequest.list
    })
}

export const useGetAccount = (id: number) =>{
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => accountApiRequest.get(id),
        enabled: !!id,
    })
}

export const useAddAccountMutation =() =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: accountApiRequest.add,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
        }
    })
}

export const useUpdateAccountMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({id,...body}: UpdateAccountBodyType & {id:number}) =>
            accountApiRequest.update(id, body),
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
        }
    })
}

