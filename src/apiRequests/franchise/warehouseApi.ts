import http from "@/utils/http";
import { WarehouseListType, WarehouseResType, CreateWarehouseBodyType } from "@/models/franchise/warehouseModel";
const prefix = '/warehouses'

const warehouseApiRequest = {
    list:(params?: {
        search?:string; 
        q?: string; 
        page?: number; 
        limit?: number ,
        order?:string
    }) => http.get<WarehouseListType>(prefix,{params}),
    create:(body: CreateWarehouseBodyType) => http.post<WarehouseResType>(prefix, body),  
    get:(id:number) => http.get<WarehouseResType>(`${prefix}/${id}`),
    update:(id:number, body: CreateWarehouseBodyType) => http.put<WarehouseResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<WarehouseResType>(`${prefix}/${id}`),
}

export default warehouseApiRequest