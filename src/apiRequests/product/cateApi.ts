import http from "@/utils/http";
import { CreateProCateBodyType, ProCateListResType, ProCateResType, CategoryWithCountType} from "@/models/product/categoryModel";
const prefix = '/product-categories'
const cateApiRequest = {
    list:() => http.get<ProCateListResType>(`/product-categories`),
    tree:() => http.get<CategoryWithCountType>(`${prefix}/tree`),
    create:(body: CreateProCateBodyType) => http.post<ProCateResType>('product-categories', body),
    get:(id:number) => http.get<ProCateResType>(`product-categories/${id}`),
    update:(id:number, body:CreateProCateBodyType) => http.put<ProCateResType>(`product-categories/${id}`,body),
    delete:(id:number) => http.delete<ProCateResType>(`product-categories/${id}`),
}

export default cateApiRequest