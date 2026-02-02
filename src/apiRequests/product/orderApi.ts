import http from "@/utils/http";
import { OrderListResType, CreateOrderBodyType, OrderResType } from "@/models/product/orderModel";

const prefix = '/orders'
const orderApiRequest = {
    list:(params?: {
        search?:string; 
        q?: string; 
        page?: number; 
        limit?: number ,
        order?:string
    }) => http.get<OrderListResType>(prefix,{params}),
    create:(body: CreateOrderBodyType) => http.post<OrderResType>(prefix, body),
    get:(id:number) => http.get<OrderResType>(`${prefix}/${id}`),
    update:(id:number, body:CreateOrderBodyType) => http.put<OrderResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<OrderResType>(`${prefix}/${id}`),
}

export default orderApiRequest