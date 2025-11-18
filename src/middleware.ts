import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { type NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextMiddlewareResult } from 'next/dist/server/web/types'
import { getLocales } from '@/locales/dictionary'
import { defaultLocale } from '@/locales/config'
import jwt from 'jsonwebtoken'
import { TokenPayload } from './types/jwt.type'

const decodeToken = (token:string) => {
    return jwt.decode(token) as TokenPayload
}

const adminPaths = ['/admin',]
const isAdminLoginPage = '/admin/login';
const onlyOwnerPaths = ['/admin/accounts']
const privatePaths = [...adminPaths]
const unAuthPaths = ['/login', '/admin/login']
const loginPaths = ['/login', '/admin/login']

export default async function middleware(request: NextRequest, event: NextFetchEvent) {
    const headers = { 'accept-language': request.headers.get('accept-language') ?? '' }
    const languages = new Negotiator({ headers }).languages()
    const locales = getLocales()

    const locale = match(languages, locales, defaultLocale)
    const response = NextResponse.next()

    const { pathname , searchParams} = request.nextUrl

    const accessToken = request.cookies.get('accessToken')?.value
    const refreshToken = request.cookies.get('refreshToken')?.value

    if (!request.cookies.get('locale')) {
        response.cookies.set('locale', locale)
    }
    // 1. Chưa đăng nhập thì không cho vào private paths
    if(privatePaths.some((path) => pathname.startsWith(path)) && !refreshToken && !isAdminLoginPage){
        const url = new URL('/admin/login', request.url)
       // url.searchParams.set('clearTokens', 'true')
        return NextResponse.redirect(url)
    } 

    // 2. Trường hợp đã đăng nhập
    if (refreshToken) {
        // 2.1 Nếu cố tình vào trang login sẽ redirect về trang chủ
        if (unAuthPaths.some((path) => pathname.startsWith(path))) {
            if (
                loginPaths.some((path) => pathname.startsWith(path)) &&
                searchParams.get('accessToken')
            ) {
                return response
            }
            return NextResponse.redirect(new URL(`/`, request.url))
        }
    }
    return NextResponse.next()
}
