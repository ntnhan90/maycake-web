"use client"
import { useState } from 'react'
import { CreateWarehouseBody, CreateWarehouseBodyType } from '@/models/franchise/warehouseModel';
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import { useCreateWarehouseMutation, useGetWarehouseQuery, useUpdateWarehouseMutation } from '@/queries/useWarehouse';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { handleErrorApi } from "@/utils/lib";

type Props ={
    id?: number
}


export default function WarehouseForm({id}: Props){
    const router = useRouter()
    const createWarehouseMutation = useCreateWarehouseMutation();
    const updateWarehouseMutation = useUpdateWarehouseMutation();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
        watch,
        setValue,
        setError
    } = useForm<CreateWarehouseBodyType>({
        resolver: zodResolver(CreateWarehouseBody),
        defaultValues: {
            name: "",
            status:"published",
        },
    });


    const onSubmit = async(data:CreateWarehouseBodyType) => {
        try {
            let body = data;
            if (id) {
                console.log(body)
                /*
                await updateAttributeMutation.mutateAsync({
                    id,
                    ...body,
                });
                */
                toast.success("Update success");
            } else {
                console.log(body)
                /*
                await createAttributeMutation.mutateAsync(body);
                */
                toast.success("Create success");
            }
        } catch (error) {
            handleErrorApi({
                error,
                setError:setError
            })
        }
        router.push("/admin/franchise/warehouses")
    }

     return(
        <form onSubmit={handleSubmit(onSubmit, (err) =>{
            console.log(err)
        })} className="row">
            <div className="col-md-9">
                <Card>
                    <CardBody>
                        <div className="form-body">
                            <div className="mb-3 position-relative">
                                <label className="form-label form-label" htmlFor="first_name">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input className="form-control " placeholder="Enter name"  {...register("name")} />
                                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                            </div>

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
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                            <option value="pending">Pending</option>
                        </Form.Select>
                    </CardBody>
                </Card>
            </div>
        </form>
    )
}