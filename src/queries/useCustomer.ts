import customerApiRequest from "@/apiRequests/customerApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UpdateCustomerPayload } from "@/models/product/customerModel";
import { QueryParams } from "@/types/query";

export const useGetCustomerListQuery =() =>{
    return useQuery({
        queryKey: ['customer'],
        queryFn: ({ queryKey: [, params] }) => customerApiRequest.list(params as QueryParams),
        refetchOnMount: 'always',
    })
}

export const useCreateCustomerMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: customerApiRequest.create,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['customer']
            })
        }
    })
}

export const useGetCustomerQuery = (id: number) =>{
    return useQuery({
        queryKey: ['customer', id],
        queryFn: () => customerApiRequest.get(id),
   //     enabled
    })
}

export const useUpdateCustomerMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateCustomerPayload) =>
        customerApiRequest.update(payload.id, payload),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["customer"] });
        },
    });
};

export const useDeleteCustomerCateMutaion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: customerApiRequest.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['customer']
            })
        }
    })
}