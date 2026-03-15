'use client'
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CreateProCateBodyType , CreateProCateBody} from "@/models/product/categoryModel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "react-bootstrap";
import ImageUploadBox from "@/components/Image/ImageUploadBox";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SlugInput from "@/components/input/slugInput";
import { handleErrorApi } from "@/utils/lib";
import { CategoryWithCountType } from "@/models/blog/categoryModel";
import FeatureToggle from "@/components/input/FeatureToggle";
import { useCreateProductCateMutation, useUpdateProductCateMutation,useGetProductCateTreeQuery, useDeleteProductCateMutation } from "@/queries/useProductCate";
import { CategoryItem } from "@/models/categoryManager";
import { renderCategories ,renderParentOptions} from "@/utils/render";
import { onSelectCategory } from "@/utils/lib";

export default function CategoryManager() {
    const router = useRouter()
    const createCateMutation = useCreateProductCateMutation();
    const updateCateMutation = useUpdateProductCateMutation();
    const deleteMutation = useDeleteProductCateMutation()

    const cateListQuery = useGetProductCateTreeQuery();
    const raw = cateListQuery.data?.payload ?? [];
    const categories :CategoryWithCountType[] = Array.isArray(raw) ? raw : [];

    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const [selected, setSelected] = useState<CategoryItem | null>(null);

    const toggleExpand = (id: number) => {
        setExpanded(prev => ({
        ...prev,
        [id]: !prev[id],
        }));
    };

    const handleSelectCategory = (item: CategoryItem) => {
        onSelectCategory({
            item,
            setSelected,
            setValue
        });
    };

    const handleDeleteCategory = (id: number) => {
        if (deleteMutation.isPending) return
        deleteMutation.mutate(id)
    }

    const {
        register,
        handleSubmit,
        reset,
        control,
        watch,
        setValue,
        setError
    } = useForm<CreateProCateBodyType>({
        resolver: zodResolver(CreateProCateBody),
        defaultValues: {
            name: "",
            parent_id: 0,
            description: "",
            is_featured: 0,
            is_default: 0,
            order: 0,
            image:"",
            status: "published",
        },
    });

    const onSubmit = async(data: CreateProCateBodyType) => {
        try{
            if (selected) {
                if(updateCateMutation.isPending) return

                try {
                    let body: CreateProCateBodyType & {id:number} ={
                        id: selected.id as number,
                        ...data
                    }
                    const result = await updateCateMutation.mutateAsync(body)
                    toast.success("update success");
                    reset();
                    setSelected(null) 
                    router.refresh()
                } catch (error) {
                    handleErrorApi({
                        error,
                        setError:setError
                    })
                }
                console.log("UPDATE", selected.id, data);
            }else{
                if(createCateMutation.isPending) return
                let body = data;
                console.log("CREATE", data);
                const result = await createCateMutation.mutateAsync(body);
                reset();
                setSelected(null) 
                toast.success("add success");
                router.refresh()
            }
        }catch(err){
            console.error(err);
        }
    }
    
    return (
        <div className="container-fluid">
            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">

                        <DndContext collisionDetection={closestCenter}>
                            <SortableContext
                            items={categories.map(c => c.id)}
                            strategy={verticalListSortingStrategy}
                            >
                                {renderCategories({
                                    categories,
                                    expanded,
                                    toggleExpand,
                                    onSelectCategory: handleSelectCategory,
                                    onDeleteCategory: handleDeleteCategory,
                                    parentId: 0,
                                })}
                            </SortableContext>
                        </DndContext>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit, (err) =>{
                                console.log(err)
                            })} className="row">
                                <SlugInput
                                    register={register}
                                    setValue={setValue}
                                    watch={watch}
                                    titleName="name"
                                    slugName="slug"
                                />

                                <div className="mb-3">
                                    <label className="form-label">Parent</label>
                                    <Form.Select {...register("parent_id", { valueAsNumber: true })}>
                                        <option value={0}>None</option>
                                        {renderParentOptions({
                                            categories,
                                            selected,
                                        })}
                                    </Form.Select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" rows={6}  {...register("description")}  />
                                </div>

                                <FeatureToggle
                                    control={control}
                                    name="is_featured"
                                    label="Is featured?"
                                />

                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <Form.Select aria-label="Default select example" {...register("status")} >
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                        <option value="pending">Pending</option>
                                    </Form.Select>
                                </div>
                                
                                <div className="mb-3">
                                    <ImageUploadBox
                                        name="image"
                                        control={control}
                                    />
                                </div>
                                <Button variant="primary" type="submit">Save</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
