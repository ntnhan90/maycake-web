import http from "@/utils/http";
import { CustomerListResType, CustomerResType, CreateCustomerBodyType } from "@/models/product/customerModel";

const prefix = '/customers'
const customerApiRequest ={
    list:() => http.get<CustomerListResType>(`${prefix}`),
    get:(id:number) => http.get<CustomerResType>(`${prefix}/${id}`),
    create:(body: CreateCustomerBodyType) => http.post<CustomerResType>(prefix, body),
    update:(id:number, body:CreateCustomerBodyType) =>http.put<CustomerResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<CustomerResType>(`${prefix}/${id}`),
}

export default customerApiRequest