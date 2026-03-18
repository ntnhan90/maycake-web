"use client"
import { useState } from 'react'
import { CreateShopBody, CreateShopBodyType } from '@/models/franchise/shopModel';
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import { useCreateShopMutation, useGetShopQuery, useUpdateShopMutation } from '@/queries/useFranchiseShop';
import { useGetFranchiseListQuery } from '@/queries/useFranchise';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { handleErrorApi } from "@/utils/lib";

type Props ={
    id?: number
}

export default function ShopForm({id}: Props){
    const router = useRouter()
    const createShopMutation = useCreateShopMutation();
    const updateShopMutation = useUpdateShopMutation();

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
            franchise_id: 0,
        },
    });
    const { data: franchiseData } = useGetFranchiseListQuery()

    let crmData = null;
    if(id){
        const crmId = Number(id);
        try {
            const { data, isLoading, error } = useGetShopQuery(crmId);
            crmData = data?.payload
        } catch (error) {
            return <div>Something went wrong</div>
        }
    }
    useEffect(() => {
        if (crmData) {
            reset({
                name: crmData.name ?? "",
                address: crmData.address ?? "",
                city: crmData.city ?? "",
                postal_code: crmData.postal_code ?? "",
                status:crmData.status  ?? "",
                is_active:crmData.is_active ?? 1,
                franchise_id:crmData.franchise_id ?? 1,
            })
        }
    }, [crmData, reset])

    const onSubmit = async (data: CreateShopBodyType) => {
        try {
            if (id) {
                if(updateShopMutation.isPending) return
                let body: CreateShopBodyType & {id:number} ={
                    id: id as number,
                    ...data
                }
                console.log(body);

                await updateShopMutation.mutateAsync(body)
                toast.success('Update order success');

            } else {
                if(createShopMutation.isPending) return
                await createShopMutation.mutateAsync(data);
                toast.success('Create order success');
            }
           // router.push("/admin/franchise/shop")
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
                <div className="mb-3 position-relative">
                    <label className="form-label form-label" htmlFor="first_name">
                        Shop Name <span className="text-red-500">*</span>
                    </label> 
                    <input className="form-control " placeholder="Enter name"  {...register("name")} />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>

                <div className="mb-3 position-relative">
                    <label className="form-label form-label" htmlFor="first_name">
                        Franchise <span className="text-red-500">*</span>
                    </label> 
                    <Form.Select {...register("franchise_id", { valueAsNumber: true })}>
                        <option value="">Select franchise</option>
                        {franchiseData?.payload?.data?.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.company_name}
                            </option>
                        ))}
                    </Form.Select>
                    {errors.franchise_id && <p className="text-red-500">{errors.franchise_id.message}</p>}
                </div>

                <div className="mb-3 position-relative">
                    <label className="form-label form-label" htmlFor="first_name">
                        Address <span className="text-red-500">*</span>
                    </label> 
                    <input className="form-control " placeholder="Enter address"  {...register("address")} />
                    {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                </div>

                <div className="mb-3 position-relative">
                    <label className="form-label form-label" htmlFor="first_name">
                        City <span className="text-red-500">*</span>
                    </label> 
                    <input className="form-control " placeholder="Enter city"  {...register("city")} />
                    {errors.city && <p className="text-red-500">{errors.city.message}</p>}
                </div>

                <div className="mb-3 position-relative">
                    <label className="form-label form-label" htmlFor="first_name">
                        Postal code <span className="text-red-500">*</span>
                    </label> 
                    <input className="form-control " placeholder="Enter city"  {...register("postal_code")} />
                    {errors.postal_code && <p className="text-red-500">{errors.postal_code.message}</p>}
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
                            <option value="close">Close</option>
                            <option value="pending">Pending</option>
                        </Form.Select>
                    </CardBody>
                </Card>
            </div>
        </form>
    )
}