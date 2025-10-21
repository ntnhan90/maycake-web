import http from '@/lib/http'
import {
    LoginBodyType,
    LoginResType,
 } from '@/schema/auth.schema'

const authApiRequest ={
    sLogin: (body: LoginBodyType) => http.post<LoginResType>('/admin/login', body),
    login: (body: LoginBodyType) =>
        http.post<LoginResType>('/api/auth/login', body, {
            baseUrl: ''
        }),
}
export default authApiRequest