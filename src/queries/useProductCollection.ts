import collectionApiRequest from "@/apiRequests/product/collectionApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateProCollectionBody, CreateProCollectionBodyType } from "@/models/product/collectionModel";

export const useGetProductCollectionListQuery = () =>{
    return useQuery({
        queryKey: ['product-collection'],
        queryFn: collectionApiRequest.list
    })
}

export const useCreateProductCollectionMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: collectionApiRequest.create,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['product-collection']
            })
        }
    })
}

export const useGetProductCollectionQuery = (id:number) => {
    return useQuery({
        queryKey: ['product-collection' , id],
        queryFn: () => collectionApiRequest.get(id),
    })
}

export const useUpdateProductCollectionMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({id, ...body} : CreateProCollectionBodyType & {id :number}) =>
            collectionApiRequest.update(id,body)
    })
}

export const useDeleteProductCollectionMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : collectionApiRequest.delete,
        onSuccess: () =>{
            queryClient.invalidateQueries({
                queryKey: ['product-collection'],
                exact: true
            })
        }
    })
}