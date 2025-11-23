import accountApiRequest from "@/apiRequests/account";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAccountList = () =>{
    return useQuery({
        queryKey: ['user'],
        queryFn: accountApiRequest.list
    })
}