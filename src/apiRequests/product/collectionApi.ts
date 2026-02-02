import http from "@/utils/http";
import { CreateProCollectionBodyType, ProCollectionListResType , ProCollectionResType } from "@/models/product/collectionModel";
const prefix = '/product-collections'
const collectionApiRequest = {
    list:(params?: {
        search?:string; 
        q?: string; 
        page?: number; 
        limit?: number ,
        order?:string
    }) => http.get<ProCollectionListResType>(prefix,{params}),
    create:(body: CreateProCollectionBodyType) => http.post<ProCollectionResType>(prefix, body),
    get:(id:number) => http.get<ProCollectionResType>(`${prefix}/${id}`),
    update:(id:number, body:CreateProCollectionBodyType) => http.put<ProCollectionResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<ProCollectionResType>(`${prefix}/${id}`),
}

export default collectionApiRequest