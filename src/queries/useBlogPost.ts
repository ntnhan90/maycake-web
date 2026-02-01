import postApiRequest from "@/apiRequests/blog/postApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreatePostBodyType } from "@/models/blog/postModel";

type QueryParams = {
    q?: string
    page?: number
    limit?: number
}

export const useGetBlogPostListQuery =() =>{
    return useQuery({
        queryKey: ['blog-post'],
        //queryFn: postApiRequest.list,
        queryFn: ({ queryKey: [, params] }) => postApiRequest.list(params as QueryParams),
        refetchOnMount: 'always',
    })
}

export const useCreateBlogPostMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: postApiRequest.create,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['blog-post']
            })
        }
    })
}

export const useGetBlogPostQuery = (id: number) =>{
    return useQuery({
        queryKey: ['blog-post', id],
        queryFn: () => postApiRequest.get(id),
   //     enabled
    })
}

export const useUpdateBlogPostMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({id,...body}: CreatePostBodyType & {id:number}) =>
            postApiRequest.update(id, body),
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['blog-post'],
                exact: true
            })
        }
    })
}

export const useDeleteBlogPostMutaion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: postApiRequest.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['blog-post']
            })
        }
    })
}