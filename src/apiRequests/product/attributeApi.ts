import http from "@/utils/http";
import { ProAttributeListResType, ProAttributeResType, CreateProAttributeBodyType } from "@/models/product/attributeModel";

const attributeApiRequest = {
    list: () => http.get<ProAttributeListResType>('product-attributes'),
    create:(body: CreateProAttributeBodyType) => http.post<ProAttributeResType>('product-attributes', body),
    get:(id:number) => http.get<ProAttributeResType>(`product-attributes/${id}`),
    update:(id:number, body:CreateProAttributeBodyType) => http.put<ProAttributeResType>(`product-attributes/${id}`,body),
    delete:(id:number) => http.delete<ProAttributeResType>(`product-attributes/${id}`),
}

export default attributeApiRequest