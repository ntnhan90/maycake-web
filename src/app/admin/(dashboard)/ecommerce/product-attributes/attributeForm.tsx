"use client"
import { useState } from 'react'
import { CreateAttributeSetBody, CreateAttributeSetBodyType } from "@/models/product/attributeModel";
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import { useCreateProductAttributeMutation, useGetProductAttributeQuery, useUpdateProductAttributeMutation } from '@/queries/useProductAttribute';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { handleErrorApi } from "@/utils/lib";
import { Trash } from 'react-bootstrap-icons'
import { AttributeType } from "@/types/attribute";
import SlugInput from '@/components/input/slugInput';

type Props ={
    id?: number
}

export default function ProAttributeForm({id}: Props){
    const router = useRouter()
    const createAttributeMutation = useCreateProductAttributeMutation();
    const updateAttributeMutation = useUpdateProductAttributeMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
        watch,
        setValue,
        setError
    } = useForm<CreateAttributeSetBodyType>({
        resolver: zodResolver(CreateAttributeSetBody),
        defaultValues: {
            name: "",
            status:"published",
            attributes: [
                {   
                    title: '',
                    color: '#333333',
                    image: null,
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'attributes',
    })

    const attributeId = id ? Number(id) : 0;
    const attributeQuery = useGetProductAttributeQuery(attributeId);
    const attributeData = id ? attributeQuery.data?.payload : null;

    useEffect(() => {
        if (!attributeData) return;

        reset({
            name: attributeData.name ?? "",
            status: attributeData.status?? "",
            attributes: attributeData.attributes
                .map(attr => ({
                    title: attr.title,
                    color: attr.color ?? "#000000",
                    image: attr.image ?? null,
                })),
        });
    }, [attributeData, reset]);

    const onSubmit = async(data:CreateAttributeSetBodyType) => {
        try {
            let body = data;
            // const apiData = CreateDiscountApiSchema.parse(formData);
            if (id) {
                await updateAttributeMutation.mutateAsync({
                    id,
                    ...body,
                });
                toast.success("Update success");
            } else {
                await createAttributeMutation.mutateAsync(body);
                toast.success("Create success");
            }
        } catch (error) {
            handleErrorApi({
                error,
                setError:setError
            })
        }
        router.push("/admin/ecommerce/product-attributes")
    }

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
                <Card className='mt-3'>
                    <CardHeader className='d-flex justify-content-between'>
                        <strong>Attributes list</strong>
                        <Button size="sm"  type="button" onClick={() =>
                            append({
                                title: '',
                                color: '#333333',
                                image: null,
                            })
                        }>
                            Add new attribute
                        </Button>
                    </CardHeader>
                    
                    <div className="table-responsive">
                        <table className="table align-middle mb-0">
                            <thead className="table-light">
                                <tr> 
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Color</th>
                                    <th>Image</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {fields.map((field, index) => {
                                const image = watch(
                                    `attributes.${index}.image`
                                )
                                return(
                                    <tr key={field.id}>
                                        <td>{index + 1}</td>
                                       
                                        <td>
                                            <Form.Control
                                                {...register(
                                                `attributes.${index}.title`
                                                )}
                                                isInvalid={
                                                !!errors.attributes?.[index]?.title
                                                }
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {
                                                errors.attributes?.[index]?.title
                                                    ?.message
                                                }
                                            </Form.Control.Feedback>
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="color"
                                                {...register(
                                                `attributes.${index}.color`
                                                )}
                                                style={{ width: 60, height: 38 }}
                                            />
                                           
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center gap-2">
                                                {image ? (
                                                <img
                                                    src={image}
                                                    width={40}
                                                    height={40}
                                                    className="border rounded"
                                                />
                                                ) : (
                                                <div
                                                    className="border rounded d-flex align-items-center justify-content-center"
                                                    style={{
                                                    width: 40,
                                                    height: 40,
                                                    }}
                                                >
                                                    ✕
                                                </div>
                                                )}

                                                <Button
                                                variant="link"
                                                size="sm"
                                                onClick={() => {
                                                    const url = prompt(
                                                    'Enter image URL'
                                                    )
                                                    if (url)
                                                    setValue(
                                                        `attributes.${index}.image`,
                                                        url
                                                    )
                                                }}
                                                >
                                                Add from URL
                                                </Button>
                                            </div>
                                        </td>
                                        <td>
                                            <Button
                                                variant="link"
                                                className="text-danger"
                                                onClick={() => remove(index)}
                                            >
                                                <Trash />
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
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