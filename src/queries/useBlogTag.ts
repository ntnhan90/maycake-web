import blogTagApiRequest from "@/apiRequests/blog/tagApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateBlogTagBodyType } from "@/models/blog/tagModel";

export const useGetBlogTagListQuery =() =>{
    return useQuery({
        queryKey: ['blog-tags'],
        queryFn: blogTagApiRequest.list,
        refetchOnMount: 'always',
    })
}

export const useCreateBlogTagMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: blogTagApiRequest.create,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['blog-tags']
            })
        }
    })
}

export const useGetBlogTagQuery = (id: number) =>{
    return useQuery({
        queryKey: ['blog-tags', id],
        queryFn: () => blogTagApiRequest.get(id),
   //     enabled
    })
}

export const useUpdateBlogTagMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({id,...body}: CreateBlogTagBodyType & {id:number}) =>
            blogTagApiRequest.update(id, body),
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['blog-tags'],
                exact: true
            })
        }
    })
}

export const useDeleteBlogTagMutaion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: blogTagApiRequest.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['blog-tags']
            })
        }
    })
}