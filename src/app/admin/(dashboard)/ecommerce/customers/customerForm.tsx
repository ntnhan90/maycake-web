"use client"
import { CreateCustomerBodyType, CreateCustomerBody } from "@/models/product/customerModel";
import { useForm , Controller} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import { useCreateCustomerMutation, useGetCustomerQuery, useUpdateCustomerMutation } from "@/queries/useCustomer";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { handleErrorApi } from "@/utils/lib";

type Props = {
    id? : number
}

export default function CustomerForm({id}: Props){
    const router = useRouter()
    const createCustomerMutation = useCreateCustomerMutation();
    const updateCustomerMutation = useUpdateCustomerMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
        setError,
        control
    } = useForm<CreateCustomerBodyType>({
        resolver: zodResolver(CreateCustomerBody),
        defaultValues: {
            name: "",
        
        },
    });

    let tagData = null;
    if(id){
        const tagId = Number(id);
         try {
            const { data, isLoading, error } = useGetCustomerQuery(tagId);
            tagData = data?.payload
        } catch (error) {
            return <div>Something went wrong</div>
        }
    }
    useEffect(() => {
        if (tagData) {
            reset({
                name: tagData.name ?? "",
                status:tagData.status  ?? "published",
            })
        }
    }, [tagData, reset])

    const onSubmit = async(data: CreateCustomerBodyType) => {
        if(id){
            if(updateCustomerMutation.isPending) return
            try {
                let body: CreateCustomerBodyType & {id:number} ={
                    id: id as number,
                    ...data
                }
                const result = await updateCustomerMutation.mutateAsync(body)
                toast.success("update success");
                router.push("/admin/ecommerce/customers")
            } catch (error) {
                handleErrorApi({
                    error,
                    setError:setError
                })
            }
        }else{
            if(createCustomerMutation.isPending) return
            let body = data;
            const result = await createCustomerMutation.mutateAsync(body);

            toast.success("add success");
            router.push("/admin/ecommerce/customers")
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
                <Card className="mt-4">
                    <CardHeader>
                        <h5 className="card-title">Status
                            <span className="text-red-500">*</span>
                        </h5>
                    </CardHeader>
                    <CardBody>
                        <Form.Select aria-label="Default select example" {...register("status")} >
                            <option value="activated">Activated</option>
                            <option value="locked">Locked</option>
                        </Form.Select>
                    </CardBody>
                </Card>
            </div>
        </form>
    )
}
