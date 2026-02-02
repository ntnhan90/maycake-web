import http from "@/utils/http";
import { CreateBlogTagBodyType, BlogTagListResType, BlogTagResType } from "@/models/blog/tagModel";

const prefix = '/tags'
const blogTagApiRequest = {
    list:(params?: { 
        search?:string; 
        q?: string; 
        page?: number; 
        limit?: number ,
        order?:string
    }) => http.get<BlogTagListResType>(prefix,{params}),
    create:(body: CreateBlogTagBodyType) => http.post<BlogTagResType>(prefix, body), 
    get:(id:number) => http.get<BlogTagResType>(`${prefix}/${id}`),
    update:(id:number, body:CreateBlogTagBodyType) => http.put<BlogTagResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<BlogTagResType>(`${prefix}/${id}`),
}

export default blogTagApiRequest