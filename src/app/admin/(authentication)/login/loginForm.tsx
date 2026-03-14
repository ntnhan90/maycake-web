'use client'

import { Button, Form,} from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { LoginBody, LoginBodyType } from '@/models/authModel'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLoginMutation } from '@/queries/useAuth'
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { handleErrorApi } from '@/utils/lib'

export default function LoginForm() {
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
        if(loginMutation.isPending) return
        try {
            const result = await loginMutation.mutateAsync(data)
            if (!result) throw new Error("Login fail");
            toast.info("Login success");

            router.push("/admin/")

        } catch (error:any) {
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
                className="row">
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <input placeholder="Enter email" className="form-control"
                        {...form.register("email")}
                    />
                    {form.formState.errors.email && (
                    <p className="text-red-500 text-sm">
                        {form.formState.errors.email.message}
                    </p>
                    )}
                </Form.Group>
              
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <input
                    {...form.register("password")}
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    />
                    {form.formState.errors.password && (
                    <p className="text-red-500 text-sm">
                        {form.formState.errors.password.message}
                    </p>
                    )}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </form>
        </>
    )
}
