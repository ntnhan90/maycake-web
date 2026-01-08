import http from "@/utils/http";
import { FaqsListResType, FaqsResType, CreateFaqsBodyType  } from "@/models/faqModel";
const prefix = '/faqs'

const faqApiRequest = {
    list:() => http.get<FaqsListResType>(`${prefix}`),
    get:(id:number) => http.get<FaqsResType>(`${prefix}/${id}`),
    create:(body: CreateFaqsBodyType) => http.post<FaqsResType>(prefix, body),    
    update:(id:number, body: CreateFaqsBodyType) => http.put<FaqsResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<FaqsResType>(`${prefix}/${id}`),
}

export default faqApiRequest