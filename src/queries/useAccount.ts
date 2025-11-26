import accountApiRequest from "@/apiRequests/account";
import { cookies } from 'next/headers'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
                queryKey: ['accounts']
            })
        }
    })
}