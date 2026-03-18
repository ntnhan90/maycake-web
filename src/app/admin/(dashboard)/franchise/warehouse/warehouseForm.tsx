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
        setError,
        reset
    } = useForm<CreateWarehouseBodyType>({
        resolver: zodResolver(CreateWarehouseBody),
        defaultValues: {
            name: "",
            country: "",
            location:  "",
            address:  "",
            status:"active",
        },
    });

    let warehouseData = null;
    if(id){
        const faqCateId = Number(id);
         try {
            const { data, isLoading, error } = useGetWarehouseQuery(faqCateId);
            warehouseData = data?.payload
        } catch (error) {
            return <div>Something went wrong</div>
        }
    }
    useEffect(() => {
        if (warehouseData) {
            reset({
                name: warehouseData.name ?? "",
                country: warehouseData.country ?? "",
                location: warehouseData.location ?? "",
                address: warehouseData.address ?? "",
                status:warehouseData.status  ?? "active",
            })
        }
    }, [warehouseData, reset])

    const onSubmit = async(data:CreateWarehouseBodyType) => {
        try {
            if (id) {
                if(updateWarehouseMutation.isPending) return
                let body: CreateWarehouseBodyType & {id:number} ={
                    id: id as number,
                    ...data
                }
                await updateWarehouseMutation.mutateAsync(body)
                toast.success("Update success");
            } else {
                if(createWarehouseMutation.isPending) return
                await createWarehouseMutation.mutateAsync(data);
                toast.success("Create success");
            }
        } catch (error) {
            handleErrorApi({
                error,
                setError:setError
            })
        }
        router.push("/admin/franchise/warehouse")
    }

     return(
        <form onSubmit={handleSubmit(onSubmit, (err) =>{
            console.log(err)
        })} className="row">
            <div className="col-md-9">
                <div className="mb-3 position-relative">
                    <label className="form-label form-label" htmlFor="first_name">
                        Warehouse Name <span className="text-red-500">*</span>
                    </label>
                    <input className="form-control " placeholder="Enter name"  {...register("name")} />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
                <div className="mb-3 position-relative">
                    <label className="form-label form-label" htmlFor="first_name">
                        Country Code <span className="text-red-500">*</span>
                    </label>
                    <Form.Select aria-label="Default select example"  {...register("country")}>
                        <option>Open this select menu</option>
                        <option value="germany">Germany</option>
                        <option value="france">France</option>
                        <option value="austria">Austria</option>
                        <option value="poland">Poland</option>
                    </Form.Select>
                </div>
                <div className="mb-3 position-relative">
                    <label className="form-label form-label" htmlFor="first_name">
                        Location <span className="text-red-500">*</span>
                    </label>
                    <input className="form-control " placeholder="Enter location"  {...register("location")} />
                </div>
                
                 <div className="mb-3 position-relative">
                    <label className="form-label form-label" htmlFor="first_name">
                        Address <span className="text-red-500">*</span>
                    </label>
                    <input className="form-control " placeholder="Enter address"  {...register("address")} />
                </div>
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
                            <option value="inactive">Inactive</option>
                        </Form.Select>
                    </CardBody>
                </Card>
            </div>
        </form>
    )
}