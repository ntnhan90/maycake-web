"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateCustomerMutation ,useGetCustomerQuery} from "@/queries/useCustomer";
import { useRouter } from "next/navigation";
import { Card, CardBody , CardHeader, Button, Form} from "react-bootstrap";
import { UpdateCustomerBody, UpdateCustomerBodyType } from "@/models/product/customerModel";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { toDatetimeLocal } from "@/utils/lib";
import { toast } from "react-toastify";
import { handleErrorApi } from "@/utils/lib";
export type UpdateCustomerPayload = {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  status?: string;
  dob?: Date | null;
  password?: string;
};

export default function EditCustomerForm({id}:{id?:number}) {
    const [show, setShow] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [showConPassword, setShowConPassword] = useState(false);   
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordVisibility1 = () => {
        setShowConPassword(!showConPassword);
    };

    const router = useRouter()
    const updateCustomerMutation = useUpdateCustomerMutation()

    const customerId = id ? Number(id) : 0;
    const customerQuery = useGetCustomerQuery(customerId);
    const customerData = id ? customerQuery.data?.payload : null;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,setError
    } = useForm<UpdateCustomerBodyType>({
        resolver: zodResolver(UpdateCustomerBody),
        defaultValues: {
            name: "",
            email: "",
            password: undefined,
            confirmPassword: undefined,
            phone: "",
            dob: undefined,
            status:""
        },
    });


    useEffect(() => {
        if (!customerData) return;

        reset({
            name: customerData.name ?? '',
            email: customerData.email ?? '',
            phone: customerData.phone ?? '',
            dob: customerData.dob
            ? toDatetimeLocal(new Date(customerData.dob))
            : undefined,
            status: customerData.status ?? ""
        });
    }, [customerData, reset]);

    const onSubmit = async (data: UpdateCustomerBodyType) => {
    if (!id) return;
    if (updateCustomerMutation.isPending) return;

    try {
        const payload: UpdateCustomerPayload = {
        id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        status: data.status,
        dob: data.dob ? new Date(data.dob) : null,
        ...(data.password ? { password: data.password } : {}),
        };

        await updateCustomerMutation.mutateAsync(payload);

        toast.success("Update customer successfully 🎉");

        reset({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        });

        router.push("/admin/ecommerce/customers");
    } catch (error) {
        console.error(error);

        toast.error("Update failed ❌");

        handleErrorApi({
            error,
            setError,
        });
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
                                    Name<span className="text-red-500">*</span>
                                </label>
                                <input className="form-control " placeholder="Enter last name"  {...register("name")} />
                                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                            </div>


                            <div className="mb-3 position-relative">
                                <label className="form-label form-label" htmlFor="email">
                                    Email<span className="text-red-500">*</span>
                                </label>
                                <input className="form-control " placeholder="Enter email"  {...register("email")}  disabled/>
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
                                <label className="form-label form-label" htmlFor="dob">
                                    Date of birth <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    {...register('dob')}
                                    className="form-control "
                                />
                            </div>

                            <div className="col-lg-12">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                    className=""
                                    type="checkbox"
                                    checked={show}
                                    onChange={(e) => setShow(e.target.checked)}
                                    />
                                    <span>Change Password? </span>
                                </label>
                            </div>
                            
                            {show && (
                                <>
                                <div className="col-lg-12">
                                    <div className="mb-3 position-relative">
                                        <label className="form-label form-label" htmlFor="password">
                                            Password<span className="text-red-500">*</span>
                                        </label>
                                        <div className="input-icon">
                                            <input 
                                                type={showPassword ? 'text' : 'password'}
                                                className="form-control" placeholder="Enter password"  
                                                {...register("password")} 
                                            />
                                            <span className="input-icon-addon ">
                                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} 
                                                    onClick={togglePasswordVisibility}
                                                />
                                            </span>
                                        </div>
                                        
                                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3 position-relative">
                                        <label className="form-label form-label" htmlFor="password">
                                            Confirm Password<span className="text-red-500">*</span>
                                        </label>
                                        <div className="input-icon">
                                            <input 
                                                type={showConPassword ? 'text' : 'password'}
                                                className="form-control " placeholder="Enter password" 
                                                {...register("confirmPassword")}
                                            />

                                            <span className="input-icon-addon ">
                                                <FontAwesomeIcon icon={showConPassword ? faEye : faEyeSlash} 
                                                    onClick={togglePasswordVisibility1}
                                                />
                                            </span>
                                        </div>
                                        
                                        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                                    </div>
                                </div>
                                </>
                            )}
                            
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
