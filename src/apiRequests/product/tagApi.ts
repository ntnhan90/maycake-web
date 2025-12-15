import http from "@/utils/http";
import { CreateProTagBodyType, ProTagListResType, ProTagResType } from "@/models/product/tagModel";

const tagApiRequest = {
    list:() => http.get<ProTagListResType>(`/product-tags`),
    create:(body: CreateProTagBodyType) => http.post<ProTagResType>('product-tags', body),
    get:(id:number) => http.get<ProTagResType>(`product-tags/${id}`),
    update:(id:number, body:CreateProTagBodyType) => http.put<ProTagResType>(`product-tags/${id}`,body),
    delete:(id:number) => http.delete<ProTagResType>(`product-tags/${id}`),
}

export default tagApiRequest