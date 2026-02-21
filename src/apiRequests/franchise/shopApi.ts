import http from "@/utils/http";
import { ShopListResType, ShopResType, CreateShopBodyType } from "@/models/franchise/shopModel";
const prefix = '/shop'

const shopApiRequest = {
    list:(params?: {
        search?:string; 
        q?: string; 
        page?: number; 
        limit?: number ,
        order?:string
    }) => http.get<ShopListResType>(prefix,{params}),
    create:(body: CreateShopBodyType) => http.post<ShopResType>(prefix, body),  
    get:(id:number) => http.get<ShopResType>(`${prefix}/${id}`),
    update:(id:number, body: CreateShopBodyType) => http.put<ShopResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<ShopResType>(`${prefix}/${id}`),
}

export default shopApiRequest