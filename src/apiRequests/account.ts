import http from "@/utils/http";
import { AccountListResType, AccountResType } from "@/models/accountModel";
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
    list:() => http.get<AccountListResType>(`${prefix}`)

}

export default accountApiRequest