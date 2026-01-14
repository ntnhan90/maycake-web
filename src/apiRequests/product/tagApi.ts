import http from "@/utils/http";
import { CreateProTagBodyType, ProTagListResType, ProTagResType } from "@/models/product/tagModel";

const prefix = '/product-tags'

const tagApiRequest = {
    list:() => http.get<ProTagListResType>(`${prefix}`),
    create:(body: CreateProTagBodyType) => http.post<ProTagResType>(prefix, body),
    get:(id:number) => http.get<ProTagResType>(`${prefix}/${id}`),
    update:(id:number, body:CreateProTagBodyType) => http.put<ProTagResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<ProTagResType>(`${prefix}/${id}`),
}

export default tagApiRequest