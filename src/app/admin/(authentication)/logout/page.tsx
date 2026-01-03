'use client'

import { useLogoutMutation } from "@/queries/useAuth"
import { getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage } from "@/utils/lib"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"
export default function LogoutPage(){
    const {mutateAsync} = useLogoutMutation()
    const router = useRouter()
    const ref = useRef<any>(null)
    const searchParams = useSearchParams()
    const refreshTokenFromUrl = searchParams.get('refreshToken')
    const accessTokenFromUrl = searchParams.get('refreshToken')

    useEffect(() =>{
        if (
            ref.current || !refreshTokenFromUrl || !accessTokenFromUrl ||
            (refreshTokenFromUrl && refreshTokenFromUrl !== getRefreshTokenFromLocalStorage()) ||
            (accessTokenFromUrl && accessTokenFromUrl !== getAccessTokenFromLocalStorage())
        ) {
        return
        }
            
        ref.current= mutateAsync
        mutateAsync().then((res) =>{
            setTimeout(() =>{
                ref.current = null
            },1000)
            router.push("/")
        })
    },[mutateAsync, router])

    return (
        <div> Logout Page</div>
    )
}