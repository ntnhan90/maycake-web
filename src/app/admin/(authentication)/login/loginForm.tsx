'use client'

import { Button, Col, FormControl, InputGroup, Row,} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import InputGroupText from 'react-bootstrap/InputGroupText'
import useDictionary from '@/locales/dictionary-hook'
import { useForm } from 'react-hook-form'
import { LoginBody, LoginBodyType } from '@/models/authModel'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLoginMutation } from '@/queries/useAuth'
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { handleErrorApi } from '@/utils/lib'

export default function LoginForm() {
    const dict = useDictionary()
    const loginMutation = useLoginMutation()
    const form = useForm<LoginBodyType>({
        resolver:zodResolver(LoginBody),
        defaultValues:{
            email:'',
            password: ''
        }
    })
    const router = useRouter()
    
    const onSubmit = async(data: LoginBodyType) =>{
        // Khi nhấn submit thì React hook form sẽ validate cái form bằng zod schema ở client trước
        // Nếu không pass qua vòng này thì sẽ không gọi api
        if(loginMutation.isPending) return
        try {
            const result = await loginMutation.mutateAsync(data)
            if (!result) throw new Error("Login fail");
            toast.info("Login success");

            router.push("/admin/")

        } catch (error:any) {
            console.log(error)
            handleErrorApi({
                error,
                setError: form.setError
            })
        }
    }

    return (
        <>
            <form onSubmit={form.handleSubmit(onSubmit, (err) =>{
                console.log(err)
            })} 
            
                className="space-y-4">
                <div>
                    <input
                    {...form.register("email")}
                    placeholder="Email"
                    className="border px-2 py-1"
                    />
                    {form.formState.errors.email && (
                    <p className="text-red-500 text-sm">
                        {form.formState.errors.email.message}
                    </p>
                    )}
                </div>

                <div>
                    <input
                    {...form.register("password")}
                    type="password"
                    placeholder="Password"
                    className="border px-2 py-1"
                    />
                    {form.formState.errors.password && (
                    <p className="text-red-500 text-sm">
                        {form.formState.errors.password.message}
                    </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Login
                </button>
            </form>
        </>
    )
}
