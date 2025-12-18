import productApiRequest from "@/apiRequests/product/productApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateProductBodyType } from "@/models/product/productModel";
import { number } from "zod";

export const useGetProductListQuery = () =>{
    return useQuery({
        queryKey: ['role'],
        queryFn: productApiRequest.list
    })
}

export const useCreateProductMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: productApiRequest.create,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['role']
            })
        }
    })
}

export const useGetProductQuery = (id: number) =>{
    return useQuery({
        queryKey: ['role', id],
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
                queryKey: ['role'],
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
                queryKey: ['role']
            })
        }
    })
}