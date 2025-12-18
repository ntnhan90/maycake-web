import cateApiRequest from "@/apiRequests/product/cateApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateProCateBodyType } from "@/models/product/categoryModel";

export const useGetProductCateListQuery = () =>{
    return useQuery({
        queryKey: ['product-cate'],
        queryFn: cateApiRequest.list
    })
}

export const useCreateProductCateMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : cateApiRequest.create,
        onSuccess: () =>{
            queryClient.invalidateQueries({
                queryKey: ['product-cate']
            })
        }
    })
}

export const useGetProductCateQuery = (id:number) => {
    return useQuery({
        queryKey: ['product-cate', id],
        queryFn: () => cateApiRequest.get(id),
    })
}

export const useUpdateProductCateMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id,...body}: CreateProCateBodyType & {id: number}) =>
            cateApiRequest.update(id,body),
        onSuccess: () =>{
            queryClient.invalidateQueries({
                queryKey:['product-cate'],
                exact: true
            })
        }
    })
}

export const useDeleteProductCateMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: cateApiRequest.delete,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['product-cate']
            })
        }
    })
}