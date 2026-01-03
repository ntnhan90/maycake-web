import mediaApiRequest from "@/apiRequests/mediaApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateFileBodyType } from "@/models/fileModel";
import { CreateFolderBodyType } from "@/models/folderModel";
import { MediaTreeType } from "@/types/media.type";

const MEDIA_API_URL = 'http://localhost:3000/api/media'

export const useUploadFileMutation = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: mediaApiRequest.uploadFile,
        onSuccess: () =>{
            queryClient.invalidateQueries({
                queryKey: ['media']
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
                queryKey: ['media']
            })
        }
    })
}

const fetchMediaTree = async (): Promise<MediaTreeType> => {
    const res = await fetch(MEDIA_API_URL, {
        method: 'GET',
        credentials: 'include',
    })
    console.log("res")
    if (!res.ok) {
        throw new Error(`Fetch media failed: ${res.status}`)
    }

    const data = (await res.json()) as MediaTreeType

    return data ?? {}
}

export const useGetMediaListQuery = () => {
    return useQuery<MediaTreeType>({
        queryKey: ['media'],
        queryFn: fetchMediaTree,
        initialData: {}, // ✅ chặn undefined ngay từ đầu
        staleTime: 1000 * 60 * 5
    })
}
