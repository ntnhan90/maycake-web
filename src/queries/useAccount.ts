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