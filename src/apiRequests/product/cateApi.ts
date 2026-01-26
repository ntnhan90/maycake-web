import http from "@/utils/http";
import { CreateProCateBodyType, ProCateListResType, ProCateResType, CategoryWithCountType} from "@/models/product/categoryModel";

const prefix = '/product-categories'
const cateApiRequest = {
    list:() => http.get<ProCateListResType>(`${prefix}`),
    tree:() => http.get<CategoryWithCountType>(`${prefix}/tree`),
    create:(body: CreateProCateBodyType) => http.post<ProCateResType>(prefix, body),
    get:(id:number) => http.get<ProCateResType>(`${prefix}/${id}`),
    update:(id:number, body:CreateProCateBodyType) => http.put<ProCateResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<ProCateResType>(`${prefix}/${id}`),
}

export default cateApiRequest