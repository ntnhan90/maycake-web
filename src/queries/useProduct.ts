import productApiRequest from "@/apiRequests/product/productApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateProductBodyType } from "@/models/product/productModel";
import { QueryParams } from "@/types/query";

export const useGetProductListQuery = () =>{
    return useQuery({
        queryKey: ['product'],
        //queryFn: productApiRequest.list,
        queryFn: ({ queryKey: [, params] }) => productApiRequest.list(params as QueryParams),
    })
}

export const useCreateProductMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: productApiRequest.create,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['product']
            })
        }
    })
}

export const useGetProductQuery = (id: number) =>{
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => productApiRequest.get(id),
   //     enabled
    })
}

export const useUpdateProductMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({id,...body}: CreateProductBodyType & {id:number}) =>
            productApiRequest.update(id, body),
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['product'],
                exact: true
            })
        }
    })
}

export const useDeleteProductMutaion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: productApiRequest.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['product']
            })
        }
    })
}