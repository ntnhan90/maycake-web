import http from "@/utils/http";
import { AttributeListResType, AttributeSetResType, CreateAttributeSetBodyType } from "@/models/product/attributeModel";

const attributeApiRequest = {
    list: () => http.get<AttributeListResType>('product-attributes'),
    create:(body: CreateAttributeSetBodyType) => http.post<AttributeSetResType>('product-attributes', body),
    get:(id:number) => http.get<AttributeSetResType>(`product-attributes/${id}`),
    update:(id:number, body:CreateAttributeSetBodyType) => http.put<AttributeSetResType>(`product-attributes/${id}`,body),
    delete:(id:number) => http.delete<AttributeSetResType>(`product-attributes/${id}`),
}

export default attributeApiRequest