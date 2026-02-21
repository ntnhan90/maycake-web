import http from "@/utils/http";
import { ContractListResType, ContractResType, CreateContractBodyType } from "@/models/franchise/contractModel";
const prefix = '/contract'

const contractApiRequest = {
    list:(params?: {
        search?:string; 
        q?: string; 
        page?: number; 
        limit?: number ,
        order?:string
    }) => http.get<ContractListResType>(prefix,{params}),
    create:(body: CreateContractBodyType) => http.post<ContractResType>(prefix, body),  
    get:(id:number) => http.get<ContractResType>(`${prefix}/${id}`),
    update:(id:number, body: CreateContractBodyType) => http.put<ContractResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<ContractResType>(`${prefix}/${id}`),
}

export default contractApiRequest