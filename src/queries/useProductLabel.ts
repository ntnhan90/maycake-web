import labelsApiRequest from "@/apiRequests/product/labelsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateProLabelBodyType } from "@/models/product/labelsModel";
import { QueryParams } from "@/types/query";
export const useGetProductLabelListQuery =() =>{
    return useQuery({
        queryKey: ['prodcut-labels'],
        queryFn: ({ queryKey: [, params] }) => labelsApiRequest.list(params as QueryParams),
    })
}

export const useCreateProductLabelMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: labelsApiRequest.create,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['prodcut-labels']
            })
        }
    })
}

export const useGetProductLabelQuery = (id: number) =>{
    return useQuery({
        queryKey: ['prodcut-labels', id],
        queryFn: () => labelsApiRequest.get(id),
   //     enabled
    })
}

export const useUpdateProductLabelMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({id,...body}: CreateProLabelBodyType & {id:number}) =>
            labelsApiRequest.update(id, body),
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['prodcut-labels'],
                exact: true
            })
        }
    })
}

export const useDeleteProductLabelMutaion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: labelsApiRequest.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['prodcut-labels']
            })
        }
    })
}