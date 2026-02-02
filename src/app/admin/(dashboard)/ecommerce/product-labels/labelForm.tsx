"use client"
import {useForm,Controller } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { handleErrorApi } from "@/utils/lib";
import { CreateProLabelBodyType, CreateProLabelBody } from "@/models/product/labelsModel"
import { useCreateProductLabelMutation, useGetProductLabelQuery, useUpdateProductLabelMutation } from "@/queries/useProductLabel";

type Props ={
    id?: number
}

type FormValues = {
  color: string;
};

export default function LabelForm({id}:Props){
    const router = useRouter()
    const createLabelMutation = useCreateProductLabelMutation();
    const updateLabelMutaion = useUpdateProductLabelMutation();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
        watch,
        setValue,
        setError
    } = useForm<CreateProLabelBodyType>({
        resolver: zodResolver(CreateProLabelBody),
        defaultValues: {
            name:"",
            color:"#0d6efd",
            status:"published",
        },
    });
    const color = watch("color");
    let labelData = null;
    if(id){
        const labelId = Number(id);
        try {
            const { data, isLoading, error } = useGetProductLabelQuery(labelId)
            labelData = data?.payload
        } catch (error) {
            return <div>Something went wrong</div>
        }
    }

    useEffect(() => {
        if (labelData) {
            reset({
                name: labelData.name ?? "",
                color: labelData.color ?? 0,
                status:labelData.status ?? "",
            })
        }
    }, [labelData, reset])

    const onSubmit = async(data:CreateProLabelBodyType) => {
        if(id){
            if(updateLabelMutaion.isPending) return;
            try {
                let body: CreateProLabelBodyType & {id:number} ={
                    id: id as number,
                    ...data
                }
                const result = await updateLabelMutaion.mutateAsync(body)
                toast.success("update success");
                router.push("/admin/ecommerce/product-labels")
            } catch (error) {
                handleErrorApi({
                    error,
                    setError:setError
                })
            }
        }else{
            if(createLabelMutation.isPending) return;
            let body = data;
            const result = await createLabelMutation.mutateAsync(body);
            toast.success("add success");
            router.push("/admin/ecommerce/product-labels")
        }
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

                            <Controller
                                name="color"
                                control={control}
                                rules={{
                                    required: "Vui lòng chọn màu",
                                }}
                                render={({ field }) => (
                                    <div className="d-flex align-items-center gap-3">
                                    <input
                                        type="color"
                                        className="form-control form-control-color"
                                        {...field}
                                    />

                                    <div
                                        className="border rounded"
                                        style={{
                                        width: 36,
                                        height: 36,
                                        backgroundColor: field.value,
                                        }}
                                    />

                                    <span className="fw-semibold">{field.value}</span>
                                    </div>
                                )}
                            />
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