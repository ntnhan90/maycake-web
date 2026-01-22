"use client"
import { CreateDiscountBodyType, CreateDiscountBody } from "@/models/product/discountModel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader, Button } from "react-bootstrap";
import { useCreateDiscountMutation, useGetDiscountQuery, useUpdateDiscountMutation } from "@/queries/useDiscount";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
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
    } = useForm<CreateDiscountBodyType>({
        resolver: zodResolver(CreateDiscountBody),
        defaultValues: {
            title: "",
        
        },
    });

    let tagData = null;
    if(id){
        const tagId = Number(id);
         try {
            const { data, isLoading, error } = useGetDiscountQuery(tagId);
            tagData = data?.payload
        } catch (error) {
            return <div>Something went wrong</div>
        }
    }
    useEffect(() => {
        if (tagData) {
            reset({
                title: tagData.title ?? "",
               // status:tagData.status  ?? "published",
            })
        }
    }, [tagData, reset])

    const onSubmit = async(data: CreateDiscountBodyType) => {
        if(id){
            if(updateDiscountMutation.isPending) return
            try {
                let body: CreateDiscountBodyType & {id:number} ={
                    id: id as number,
                    ...data
                }
                const result = await updateDiscountMutation.mutateAsync(body)
                toast.success("update success");
                router.push("/admin/ecommerce/customers")
            } catch (error) {
                handleErrorApi({
                    error,
                    setError:setError
                })
            }
        }else{
            if(createDiscountMutation.isPending) return
            let body = data;
            const result = await createDiscountMutation.mutateAsync(body);

            toast.success("add success");
            router.push("/admin/ecommerce/discount")
        }
    }

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
