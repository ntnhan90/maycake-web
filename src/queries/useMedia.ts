import mediaApiRequest from "@/apiRequests/mediaApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateFileBodyType } from "@/models/fileModel";
import { CreateFolderBodyType } from "@/models/folderMolder";

export const useUploadFileMutation = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: mediaApiRequest.uploadFile,
        onSuccess: () =>{
            queryClient.invalidateQueries({
                queryKey: ['file']
            })
        }
    })
}

export const useUploadFolderMutation = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: mediaApiRequest.uploadFolder,
        onSuccess: () =>{
            queryClient.invalidateQueries({
                queryKey: ['folder']
            })
        }
    })
}