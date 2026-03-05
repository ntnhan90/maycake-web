import http from "@/utils/http";
import { SupplyOrderListType, SupplyOrderResType, CreateSupplyOrderBodyType } from "@/models/franchise/supplyOrderModel";
const prefix = '/supply-order'

const supplyOrderApiRequest = {
    list:(params?: {
        search?:string; 
        q?: string; 
        page?: number; 
        limit?: number ,
        order?:string
    }) => http.get<SupplyOrderListType>(prefix,{params}),
    create:(body: CreateSupplyOrderBodyType) => http.post<SupplyOrderResType>(prefix, body),  
    get:(id:number) => http.get<SupplyOrderResType>(`${prefix}/${id}`),
    update:(id:number, body: CreateSupplyOrderBodyType) => http.put<SupplyOrderResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<SupplyOrderResType>(`${prefix}/${id}`),
}

export default supplyOrderApiRequest