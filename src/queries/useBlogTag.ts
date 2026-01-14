import blogTagApiRequest from "@/apiRequests/blog/tagApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateBlogTagBodyType } from "@/models/blog/tagModel";
type BlogTagQueryParams = {
    q?: string
    page?: number
    limit?: number
    }

export const useGetBlogTagListQuery =(params?: BlogTagQueryParams) =>{
    return useQuery({
        queryKey: ['blog-tags', params],
       // queryFn: blogTagApiRequest.list(params),
        queryFn: ({ queryKey: [, params] }) => blogTagApiRequest.list(params as BlogTagQueryParams),
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