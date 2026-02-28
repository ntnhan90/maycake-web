"use client"
import { useState } from 'react'
import { CreateShopBody, CreateShopBodyType } from '@/models/franchise/shopModel';
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import { useCreateShopMutation, useGetShopQuery, useUpdateShopMutation } from '@/queries/useFranchiseShop';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { handleErrorApi } from "@/utils/lib";
import { Trash } from 'react-bootstrap-icons'

type Props ={
    id?: number
}

export default function ShopForm({id}: Props){
    const router = useRouter()


    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
        watch,
        setValue,
        setError
    } = useForm<CreateShopBodyType>({
        resolver: zodResolver(CreateShopBody),
        defaultValues: {
            name: "",
            address: "",
            city: "",
            postal_code:"",
            is_active:1,
            status:"active",
           
        },
    });

    const onSubmit = async (data: CreateShopBodyType) => {
        try {
            if (id) {
                 toast.success('Update order success');

            } else {
                 toast.success('Create order success');

            }
            //router.push("/admin/ecommerce/orders")
        } catch (error) {
            handleErrorApi({
                error,
                setError,
            });
        }
    };

    return(
        <form onSubmit={handleSubmit(onSubmit, (err) =>{
            console.log(err)
        })} className="row">
            <div className="col-md-9">
                <Card>
                    <CardBody>
                        <div className="mb-3 position-relative">
                            <label className="form-label form-label" htmlFor="first_name">
                                Name <span className="text-red-500">*</span>
                            </label> 
                            <input className="form-control " placeholder="Enter name"  {...register("name")} />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        </div>
                    </CardBody>
                </Card>
                
            </div>
            <div className="col-md-3">
                <Card >
                    <CardHeader>
                        <h5 className="card-title">Puslish</h5>
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
                            <option value="active">Active</option>
                            <option value="close">Close</option>
                            <option value="pending">Pending</option>
                        </Form.Select>
                    </CardBody>
                </Card>
            </div>
        </form>
    )
}