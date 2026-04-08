"use client"
import { useForm ,Controller,useFieldArray} from "react-hook-form";
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
import { useGetProductAttributeListQuery } from "@/queries/useProductAttribute";

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
            sale_price: 0,
            tags: [],
            categories: [],
            product_attributes: [],
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

    const { data: attrData } = useGetProductAttributeListQuery();
    const attributeSets = attrData?.payload?.data || [];


    useEffect(() => {
        if (productData) {
            reset({
                name: productData.name ?? "",
                description: productData.description ?? "",
                content: productData.content ??"",
                is_featured: productData.is_featured ?? 0,
                status:productData.status  ?? "published",
                sale_price: productData.sale_price  ??0,
                tags: productData.tags?.map((t: any) => t.name) ?? [],
                categories: productData.categories?.map((t: any) => t.id) ?? [],
            })
        }
    }, [productData, reset])

   

    const onSubmit = async(data: CreateProductBodyType) => {
        try{
            if(id){
                if(updateProductMutation.isPending ) return
                console.log(data);
                /*
                await updateProductMutation.mutateAsync({
                    id: id as number,
                    ...data,
                })
                */
                toast.success("Update success")
            }else{
                if(createProductMutation.isPending)  return
                
                await createProductMutation.mutateAsync(data)
                toast.success("Add success")
            }
            router.push("/admin/ecommerce/products")
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
                <Card className="mb-3">
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

                <Card className="mb-3">
                    <CardHeader>
                        <h5 className="mb-0 fw-semibold">Attributes</h5>
                    </CardHeader>

                    <CardBody>
                        {attributeSets.map((set: any, index: number) => {
                        return (
                            <div key={set.id} className="row mb-3 align-items-center">
                            
                                <div className="col-md-5">
                                    <input
                                    className="form-control"
                                    value={set.name}
                                    disabled
                                    />
                                </div>

                                <div className="col-md-7">
                                    <Form.Select
                                    {...register(`product_attributes.${index}.attribute_id`, {
                                        setValueAs: (v) => (v ? Number(v) : undefined),
                                    })}
                                    >
                                    <option value="">Select value</option>
                                    {set.attributes.map((attr: any) => (
                                        <option key={attr.id} value={attr.id}>
                                        {attr.title}
                                        </option>
                                    ))}
                                    
                                    </Form.Select>
                                </div>
                            </div>
                        );
                        })}
                    </CardBody>
                </Card>


                <Card className="mb-3">
                    <CardHeader className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 fw-semibold">Recipes</h5>
                    </CardHeader>
                    <CardBody>
                        <p className="text-muted">Adding Recipes helps the product to have many options, such as size or color.</p>
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
                    control={control}
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
