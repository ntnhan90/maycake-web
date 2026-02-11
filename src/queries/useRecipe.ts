import recipeApiRequest from "@/apiRequests/recipeApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateRecipeBodyType } from "@/models/recipeModel";
import { QueryParams } from "@/types/query";

export const useGetRecipeListQuery = () =>{
    return useQuery({
        queryKey: ['recipe'],
        queryFn: ({ queryKey: [, params] }) => recipeApiRequest.list(params as QueryParams),
        refetchOnMount: 'always',
    })
}

export const useCreateRecipeMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: recipeApiRequest.create,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['recipe']
            })
        }
    })
}

export const useGetRecipeQuery = (id: number) =>{
    return useQuery({
        queryKey: ['recipe', id],
        queryFn: () => recipeApiRequest.get(id),
   //     enabled
    })
}

export const useUpdateRecipeMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({id,...body}: CreateRecipeBodyType & {id:number}) =>
            recipeApiRequest.update(id, body),
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['recipe'],
                exact: true
            })
        }
    })
}

export const useDeleteRecipelMutaion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: recipeApiRequest.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['recipe']
            })
        }
    })
}
