import http from "@/utils/http";
import { CurrencyListResType, CurrencyResType, CreateCurrencyBodyType } from "@/models/currencyModel";

const prefix = '/currencies'
const currencyApiRequest ={
    list:() => http.get<CurrencyListResType>(`${prefix}`),
    get:(id:number) => http.get<CurrencyResType>(`${prefix}/${id}`),
    create:(body: CreateCurrencyBodyType) => http.post<CurrencyResType>(prefix, body),
    update:(id:number, body:CreateCurrencyBodyType) =>http.put<CurrencyResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<CurrencyResType>(`${prefix}/${id}`),
}

export default currencyApiRequest