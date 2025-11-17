import authApiRequest from "@/apiRequests/auth"
import { LoginBodyType } from "@/models/authModels"
import { HttpError } from "@/utils/http"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export async function POST(request: Request) {
    const body = (await request.json()) as LoginBodyType
    const cookieStore = await cookies()
    try {
        const {payload} = await authApiRequest.sLogin(body);
       // const {accessToken, refreshToken} = payload.data;
        console.log(payload)
        const {accessToken, refreshToken} = payload;
        const decodedAccessToken = jwt.decode(accessToken) as { exp: number}
        const decodedRefreshToken = jwt.decode(refreshToken) as { exp: number}
        cookieStore.set('accessToken', accessToken, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: true,
            expires: new Date(decodedAccessToken.exp * 1000)
        })
        cookieStore.set('refreshToken', refreshToken, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: true,
            expires: new Date(decodedRefreshToken.exp * 1000)
        })

        return Response.json(payload)
    } catch (error) {
        if(error instanceof HttpError){
            return Response.json(error.payload,{
                status: error.status
            })
        }else {
            return Response.json(
                {
                    message: 'Error'
                },
                {
                    status: 500
                }
            )
        }
    }
}