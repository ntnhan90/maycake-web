"use client"
import { useForm ,Controller} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { handleErrorApi } from "@/utils/lib";
import { CreateProductBodyType, CreateProductBody } from "@/models/product/productModel";
import { useCreateProductMutation, useGetProductQuery, useUpdateProductMutation } from "@/queries/useProduct";
import SlugInput from "@/components/input/slugInput";
import FeatureToggle from "@/components/input/FeatureToggle";
import ImageUploadBox from "@/components/Image/ImageUploadBox";
import TagInput from "@/components/input/tagInput";
import CategorySelect from "@/components/input/categorySelect";
import LabelSelect from "@/components/input/labelSelect";

type Props ={
    id?: number
}

export default function ProductForm({id}:Props){
    const router = useRouter()
    const createProductMutation = useCreateProductMutation();
    const updateProductMutation = useUpdateProductMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        watch,
        setValue,
        setError
    } = useForm<CreateProductBodyType>({
        resolver: zodResolver(CreateProductBody),
        defaultValues: {
            name:"",
            status:"published",
            is_featured: 0,
            price: 0,
            sale_price: 0,
            views: 0,
            tags: [],
            categories: [],
        },
    });

    let productData = null;
    if(id){
        const postId = Number(id);
        try {
            const { data, isLoading, error } = useGetProductQuery(postId);
            productData = data?.payload
        } catch (error) {
            return <div>Something went wrong</div>
        }
    }

    useEffect(() => {
        if (productData) {
            reset({
                name: productData.name ?? "",
                description: productData.description ?? "",
                content: productData.content ??"",
                is_featured: productData.is_featured ?? 0,
                status:productData.status  ?? "published",
                price: productData.price  ??0,
                sale_price: productData.sale_price  ??0,
               // views:productData.views  ?? 0,
                tags: productData.tags?.map((t: any) => t.name) ?? [],
                categories: productData.categories?.map((t: any) => t.id) ?? [],
            })
        }
    }, [productData, reset])

    const onSubmit = async(data: CreateProductBodyType) => {
        try{
            if(id){
                if(updateProductMutation.isPending ) return
                await updateProductMutation.mutateAsync({
                    id: id as number,
                    ...data,
                })

                toast.success("Update success")
            }else{
                if(createProductMutation.isPending)  return
                
                await createProductMutation.mutateAsync(data)
                console.log("create" , data)
            }
        }catch (error) {
            handleErrorApi({
                error,
                setError,
            })
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

                            <FeatureToggle
                                control={control}
                                name="is_featured"
                                label="Is featured?"
                            />
                            
                            <div className="mb-3 position-relative">
                                <label className="form-label form-label" >
                                    Content 
                                </label>
                                                           
                                <textarea className="form-control " placeholder="Enter Content"  {...register("content")} />
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

                <Controller
                    name="categories"
                    control={control}
                    render={({ field }) => (
                    <CategorySelect
                        type="product"
                        value={field.value}
                        onChange={field.onChange}
                    />
                    )}
                />

                <ImageUploadBox
                    name="image"
                    setValue={setValue}
                    watch={watch}
                />

                <TagInput
                    name="tags"
                    control={control}
                    type="product"
                    label="Tags"
                />

            </div>
        </form>
    )
}
