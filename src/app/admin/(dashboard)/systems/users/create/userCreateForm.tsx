"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddAccountMutation } from "@/queries/useAccount"
import { handleErrorApi } from "@/utils/lib";
import { Card, CardBody , CardHeader, Button} from "react-bootstrap";
// schemas/user.schema.ts
import { CreateAccountBody,CreateAccountBodyType} from "@/models/accountModel";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function UserCreateForm() {
    const [file, setFile] = useState<File | null>(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm<CreateAccountBodyType>({
        resolver: zodResolver(CreateAccountBody),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            first_name:"",
            last_name: "",
        },
    });

    const router = useRouter()
    const addAccountMutation = useAddAccountMutation()
    const onSubmit = async (data: CreateAccountBodyType) => {
        if (addAccountMutation.isPending) return
        try {
            let body = data
            const result = await addAccountMutation.mutateAsync(body)
            reset({
                username:  "",
                email: "",
                password: "",           // không fill password
                confirmPassword: "",
            })
            toast.success("add success");
            router.push("/admin/systems/users")
        } catch (error) {
            console.error(error)
            handleErrorApi({
                error,
                setError: setError
            })
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit,(err) =>{
            console.log(err)
        })} className="row">
            <div className="col-md-9">
                <Card className="">
                    <CardBody>
                        <div className="row row-cols-lg-2">
                            <div className="mb-3 position-relative">
                                <label className="form-label form-label" htmlFor="first_name">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input className="form-control " placeholder="Enter first name"  {...register("first_name")} />
                                {errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}
                            </div>

                            <div className="mb-3 position-relative">
                                <label className="form-label form-label" htmlFor="first_name">
                                    Last Name<span className="text-red-500">*</span>
                                </label>
                                <input className="form-control " placeholder="Enter last name"  {...register("last_name")} />
                                {errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>}
                            </div>

                            <div className="mb-3 position-relative">
                                <label className="form-label form-label" htmlFor="first_name">
                                    Username <span className="text-red-500">*</span>
                                </label>
                                <input className="form-control " placeholder="Enter Username"  {...register("username")} />
                                {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                            </div>

                            <div className="mb-3 position-relative">
                                <label className="form-label form-label" htmlFor="email">
                                    Email<span className="text-red-500">*</span>
                                </label>
                                <input className="form-control " placeholder="Enter email"  {...register("email")} />
                                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                            </div>

                            <div className="mb-3 position-relative">
                                <label className="form-label form-label" htmlFor="phone">
                                    Phone <span className="text-red-500">*</span>
                                </label>
                                <input className="form-control " placeholder="Enter phone"  name="phone"/>
                            </div>

                            <div className="col-lg-12">
                                <div className="mb-3 position-relative">
                                    <label className="form-label form-label" htmlFor="password">
                                        Password<span className="text-red-500">*</span>
                                    </label>
                                    <input className="form-control " placeholder="Enter password"  {...register("password")} />
                                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="mb-3 position-relative">
                                    <label className="form-label form-label" htmlFor="password">
                                        Confirm Password<span className="text-red-500">*</span>
                                    </label>
                                    <input className="form-control " placeholder="Enter password"  {...register("confirmPassword")} />
                                    {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
           
            <div className="col-md-3">
                <Card >
                    <CardHeader>
                        <h4 className="card-title">Puslish</h4>
                    </CardHeader>
                    <CardBody>
                        <div className="btn-list">
                            <Button variant="primary" type="submit">Save</Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
            
        </form>
    );
}
