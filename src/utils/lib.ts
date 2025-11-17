import { toast } from "react-toastify";
import { UseFormSetError } from 'react-hook-form'
import { EntityError } from "./http";
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
        error.payload.errors.forEach((item) => {
            setError(item.field, {
                type: 'server',
                message: item.message
            })
        })
    } else {
        toast.error("Error" ,{
            autoClose: duration, // ms
        });
    }
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