import attributeApiRequest from "@/apiRequests/product/attributeApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateAttributeSetBodyType } from "@/models/product/attributeModel";

export const useGetProductAttributeListQuery = () =>{
    return useQuery({
        queryKey: ['attributeSet'],
        queryFn: attributeApiRequest.list,
        refetchOnMount: 'always',
    })
}

export const useCreateProductAttributeMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: attributeApiRequest.create,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['attributeSet']
            })
        }
    })
}

export const useGetProductAttributeQuery = (id: number) =>{
    return useQuery({
        queryKey: ['attributeSet', id],
        queryFn: () => attributeApiRequest.get(id),
    })
}

export const useUpdateProductAttributeMutation = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({id,...body}: CreateAttributeSetBodyType & {id:number}) =>
            attributeApiRequest.update(id, body),
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['attributeSet'],
                exact: true
            })
        }
    })
}

export const useDeleteProductAttributeMutaion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: attributeApiRequest.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tax']
            })
        }
    })
}