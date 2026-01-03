'use client'

import { getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage, setAccessTokenToLocalStorage, setRefreshTokenToLocalStorage } from "@/utils/lib";
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react";
import jwt from 'jsonwebtoken';
import authApiRequest from "@/apiRequests/auth";
import { checkAndRefreshToken } from "@/utils/lib";

const UNAUTHENTICATED_PATH = ['/admin/login', '/admin/logout', '/admin/refresh-token']
export default function RefreshToken(){
    const pathname = usePathname()
 
    useEffect(() =>{
        if (UNAUTHENTICATED_PATH.includes(pathname)) return
       
        let interval : any = null;
        // Phải gọi lần đầu tiên, vì interval sẽ chạy sau thời gian TIMEOUT
        const onRefreshToken = (force?: boolean) => {
            checkAndRefreshToken({
                onError: () => {
                    clearInterval(interval)
                },
                force
            })
        }
        onRefreshToken()
        // Timeout interval phải bé hơn thời gian hết hạn của access token
    // Ví dụ thời gian hết hạn access token là 10s thì 1s mình sẽ cho check 1 lần
        const TIMEOUT = 10000
        interval = setInterval(checkAndRefreshToken, TIMEOUT);
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [pathname])

    return null
}