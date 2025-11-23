import http from "@/utils/http";
import { LoginBodyType, LoginResType, LogoutBodyType, RefreshTokenBodyType, RefreshTokenResType } from "@/models/authModel";

const authApiRequest = {
    refreshTokenRequest: null as Promise<{
        status: number
        payload: RefreshTokenResType
    }> | null,

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


    sRefreshToken: (body: RefreshTokenBodyType) =>http.post<RefreshTokenResType>('/admin/refresh-token', body),  
    async refreshToken(){
        if (this.refreshTokenRequest) {
            return this.refreshTokenRequest
        }
        this.refreshTokenRequest = http.post<RefreshTokenResType>(
            '/api/auth/refresh-token',
            null,
            {  baseUrl: '' }
        )
        const result = await this.refreshTokenRequest
        this.refreshTokenRequest = null
        return result
    },

    setTokenToCookie:(body:{accessToken:string; refreshToken: string }) => http.post('api/auth/token',body,{ baseUrl: ''})
}

export default authApiRequest