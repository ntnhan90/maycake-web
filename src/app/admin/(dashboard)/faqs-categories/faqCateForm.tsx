"use client"
import { CreateFaqCateBodyType, CreateFaqCateBody } from "@/models/faqModel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import { useCreateFaqCateMutation, useGetFaqCateQuery, useUpdateFaqCateMutation } from "@/queries/useFaqCate";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { handleErrorApi } from "@/utils/lib";

type Props = {
    id? : number
}

export default function FaqCateForm({id}: Props){
    const router = useRouter()
    const createFaqCateMutation = useCreateFaqCateMutation();
    const updateFaqCateMutation = useUpdateFaqCateMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
        setError
    } = useForm<CreateFaqCateBodyType>({
        resolver: zodResolver(CreateFaqCateBody),
        defaultValues: {
            name: "",
            order: 0,
            description: "",
            status:"published",
        },
    });

    let faqCateData = null;
    if(id){
        const faqCateId = Number(id);
         try {
            const { data, isLoading, error } = useGetFaqCateQuery(faqCateId);
            faqCateData = data?.payload
        } catch (error) {
            return <div>Something went wrong</div>
        }
    }
    useEffect(() => {
        if (faqCateData) {
            reset({
                name: faqCateData.name ?? "",
                order: faqCateData.order ?? 0,
                description: faqCateData.description ?? "",
                status:faqCateData.status  ?? "published",
            })
        }
    }, [faqCateData, reset])


    const onSubmit = async(data: CreateFaqCateBodyType) => {
        if(id){
            //console.log("update : " , data)
            if(updateFaqCateMutation.isPending) return
            try {
                let body: CreateFaqCateBodyType & {id:number} ={
                    id: id as number,
                    ...data
                }
                const result = await updateFaqCateMutation.mutateAsync(body)
                toast.success("update success");
                router.push("/admin/faqs-categories")
            } catch (error) {
                handleErrorApi({
                    error,
                    setError:setError
                })
            }
        }else{
            if(createFaqCateMutation.isPending) return
            let body = {
                ...data,
                order: 0
            };
            const result = await createFaqCateMutation.mutateAsync(body);
            toast.success("add success");
            router.push("/admin/faqs-categories")
            //console.log("create : " , data)
        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit,(err) =>{
            console.log(err)
        })} className="row">
            <div className="col-md-9">
                <div className="mb-3 position-relative">
                    <label className="form-label form-label" htmlFor="first_name">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input className="form-control " placeholder="Enter title"  {...register("name")} />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
                <div className="mb-3 position-relative">
                    <label className="form-label form-label" >
                        Description 
                    </label>
                    <textarea className="form-control " placeholder="Enter description"  {...register("description")} />
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