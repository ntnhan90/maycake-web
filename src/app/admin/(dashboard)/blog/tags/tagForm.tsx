"use client"
import { CreateProTagBodyType, CreateProTagBody } from "@/models/product/tagModel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import { useCreateProductTagMutation, useGetProductTagQuery, useUpdateProductTagMutation } from "@/queries/useProductTag";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { handleErrorApi } from "@/utils/lib";
import SlugInput from "@/components/input/slugInput";
type Props = {
    id? : number
}

export default function BlogTagForm({id}: Props){
    const router = useRouter()
    const createTagMutation = useCreateProductTagMutation();
    const updateTagMutation = useUpdateProductTagMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
        setError
    } = useForm<CreateProTagBodyType>({
        resolver: zodResolver(CreateProTagBody),
        defaultValues: {
            name: "",
            slug: "",
            description: "",
            status:"published",
        },
    });

    let tagData = null;
    if(id){
        const tagId = Number(id);
         try {
            const { data, isLoading, error } = useGetProductTagQuery(tagId);
            tagData = data?.payload
        } catch (error) {
            return <div>Something went wrong</div>
        }
    }
    useEffect(() => {
        if (tagData) {
            reset({
                name: tagData.name ?? "",
                description: tagData.description ?? "",
                status:tagData.status  ?? "published",
            })
        }
    }, [tagData, reset])

    const onSubmit = async(data: CreateProTagBodyType) => {
        if(id){
            if(updateTagMutation.isPending) return
            try {
                let body: CreateProTagBodyType & {id:number} ={
                    id: id as number,
                    ...data
                }
                const result = await updateTagMutation.mutateAsync(body)
                toast.success("update success");
                router.push("/admin/ecommerce/product-tags")
            } catch (error) {
                handleErrorApi({
                    error,
                    setError:setError
                })
            }
        }else{
            if(createTagMutation.isPending) return
            let body = data;
            const result = await createTagMutation.mutateAsync(body);

            toast.success("add success");
            router.push("/admin/ecommerce/product-tags")
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