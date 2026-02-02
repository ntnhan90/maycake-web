import http from "@/utils/http";
import { CurrencyListResType, CurrencyResType, CreateCurrencyBodyType } from "@/models/currencyModel";

const prefix = '/currencies'
const currencyApiRequest ={
    list:(params?: {
        search?:string; 
        q?: string; 
        page?: number; 
        limit?: number ,
        order?:string
    }) => http.get<CurrencyListResType>(prefix,{params}),
    get:(id:number) => http.get<CurrencyResType>(`${prefix}/${id}`),
    create:(body: CreateCurrencyBodyType) => http.post<CurrencyResType>(prefix, body),
    update:(id:number, body:CreateCurrencyBodyType) =>http.put<CurrencyResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<CurrencyResType>(`${prefix}/${id}`),
}

export default currencyApiRequest