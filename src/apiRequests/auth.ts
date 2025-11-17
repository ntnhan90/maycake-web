import http from "@/utils/http";
import { LoginBodyType, LoginResType, LogoutBodyType, RefreshTokenBodyType, RefreshTokenResType } from "@/models/authModels";

const authApiRequest = {
    sLogin: (body:LoginBodyType) => http.post<LoginResType>('/admin/login', body),
    login: (body:LoginBodyType) => http.post<LoginResType>('/api/auth/login', body,{
        baseUrl: ''
    }),

    sLogout:(body: LogoutBodyType & {accessToken:string}) => http.post('admin/logout',{
        refreshToken: body.refreshToken
    },{
        headers: {
          Authorization: `Bearer ${body.accessToken}`
        }
    }),
    logout: () => http.post('/api/auth/logout', null, { baseUrl: '' }), // client gọi đến route handler, không cần truyền AT và RT vào body vì AT và RT tự  động gửi thông qua cookie rồi

    sRefreshToken: (body: RefreshTokenBodyType) =>http.post<RefreshTokenResType>('/auth/refresh-token', body),  
    async refreshToken(){

    },

    setTokenToCookie:(body:{accessToken:string; refreshToken: string }) => http.post('api/auth/token',body,{ baseUrl: ''})
}

export default authApiRequest