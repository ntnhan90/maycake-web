import http from "@/utils/http";
import { DiscountListResType, DiscountResType , CreateDiscountBodyType} from "@/models/product/discountModel";

const prefix = '/discount'
const discountApiRequest ={
    list:() => http.get<DiscountListResType>(`${prefix}`),
    get:(id:number) => http.get<DiscountResType>(`${prefix}/${id}`),
    create:(body: CreateDiscountBodyType) => http.post<DiscountResType>(prefix, body),
    update:(id:number, body:CreateDiscountBodyType) =>http.put<DiscountResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<DiscountResType>(`${prefix}/${id}`),
}

export default discountApiRequest