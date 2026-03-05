"use client"
import {useForm,Controller } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { handleErrorApi } from "@/utils/lib";
import { CreateSupplyOrderBodyType, CreateSupplyOrderBody } from '@/models/franchise/supplyOrderModel';
import { useCreateSupplyOrderMutation, useGetSupplyOrderQuery, useUpdateSupplyOrderMutation } from '@/queries/useSupplyOrder';
type Props ={
    id?: number
}

export default function SupplyOrderForm({id}:Props){
    const router = useRouter()
    const createSupplyOrderMutation = useCreateSupplyOrderMutation();
    const updateSupplyOrderMutaion = useUpdateSupplyOrderMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<CreateSupplyOrderBodyType>({
        resolver: zodResolver(CreateSupplyOrderBody),
        defaultValues: {
            shop_id:"",
            order_date: "",
            total_cost: "",
            status:"published",
        },
    });


    const onSubmit = async(data:CreateSupplyOrderBodyType) => {
        try {
            let body = data;
            if (id) {
                if(updateSupplyOrderMutaion.isPending) return;
                let body: CreateSupplyOrderBodyType & {id:number} ={
                    id: id as number,
                    ...data
                }
               // const result = await updateSupplyOrderMutaion.mutateAsync(body)
                toast.success("Update success");
            } else {
                if(createSupplyOrderMutation.isPending ) return
                console.log(body)
              //  await createSupplyOrderMutation.mutateAsync(body);
                toast.success("Create success");
            }
            // router.push("/admin/franchise/supply-order")
        } catch (error) {
            handleErrorApi({
                error,
                setError:setError
            })
        }
       
       
    }

    return(
        <form onSubmit={handleSubmit(onSubmit, (err) =>{
                console.log(err)
            })} className="row">
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