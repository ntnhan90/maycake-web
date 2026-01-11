import tagApiRequest from "@/apiRequests/product/tagApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateProTagBodyType } from "@/models/product/tagModel";

export const useGetProductTagListQuery =() =>{
    return useQuery({
        queryKey: ['product-tags'],
        queryFn: tagApiRequest.list,
        refetchOnMount: 'always',
    })
}

export const useCreateProductTagMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: tagApiRequest.create,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['product-tags']
            })
        }
    })
}

export const useGetProductTagQuery = (id: number) =>{
    return useQuery({
        queryKey: ['product-tags', id],
        queryFn: () => tagApiRequest.get(id),
   //     enabled
    })
}

export const useUpdateProductTagMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({id,...body}: CreateProTagBodyType & {id:number}) =>
            tagApiRequest.update(id, body),
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['product-tags'],
                exact: true
            })
        }
    })
}

export const useDeleteProductTagMutaion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: tagApiRequest.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['product-tags']
            })
        }
    })
}