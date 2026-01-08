"use client"
import { CreateFaqsBodyType, CreateFaqsBody } from "@/models/faqModel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import { useCreateFaqsMutation, useGetFaqsQuery, useUpdateFaqsMutation } from "@/queries/useFaqs";
import { useGetFaqCateListQuery } from "@/queries/useFaqCate";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { handleErrorApi } from "@/utils/lib";


type Props = {
    id? : number
}

export default function FaqsForm({id}: Props){
    const router = useRouter()
    const createFaqsMutation = useCreateFaqsMutation();
    const updateFaqsMutation = useUpdateFaqsMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
        setError
    } = useForm<CreateFaqsBodyType>({
        resolver: zodResolver(CreateFaqsBody),
        defaultValues: {
            question: "",
            answer: "",
            category_id:1,
            status:"published",
        },
    });


    let faqsData = null;
    if(id){
        const faqCateId = Number(id);
         try {
            const { data, isLoading, error } = useGetFaqsQuery(faqCateId);
            faqsData = data?.payload
        } catch (error) {
            return <div>Something went wrong</div>
        }
    }
    useEffect(() => {
        if (faqsData) {
            reset({
                category_id: faqsData.category_id ?? "",
                question: faqsData.question ?? "",
                answer: faqsData.answer ?? "",
                status:faqsData.status  ?? "published",
            })
        }
    }, [faqsData, reset])

    const onSubmit = async(data: CreateFaqsBodyType) => {
        if(id){
            console.log("update : " , data)
            if(updateFaqsMutation.isPending) return
            try {
                let body: CreateFaqsBodyType & {id:number} ={
                    id: id as number,
                    ...data
                }
                const result = await updateFaqsMutation.mutateAsync(body)
                toast.success("update success");
                router.push("/admin/faqs")
            } catch (error) {
                handleErrorApi({
                    error,
                    setError:setError
                })
            }
        }else{
            if(createFaqsMutation.isPending) true
            let body = data;
            const result = await createFaqsMutation.mutateAsync(body);
            toast.success("add success");
            router.push("/admin/faqs")
            console.log("create : " , data)
        }
    }

    const faqCateListQuery = useGetFaqCateListQuery();
    const cateList = faqCateListQuery.data?.payload.data ?? [];

    return(
        <form onSubmit={handleSubmit(onSubmit,(err) =>{
            console.log(err)
        })} className="row">
            <div className="col-md-9">
                <div className="mb-3 position-relative">
                    <label className="form-label form-label" >
                        Category 
                    </label>
                    <Form.Select aria-label="Default select example" 
                        {...register('category_id', {
                            valueAsNumber: true  
                        })}
                    >
                        <option>Select a category</option>
                        {cateList.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </Form.Select>
                </div>
                <div className="mb-3 position-relative">
                    <label className="form-label form-label" >
                        Question 
                    </label>
                    <textarea className="form-control " placeholder="Enter description"  {...register("question")} />
                    {errors.question && <p className="text-red-500">{errors.question.message}</p>}
                </div>

                <div className="mb-3 position-relative">
                    <label className="form-label form-label" >
                        Answer 
                    </label>
                    <textarea className="form-control " placeholder="Enter description"  {...register("answer")} />
                    {errors.answer && <p className="text-red-500">{errors.answer.message}</p>}
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