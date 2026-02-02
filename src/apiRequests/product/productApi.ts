import http from "@/utils/http";
import { ProductListResType, CreateProductBodyType, ProductResType } from "@/models/product/productModel";
const prefix = '/products'
const productApiRequest = {
    list:(params?: {
        search?:string; 
        q?: string; 
        page?: number; 
        limit?: number ,
        order?:string
    }) => http.get<ProductListResType>(prefix,{params}),
    create:(body: CreateProductBodyType) => http.post<ProductResType>(prefix, body),
    get:(id:number) => http.get<ProductResType>(`${prefix}/${id}`),
    update:(id:number, body:CreateProductBodyType) => http.put<ProductResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<ProductResType>(`${prefix}/${id}`),
}

export default productApiRequest