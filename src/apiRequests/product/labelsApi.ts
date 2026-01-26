import http from "@/utils/http";
import { ProLabelListResType , CreateProLabelBodyType, ProLabelResType} from "@/models/product/labelsModel";

const prefix = '/product-labels'
const labelsApiRequest = {
    list: () => http.get<ProLabelListResType>(`${prefix}`),
    create:(body: CreateProLabelBodyType) => http.post<ProLabelResType>(prefix, body),
    get:(id:number) => http.get<ProLabelResType>(`${prefix}/${id}`),
    update:(id:number, body:CreateProLabelBodyType) => http.put<ProLabelResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<ProLabelResType>(`${prefix}/${id}`),
}

export default labelsApiRequest