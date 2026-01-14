import http from "@/utils/http";
import { TaxResType, TaxListResType, CreateTaxBodyType } from "@/models/taxModel";

const prefix = '/tax'
const taxApiRequest = {
    list:() => http.get<TaxListResType>(prefix),
    create:(body: CreateTaxBodyType) => http.post<TaxResType>(prefix, body),
    get:(id:number) => http.get<TaxResType>(`${prefix}/${id}`),
    update:(id:number, body:CreateTaxBodyType) => http.put<TaxResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<TaxResType>(`${prefix}/${id}`),
}
export default taxApiRequest