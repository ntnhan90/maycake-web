"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCustomerMutation } from "@/queries/useCustomer";
import { handleErrorApi } from "@/utils/lib";
import { Card, CardBody , CardHeader, Button, Form} from "react-bootstrap";
import { CreateCustomerBodyType, CreateCustomerBody } from "@/models/product/customerModel";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { toDatetimeLocal } from "@/utils/lib";

export default function CreateCustomerForm() {
    const [value, setValue] = useState('');
    const [file, setFile] = useState<File | null>(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm<CreateCustomerBodyType>({
        resolver: zodResolver(CreateCustomerBody),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
           
        },
    });

    const router = useRouter()
    const addCustomerMutation = useCreateCustomerMutation()
    const onSubmit = async (data: CreateCustomerBodyType) => {
        if (addCustomerMutation.isPending) return
        try {
            let body = data
            console.log("body " , body)
            const result = await addCustomerMutation.mutateAsync(body)
            reset({
                name:  "",
                email: "",
                password: "",           // không fill password
                confirmPassword: "",
            })
            toast.success("add success");
            router.push("/admin/ecommerce/customers")
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
                                <label className="form-label form-label" htmlFor="email">
                                    Name<span className="text-red-500">*</span>
                                </label>
                                <input className="form-control " placeholder="Enter name"  {...register("name")} />
                                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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
                                <input
                                    className="form-control"
                                    placeholder="Enter phone"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={10}
                                    {...register('phone', {
                                    setValueAs: (v) => v.replace(/\D/g, ''), // ❌ chặn chữ cái & ký tự đặc biệt
                                })} />
                                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                            </div>

                            <div className="mb-3 position-relative">
                                <label className="form-label form-label" htmlFor="phone">
                                    Date of birth <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    {...register('dob', {
                                        valueAsDate: true,
                                    })}
                                    className="form-control "
                                />
                            </div>

                            <div className="col-lg-12">
                                <div className="mb-3 position-relative">
                                    <label className="form-label form-label" htmlFor="password">
                                        Password<span className="text-red-500">*</span>
                                    </label>
                                    <input className="form-control" type="password" placeholder="Enter password"  {...register("password")} />
                                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="mb-3 position-relative">
                                    <label className="form-label form-label" htmlFor="password">
                                        Confirm Password<span className="text-red-500">*</span>
                                    </label>
                                    <input className="form-control " type="password" placeholder="Enter password"  {...register("confirmPassword")} />
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
                <Card className="mt-4">
                    <CardHeader>
                        <h5 className="card-title">Status
                            <span className="text-red-500">*</span>
                        </h5>
                    </CardHeader>
                    <CardBody>
                        <Form.Select aria-label="Default select example" {...register("status")} >
                            <option value="activated">Activated</option>
                            <option value="locked">Locked</option>
                        </Form.Select>
                    </CardBody>
                </Card>
            </div>
            
        </form>
    );
}
