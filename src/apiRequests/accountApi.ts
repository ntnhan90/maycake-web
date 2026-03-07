import http from "@/utils/http";
import { AccountListResType, AccountResType ,CreateAccountBodyType,UpdateAccountBodyType} from "@/models/accountModel";
import queryString from 'query-string'

const prefix = '/user'

const accountApiRequest = {
    me: () => http.get<AccountResType>(`profile`),
    sMe:(accessToken:string) => http.get<AccountResType>(`profile`,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    }),
    //updateMe
    //changePassword
    list:() => http.get<AccountListResType>(`${prefix}`),
    get:(id:number) => http.get<AccountResType>(`${prefix}/${id}`),
    add:(body: CreateAccountBodyType) => http.post<AccountResType>(prefix, body),    
    update:(id:number, body: UpdateAccountBodyType) => http.put<AccountResType>(`${prefix}/${id}`, body),
}

export default accountApiRequest