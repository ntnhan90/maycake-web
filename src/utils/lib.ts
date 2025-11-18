import { toast } from "react-toastify";
import { UseFormSetError } from 'react-hook-form'
import { EntityError } from "./http";
import { Role,TokenPayload } from "@/types/jwt.type";
import { jwtDecode } from 'jwt-decode'
import authApiRequest from "@/apiRequests/auth";
import { io } from 'socket.io-client'
/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path:string) =>{
    return path.startsWith('/') ? path.slice(1) : path
}

export function capitalizedWord(str:string){
    return str.replace(/-|\b\w/g,(match) => {
        if(match === "-" ){
            return " ";
        }
        return match.toUpperCase();
    });
}

const isBrowser = typeof window !== 'undefined'
export const getAccessTokenFromLocalStorage = () =>
  isBrowser ? localStorage.getItem('accessToken') : null
export const getRefreshTokenFromLocalStorage = () =>
  isBrowser ? localStorage.getItem('refreshToken') : null

export const setAccessTokenToLocalStorage = (value: string) =>
  isBrowser && localStorage.setItem('accessToken', value)
export const setRefreshTokenToLocalStorage = (value: string) =>
  isBrowser && localStorage.setItem('refreshToken', value)

export const removeTokensFromLocalStorage = () => {
  isBrowser && localStorage.removeItem('accessToken')
  isBrowser && localStorage.removeItem('refreshToken')
}

export const handleErrorApi = ({
	error,
	setError,
	duration
}: {
	error: any
	setError?: UseFormSetError<any>
	duration?: number
}) => {
	if (error instanceof EntityError && setError) {
		console.log(error.payload);
		
	} else {
		toast.error("Error" ,{
            autoClose: duration, // ms
        });
	}
}


export const checkAndRefreshToken = async (param?: {
    onError?: () => void
    onSuccess?: () => void
    force?: boolean
}) => {
    // Không nên đưa logic lấy access và refresh token ra khỏi cái function `checkAndRefreshToken`
    // Vì để mỗi lần mà checkAndRefreshToken() được gọi thì chúng ta se có một access và refresh token mới
    // Tránh hiện tượng bug nó lấy access và refresh token cũ ở lần đầu rồi gọi cho các lần tiếp theo
    const accessToken = getAccessTokenFromLocalStorage()
    const refreshToken = getRefreshTokenFromLocalStorage()
    // Chưa đăng nhập thì cũng không cho chạy
    if (!accessToken || !refreshToken) return
    const decodedAccessToken = decodeToken(accessToken)
    const decodedRefreshToken = decodeToken(refreshToken)
    // Thời điểm hết hạn của token là tính theo epoch time (s)
    // Còn khi các bạn dùng cú pháp new Date().getTime() thì nó sẽ trả về epoch time (ms)
    const now = Math.round(new Date().getTime() / 1000)
    // trường hợp refresh token hết hạn thì cho logout
    if (decodedRefreshToken.exp <= now) {
      removeTokensFromLocalStorage()
      return param?.onError && param.onError()
    }
    // Ví dụ access token của chúng ta có thời gian hết hạn là 10s
    // thì mình sẽ kiểm tra còn 1/3 thời gian (3s) thì mình sẽ cho refresh token lại
    // Thời gian còn lại sẽ tính dựa trên công thức: decodedAccessToken.exp - now
    // Thời gian hết hạn của access token dựa trên công thức: decodedAccessToken.exp - decodedAccessToken.iat
    if (
      param?.force ||
      decodedAccessToken.exp - now <
        (decodedAccessToken.exp - decodedAccessToken.iat) / 3
    ) {
      // Gọi API refresh token
      try {
        const role = decodedRefreshToken.role
        const res = await authApiRequest.refreshToken()
         
        setAccessTokenToLocalStorage(res.payload.data.accessToken)
        setRefreshTokenToLocalStorage(res.payload.data.refreshToken)
        param?.onSuccess && param.onSuccess()
      } catch (error) {
        param?.onError && param.onError()
      }
    }
}

export const decodeToken = (token: string) => {
  return jwtDecode(token) as TokenPayload
}

export const generateSocketInstace = (accessToken: string) => {
    return io(process.env.NEXT_PUBLIC_API_ENDPOINT, {
        auth: {
          Authorization: `Bearer ${accessToken}`
        }
  })
}
/**
 * toast.success("Success!");
toast.error("Error");
toast.warning("Warning!");
toast.info("Information");
toast("Message bình thường");

const notify = () => {
    toast.success("Thành công bằng React-Toastify + TSX!");
  };

      <button
        onClick={notify}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
 */