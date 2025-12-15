import http from "@/utils/http";
import { ProductListResType, CreateProductBodyType, ProductResType } from "@/models/product/productModel";
const productApiRequest = {
    list: () => http.get<ProductListResType>('products'),
    create:(body: CreateProductBodyType) => http.post<ProductResType>('products', body),
    get:(id:number) => http.get<ProductResType>(`products/${id}`),
    update:(id:number, body:CreateProductBodyType) => http.put<ProductResType>(`products/${id}`,body),
    delete:(id:number) => http.delete<ProductResType>(`products/${id}`),
}

export default productApiRequest