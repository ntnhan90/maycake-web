"use client"
import { CreatePostBodyType, CreatePostBody } from "@/models/blog/postModel";
import { useForm , Controller} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import { useCreateBlogPostMutation, useGetBlogPostQuery, useUpdateBlogPostMutation } from "@/queries/useBlogPost";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { handleErrorApi } from "@/utils/lib";
import SlugInput from "@/components/input/slugInput";
import FeatureToggle from "@/components/input/FeatureToggle";
import ImageUploadBox from "@/components/Image/ImageUploadBox";
import TagInput from "@/components/input/tagInput";
import CategorySelect from "@/components/input/categorySelect";
import { useAccountProfile } from '@/queries/useAccount'

type Props = {
    id? : number
}

export default function PostForm({id}: Props){
    const router = useRouter()
    const { data: dataAccount } = useAccountProfile()
    const account_id = dataAccount?.payload.id;
    const createPostMutation = useCreateBlogPostMutation();
    const updatePostMutation = useUpdateBlogPostMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
        setError,
        control
    } = useForm<CreatePostBodyType>({
        resolver: zodResolver(CreatePostBody),
        defaultValues: {
            name: "",
            slug: "",
            description: "",
            content: "",
            is_featured: 0,
            status:"published",
            tags: [],
            categories: [],
        },
    });

    let postData = null;
    if(id){
        const postId = Number(id);
        try {
            const { data, isLoading, error } = useGetBlogPostQuery(postId);
            postData = data?.payload
        } catch (error) {
            return <div>Something went wrong</div>
        }
    }

    useEffect(() => {
        if (postData) {
            reset({
                name: postData.name ?? "",
                description: postData.description ?? "",
                content: postData.content ??"",
                is_featured: postData.is_featured ?? 0,
                status:postData.status  ?? "published",
                tags: postData.tags?.map((t: any) => t.name) ?? [],
                categories: postData.categories?.map((t: any) => t.id) ?? [],
            })
        }
    }, [postData, reset])

    const onSubmit = async(data: CreatePostBodyType) => {
        if (!account_id) {
            throw new Error('Account not loaded')
        }

        try {
            if(id){
                if(updatePostMutation.isPending) return
                let body: CreatePostBodyType & {id:number} ={
                    id: id as number,
                    ...data
                }
                await updatePostMutation.mutateAsync(body)
                toast.success("update success");
            }else{
                if(createPostMutation.isPending) return
                let body = {
                    ...data,
                    user_id: account_id,
                }
                await createPostMutation.mutateAsync(body);

                toast.success("add success");
            }
            router.push("/admin/blog/posts")
        } catch (error) {
            handleErrorApi({
                error,
                setError:setError
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
                               
                                <textarea className="form-control " placeholder="Enter description"  {...register("content")} />
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
                        type="post"
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
                    type="post"
                    label="Tags"
                />
            </div>
        </form>
    )
}