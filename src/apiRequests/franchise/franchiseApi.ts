import http from "@/utils/http";
import { FranchiseListResType, FranchiseResType, CreateFranchiseBodyType } from "@/models/franchise/crmModel";
const prefix = '/franchise'
const franchiseApiRequest = {
    list:(params?: {
        search?:string; 
        q?: string; 
        page?: number; 
        limit?: number ,
        order?:string
    }) => http.get<FranchiseListResType>(prefix,{params}),
    create:(body: CreateFranchiseBodyType) => http.post<FranchiseResType>(prefix, body),  
    get:(id:number) => http.get<FranchiseResType>(`${prefix}/${id}`),
    update:(id:number, body: CreateFranchiseBodyType) => http.put<FranchiseResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<FranchiseResType>(`${prefix}/${id}`),
}

export default franchiseApiRequest