"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetAccount} from "@/queries/useAccount"
import { Card, CardBody , CardHeader, Button, Form} from "react-bootstrap";
import {  UpdateAccountBody ,UpdateAccountBodyType} from "@/models/accountModel";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
export default function UserEditForm({id}:{id?:number}) {
    let userData = null;
    const [show, setShow] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [showConPassword, setShowConPassword] = useState(false);   
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordVisibility1 = () => {
        setShowConPassword(!showConPassword);
    };

    if(id){
        const userId = Number(id)
        try {
            const { data, isLoading, error } = useGetAccount(userId);
            userData = data?.payload
        } catch (error) {
            return <div>Something went wrong</div>
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<UpdateAccountBodyType>({
        resolver: zodResolver(UpdateAccountBody),
        defaultValues: {
            username: "",
            email: "",
            password: undefined,
            confirmPassword: undefined,
            first_name: "",
            last_name: "",
        },
    });

    useEffect(() => {
        if (userData) {
            reset({
                username: userData.username ?? "",
                email: userData.email ?? "",
                first_name: userData.first_name ?? "",
                last_name:userData.last_name ?? "",
                password: "",           // không fill password
                confirmPassword: "",
            })
        }
    }, [userData, reset])

    const onSubmit = async (data: UpdateAccountBodyType) => {
        console.log("Edit" , data)
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
                                <input className="form-control " placeholder="Enter email"  {...register("email")}  disabled/>
                            </div>

                            <div className="mb-3 position-relative">
                                <label className="form-label form-label" htmlFor="phone">
                                    Phone <span className="text-red-500">*</span>
                                </label>
                                <input className="form-control " placeholder="Enter phone"  name="phone"/>
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
            </div>
        </form>
    );
}
