import http from "@/utils/http";
import { CreateBlogTagBodyType, BlogTagListResType, BlogTagResType } from "@/models/blog/tagModel";

export interface OffsetPaginatedDto<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export interface ApiResponse<T> {
  payload: OffsetPaginatedDto<T>
}

export interface BlogTag {
  id: number
  name: string
  slug: string
}

const prefix = '/tags'
const blogTagApiRequest = {
    list:(params?: { q?: string; page?: number; limit?: number }) => http.get<BlogTagListResType>(prefix),
    create:(body: CreateBlogTagBodyType) => http.post<BlogTagResType>(prefix, body), 
    get:(id:number) => http.get<BlogTagResType>(`${prefix}/${id}`),
    update:(id:number, body:CreateBlogTagBodyType) => http.put<BlogTagResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<BlogTagResType>(`${prefix}/${id}`),
}

export default blogTagApiRequest