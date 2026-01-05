import contactApiRequest from "@/apiRequests/contact";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateContactBodyType } from "@/models/contactModel";

export const useGetContactListQuery = () =>{
    return useQuery({
        queryKey: ['contact'],
        queryFn: contactApiRequest.list
    })
}

export const useCreateContactMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: contactApiRequest.create,
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['role']
            })
        }
    })
}

export const useGetContactQuery = (id: number) =>{
    return useQuery({
        queryKey: ['role', id],
        queryFn: () => contactApiRequest.get(id),
   //     enabled
    })
}

export const useUpdateContactMutation = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({id,...body}: CreateContactBodyType & {id:number}) =>
            contactApiRequest.update(id, body),
        onSuccess:() =>{
            queryClient.invalidateQueries({
                queryKey: ['role'],
                exact: true
            })
        }
    })
}

export const useDeleteContactMutaion = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: contactApiRequest.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['role']
            })
        }
    })
}
