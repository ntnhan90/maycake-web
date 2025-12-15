import http from "@/utils/http";
import { RoleListResType, RoleResType, CreateRoleBodyType } from "@/models/roleModel";

const roleApiRequest = {
    list: () => http.get<RoleListResType>('roles'),
    create:(body: CreateRoleBodyType) => http.post<RoleResType>('roles', body),
    get:(id:number) => http.get<RoleResType>(`roles/${id}`),
    update:(id:number, body:CreateRoleBodyType) => http.put<RoleResType>(`roles/${id}`,body),
    delete:(id:number) => http.delete<RoleResType>(`roles/${id}`),
}

export default roleApiRequest