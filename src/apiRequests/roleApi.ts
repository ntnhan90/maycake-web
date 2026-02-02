import http from "@/utils/http";
import { RoleListResType, RoleResType, CreateRoleBodyType,PermissionListResType } from "@/models/roleModel";

const prefix = 'roles'
const roleApiRequest = {
    list:(params?: {
        search?:string; 
        q?: string; 
        page?: number; 
        limit?: number ,
        order?:string
    }) => http.get<RoleListResType>(prefix,{params}),
    create:(body: CreateRoleBodyType) => http.post<RoleResType>(prefix, body),  
    get:(id:number) => http.get<RoleResType>(`${prefix}/${id}`),
    update:(id:number, body:CreateRoleBodyType) => http.put<RoleResType>(`${prefix}/${id}`, body),
    delete:(id:number) => http.delete<RoleResType>(`${prefix}/${id}`),
    getPermissions: () => http.get<PermissionListResType>('permission'),
}

export default roleApiRequest