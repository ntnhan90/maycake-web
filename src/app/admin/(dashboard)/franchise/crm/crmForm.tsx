"use client"
import { CreateFranchiseBodyType, CreateFranchiseBody } from "@/models/franchise/crmModel";
import { useForm , Controller} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import { useCreateFranchiseMutation, useGetFranchiseQuery, useUpdateFranchiseMutation } from "@/queries/useFranchise";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { handleErrorApi } from "@/utils/lib";

type Props = {
    id? : number
}

export default function CrmForm({id}: Props){
    const router = useRouter()
    const createFranchiseMutation = useCreateFranchiseMutation();
    const updateFranchiseMutation = useUpdateFranchiseMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm<CreateFranchiseBodyType>({
        resolver: zodResolver(CreateFranchiseBody),
        defaultValues: {
            company_name: "",
            owner_name:"",
            tax_code:"",
            email: "",
            phone: "",
        },
    });

    let crmData = null;
    if(id){
        const crmId = Number(id);
         try {
            const { data, isLoading, error } = useGetFranchiseQuery(crmId);
            crmData = data?.payload
        } catch (error) {
            return <div>Something went wrong</div>
        }
    }
    useEffect(() => {
        if (crmData) {
            reset({
                company_name: crmData.company_name ?? "",
                owner_name: crmData.owner_name ?? "",
                tax_code: crmData.tax_code ?? "",
                email: crmData.email ?? "",
                phone:crmData.phone  ?? "",
            })
        }
    }, [crmData, reset])

    const onSubmit = async (data:CreateFranchiseBodyType) => {
        try {
            if(id){
                if(updateFranchiseMutation.isPending) return
                let body: CreateFranchiseBodyType & {id:number} ={
                    id: id as number,
                    ...data
                }
                await updateFranchiseMutation.mutateAsync(body)
                toast.success('Update order success');
            }else{
                if(createFranchiseMutation.isPending) return
                await createFranchiseMutation.mutateAsync(data)
                toast.success('Create order success');
            }
            router.push("/admin/franchise/crm")
        } catch (error) {
            handleErrorApi({
                error,
                setError,
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit,(err) =>{
            console.log(err)
        })} className="row">
            <div className="col-md-9">
                <div className="mb-3 position-relative">
                    <label className="form-label form-label" htmlFor="first_name">
                        Company Name <span className="text-red-500">*</span>
                    </label>
                    <input className="form-control " placeholder="Enter title"  {...register("company_name")} />
                    {errors.company_name && <p className="text-red-500">{errors.company_name.message}</p>}
                </div>

                <div className="mb-3 position-relative">
                    <label className="form-label form-label" htmlFor="first_name">
                        Owner Name <span className="text-red-500">*</span>
                    </label>
                    <input className="form-control " placeholder="Enter title"  {...register("owner_name")} />
                    {errors.owner_name && <p className="text-red-500">{errors.owner_name.message}</p>}
                </div>

                <div className="mb-3 position-relative">
                    <label className="form-label form-label" htmlFor="first_name">
                        Tax code <span className="text-red-500">*</span>
                    </label>
                    <input className="form-control " placeholder="Enter tax code"  {...register("tax_code")} />
                    {errors.tax_code && <p className="text-red-500">{errors.tax_code.message}</p>}
                </div>

                <div className="mb-3 position-relative">
                    <label className="form-label form-label" htmlFor="first_name">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input className="form-control " placeholder="Enter email"  {...register("email")} />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>

                <div className="mb-3 position-relative">
                    <label className="form-label form-label" htmlFor="first_name">
                        Phone <span className="text-red-500">*</span>
                    </label>
                    <input className="form-control " placeholder="Enter tax code"  {...register("phone")} />
                    {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
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
            </div>
        </form>
    )
}