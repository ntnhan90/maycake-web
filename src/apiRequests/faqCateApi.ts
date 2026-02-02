import http from "@/utils/http";
import { FaqCateListResType, FaqCateResType, CreateFaqCateBodyType  } from "@/models/faqModel";

const prefix = '/faq-cate'
const faqCateApiRequest = {
    list:(params?: {
        search?:string; 
        q?: string; 
        page?: number; 
        limit?: number ,
        order?:string
    }) => http.get<FaqCateListResType>(prefix,{params}),
    create:(body: CreateFaqCateBodyType) => http.post<FaqCateResType>(prefix, body),  
    get:(id:number) => http.get<FaqCateResType>(`${prefix}/${id}`),
    update:(id:number, body: CreateFaqCateBodyType) => http.put<FaqCateResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<FaqCateResType>(`${prefix}/${id}`),
}

export default faqCateApiRequest