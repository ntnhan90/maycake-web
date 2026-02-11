import http from "@/utils/http";
import { MaterialResType, MaterialListResType, CreateMaterialBodyType } from "@/models/materialModel";
const prefix = '/product-materials'

const materialApiRequest = {
    list:(params?:{
        search?:string; 
        q?: string; 
        page?: number; 
        limit?: number ,
        order?:string
    }) => http.get<MaterialListResType>(prefix,{params}),
    get:(id:number) => http.get<MaterialResType>(`${prefix}/${id}`),
    create:(body: CreateMaterialBodyType) => http.post<MaterialResType>(prefix, body),    
    update:(id:number, body: CreateMaterialBodyType) => http.put<MaterialResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<MaterialResType>(`${prefix}/${id}`),
}

export default materialApiRequest