import http from "@/utils/http";
import { CreateBlogCateBodyType, BlogCateListResType, BlogCateResType } from "@/models/blog/categoryModel";

const prefix = '/categories'
const blogCategoryApiRequest = {
    list:() => http.get<BlogCateListResType>(`${prefix}`),
    create:(body: CreateBlogCateBodyType) => http.post<BlogCateResType>(prefix, body), 
    get:(id:number) => http.get<BlogCateResType>(`${prefix}/${id}`),
    update:(id:number, body:CreateBlogCateBodyType) => http.put<BlogCateResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<BlogCateResType>(`${prefix}/${id}`),
}

export default blogCategoryApiRequest