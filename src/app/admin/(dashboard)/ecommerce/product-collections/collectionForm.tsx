"use client"
import {useForm,Controller } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { handleErrorApi } from "@/utils/lib";
import { CreateProCollectionBodyType, CreateProCollectionBody } from '@/models/product/collectionModel';
import { useCreateProductCollectionMutation, useGetProductCollectionQuery , useUpdateProductCollectionMutation } from '@/queries/useProductCollection';
import SlugInput from "@/components/input/slugInput";

type Props = {
    id?: number
}

export default function ColectionForm({id}:Props){
    const router = useRouter()
    const createProductCollectionMutation = useCreateProductCollectionMutation()
    const updateProductCollectionMutation = useUpdateProductCollectionMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
        setError
    } = useForm<CreateProCollectionBodyType>({
        resolver: zodResolver(CreateProCollectionBody),
        defaultValues: {
            name: "",
            slug: "",
            description:"",
            image:"",
            is_featured:0,
            status:"published",
        },
    });

    let collectionData = null;
    if(id){
        const collectionId= Number(id);
        try {
            const { data, isLoading, error } = useGetProductCollectionQuery(collectionId);
            collectionData = data?.payload
        } catch (error) {
            return <div>Something went wrong</div>
        }
    }

    useEffect(() => {
        if (collectionData) {
            reset({
                name: collectionData.name ?? "",
                slug: collectionData.slug ?? 0,
                description: collectionData.description ?? "",
                image: collectionData.image ?? "",
                is_featured: collectionData.is_featured ??  0,
                status:collectionData.status ?? "published",
            })
        }
    }, [collectionData, reset])

    const onSubmit = async(data:CreateProCollectionBodyType) =>{
        if(id){
            console.log("update" , data)
        }else{
            console.log("create" , data)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, (err) =>{
            console.log(err)
        })} className="row">
            <div className="col-md-9">
                <Card>
                    <CardBody>
                        <div className="form-body">
                            <SlugInput
                                register={register}
                                setValue={setValue}
                                watch={watch}
                                titleName="name"
                                slugName="slug"
                            />

                            <div className="mb-3 position-relative">
                                <label className="form-label form-label" >
                                    Description 
                                </label>
                                <textarea className="form-control " placeholder="Enter description"  {...register("description")} />
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