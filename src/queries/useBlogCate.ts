import blogCategoryApiRequest from "@/apiRequests/blog/cateApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateBlogCateBodyType } from "@/models/blog/categoryModel";

export const useGetBlogCateListQuery =() =>{
    return useQuery({
        queryKey: ['blog-cate'],
        queryFn: blogCategoryApiRequest.list,
        refetchOnMount: 'always',
    })
}

export const useGetBlogCateTreeQuery =() =>{
    return useQuery({
        queryKey: ['blog-cate'],
        queryFn: blogCategoryApiRequest.tree,
        refetchOnMount: 'always',
    })
}

export const useCreateBlogCateMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: blogCategoryApiRequest.create,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['blog-cate']
            })
        }
    })
}

export const useGetBlogCateQuery = (id: number) =>{
    return useQuery({
        queryKey: ['blog-cate', id],
        queryFn: () => blogCategoryApiRequest.get(id),
   //     enabled
    })
}

export const useUpdateBlogCateMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({id,...body}: CreateBlogCateBodyType & {id:number}) =>
            blogCategoryApiRequest.update(id, body),
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['blog-cate'],
                exact: true
            })
        }
    })
}

export const useDeleteBlogCateMutaion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: blogCategoryApiRequest.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['blog-cate']
            })
        }
    })
}