"use client"

import {
    CreateDiscountFormSchema,
    CreateDiscountFormType,
    CreateDiscountApiSchema,
    CreateDiscountBodyType,
 } from "@/models/product/discountModel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader, Button } from "react-bootstrap";
import { useCreateDiscountMutation, useGetDiscountQuery, useUpdateDiscountMutation } from "@/queries/useDiscount";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect , useState} from "react";
import { handleErrorApi } from "@/utils/lib";

type Props = {
    id? : number
}

export default function DiscountForm({id}: Props){
    const router = useRouter()
    const createDiscountMutation = useCreateDiscountMutation();
    const updateDiscountMutation = useUpdateDiscountMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
        setError,
        control
    } = useForm<CreateDiscountFormType>({
        resolver: zodResolver(CreateDiscountFormSchema),
        defaultValues: {
            code: "",
            start_date: "",
            end_date: ""
        },
    });

    const discountId = id ? Number(id) : 0;
    const discountQuery = useGetDiscountQuery(discountId);
    const discountData = id ? discountQuery.data?.payload : null;

    useEffect(() => {
        if (!discountData) return;

        reset({
            code: discountData.code ?? "",
        });
    }, [discountData, reset]);


    //Form → string → parse → Date → mutation
    const onSubmit = async (formData: CreateDiscountFormType) => {
        try {
            const apiData = CreateDiscountApiSchema.parse(formData);

            if (id) {
                await updateDiscountMutation.mutateAsync({
                    id,
                    ...apiData,
                });
                toast.success("Update success");
            } else {
                await createDiscountMutation.mutateAsync(apiData);
                toast.success("Create success");
            }

            router.push("/admin/ecommerce/discount");
        } catch (error) {
            handleErrorApi({ error, setError });
        }
    };

    return(
        <form onSubmit={handleSubmit(onSubmit,(err) =>{
            console.log(err)
        })} className="row">
            <div className="col-md-9">
                <Card>
                    <CardBody>
                        <div className="form-body">
                           
                           
                        
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="col-md-3">
                <Card >
                    <CardHeader>
                        <h5 className="card-title">Time</h5>
                    </CardHeader>
                    <CardBody>
                        <div>
                            <label>Start Time</label>
                            <input
                                type="datetime-local"
                                {...register('start_date')}
                                className="input"
                            />
                            {errors.start_date && <p className="error">{errors.start_date.message}</p>}
                        </div>
                    </CardBody>
                </Card>
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
               
            </div>
        </form>
    )
}
