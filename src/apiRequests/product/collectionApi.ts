import http from "@/utils/http";
import { CreateProCollectionBodyType, ProCollectionListResType , ProCollectionResType } from "@/models/product/collectionModel";

const collectionApiRequest = {
    list:() => http.get<ProCollectionListResType>(`/product-collections`),
    create:(body: CreateProCollectionBodyType) => http.post<ProCollectionResType>('product-collections', body),
    get:(id:number) => http.get<ProCollectionResType>(`product-collections/${id}`),
    update:(id:number, body:CreateProCollectionBodyType) => http.put<ProCollectionResType>(`product-collections/${id}`,body),
    delete:(id:number) => http.delete<ProCollectionResType>(`product-collections/${id}`),
}

export default collectionApiRequest