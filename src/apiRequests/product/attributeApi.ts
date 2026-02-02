import http from "@/utils/http";
import { AttributeListResType, AttributeSetResType, CreateAttributeSetBodyType } from "@/models/product/attributeModel";

const prefix = '/product-attributes'

const attributeApiRequest = {
    list:(params?: {
        search?:string; 
        q?: string; 
        page?: number; 
        limit?: number ,
        order?:string
    }) => http.get<AttributeListResType>(prefix,{params}),
    create:(body: CreateAttributeSetBodyType) => http.post<AttributeSetResType>(prefix, body),
    get:(id:number) => http.get<AttributeSetResType>(`${prefix}/${id}`),
    update:(id:number, body:CreateAttributeSetBodyType) => http.put<AttributeSetResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<AttributeSetResType>(`${prefix}/${id}`),
}

export default attributeApiRequest