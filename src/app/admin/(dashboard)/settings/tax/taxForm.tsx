"use client"
import { CreateTaxBodyType, CreateTaxBody } from "@/models/taxModel"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import { useCreateTaxMutation, useGetTaxQuery, useUpdateTaxMutation } from "@/queries/useTax";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { handleErrorApi } from "@/utils/lib";
//import Feedback from 'react-bootstrap/Feedback'
type Props ={
    id?: number
}

export default function TaxForm({id}:Props){
    const router = useRouter()
    const createTaxMutation = useCreateTaxMutation();
    const updateTaxMutation = useUpdateTaxMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
        setError
    } = useForm<CreateTaxBodyType>({
        resolver: zodResolver(CreateTaxBody),
        defaultValues: {
            title:"",
            percentage:0,
            status:"published",
        },
    });
    
    let taxData = null;
    if(id){
        const taxId= Number(id);
        try {
            const { data, isLoading, error } = useGetTaxQuery(taxId);
            taxData = data?.payload
        } catch (error) {
            return <div>Something went wrong</div>
        }
    }

    useEffect(() => {
        if (taxData) {
            reset({
                title: taxData.title ?? "",
                percentage: taxData.percentage ?? 0,
                status:taxData.status ?? "",
            })
        }
    }, [taxData, reset])

    const onSubmit = async(data:CreateTaxBodyType) => {
        if(id){
            if(updateTaxMutation.isPending) return
            try {
                let body: CreateTaxBodyType & {id:number} ={
                    id: id as number,
                    ...data
                }
                const result = await updateTaxMutation.mutateAsync(body)
                toast.success("update success");
                router.push("/admin/settings/tax")
            } catch (error) {
                handleErrorApi({
                    error,
                    setError:setError
                })
            }
        }else{
            if(createTaxMutation.isPending) return
            let body = data;
            const result = await createTaxMutation.mutateAsync(body)

            reset({
                title:  "",
                percentage: 0,
            })
            toast.success("add success");
            router.push("/admin/settings/tax")
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
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input className="form-control " placeholder="Enter title"  {...register("title")} />
                                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                            </div>

                            <div className="mb-3 position-relative">
                                <label className="form-label form-label" htmlFor="percentage">
                                    Percentage <span className="text-red-500">*</span>
                                </label>
                                <input className="form-control"  type="number" placeholder="Enter percentage"  
                                    {...register("percentage",{
                                        valueAsNumber:true,
                                    })} />
                                {errors.percentage && <p className="text-red-500">{errors.percentage.message}</p>}
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