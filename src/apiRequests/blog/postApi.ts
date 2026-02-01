import http from "@/utils/http";
import { CreatePostBodyType, PostListResType, PostResType } from "@/models/blog/postModel";
const prefix = '/posts'
const postApiRequest = {
    list:(params?: {
        search?:string; 
        q?: string; 
        page?: number; 
        limit?: number ,
        order?:string
    }) => http.get<PostListResType>(prefix,{params}),
    create:(body: CreatePostBodyType) => http.post<PostResType>(prefix, body), 
    get:(id:number) => http.get<PostResType>(`${prefix}/${id}`),
    update:(id:number, body:CreatePostBodyType) => http.put<PostResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<PostResType>(`${prefix}/${id}`),
}

export default postApiRequest