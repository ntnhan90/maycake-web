import http from "@/utils/http";
import { ProLabelListResType , CreateProLabelBodyType, ProLabelResType} from "@/models/product/labelsModel";

const labelsApiRequest = {
    list: () => http.get<ProLabelListResType>('product-labels', { next: { tags: ['dishes'] } }),
    create:(body: CreateProLabelBodyType) => http.post<ProLabelResType>('product-labels', body),
    get:(id:number) => http.get<ProLabelResType>(`product-labels/${id}`),
    update:(id:number, body:CreateProLabelBodyType) => http.put<ProLabelResType>(`product-labels/${id}`,body),
    delete:(id:number) => http.delete<ProLabelResType>(`product-labels/${id}`),
}

export default labelsApiRequest