import http from "@/utils/http";
import { ContactListResType, ContactResType, CreateContactBodyType } from "@/models/contactModel";

const prefix = '/contact'

const contactApiRequest = {
    list:() => http.get<ContactListResType>(`${prefix}`),
    get:(id:number) => http.get<ContactResType>(`${prefix}/${id}`),
    create:(body: CreateContactBodyType) => http.post<ContactResType>(prefix, body),    
    update:(id:number, body: CreateContactBodyType) => http.put<ContactResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<ContactResType>(`${prefix}/${id}`),
}
export default contactApiRequest