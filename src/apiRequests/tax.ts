import http from "@/utils/http";
import { TaxResType, TaxListResType, CreateTaxBodyType } from "@/models/taxModel";


const taxApiRequest = {
    list:() => http.get<TaxListResType>(`/tax`),
    create:(body: CreateTaxBodyType) => http.post<TaxResType>('tax', body),
    get:(id:number) => http.get<TaxResType>(`tax/${id}`),
    update:(id:number, body:CreateTaxBodyType) => http.put<TaxResType>(`tax/${id}`,body),
    delete:(id:number) => http.delete<TaxResType>(`tax/${id}`),
}
export default taxApiRequest