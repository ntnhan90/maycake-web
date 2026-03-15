'use client'
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { CreateBlogCateBodyType, CreateBlogCateBody } from "@/models/blog/categoryModel";
import { CategoryItem } from "@/models/categoryManager";
import { CategoryWithCountType } from "@/models/blog/categoryModel";
import { renderCategories, renderParentOptions } from "@/utils/render";
import { useCreateBlogCateMutation, useUpdateBlogCateMutation, useGetBlogCateTreeQuery , useDeleteBlogCateMutaion} from "@/queries/useBlogCate";
import { useCategorySelect } from "@/hooks/useCategorySelect";
import { useBlogCategorySubmit } from "@/hooks/useBlogCategorySubmit";
import ImageUploadBox from "@/components/Image/ImageUploadBox";
import SlugInput from "@/components/input/slugInput";
import FeatureToggle from "@/components/input/FeatureToggle";

export default function BlogCategoryManager() {
    const router = useRouter()
    const createMutation = useCreateBlogCateMutation()
    const updateMutation = useUpdateBlogCateMutation()
    const deleteMutation = useDeleteBlogCateMutaion()

    const cateTreeQuery = useGetBlogCateTreeQuery()
    const raw = cateTreeQuery.data?.payload ?? []
    const categories: CategoryWithCountType[] = Array.isArray(raw) ? raw : []
    const [expanded, setExpanded] = useState<Record<string, boolean>>({})
    const [selected, setSelected] = useState<CategoryItem | null>(null)

    const toggleExpand = (id: number) => {
        setExpanded(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        setError,
        control
    } = useForm<CreateBlogCateBodyType>({
        resolver: zodResolver(CreateBlogCateBody),
        defaultValues: {
            name: "",
            parent_id: 0,
            description: "",
            is_featured: 0,
            is_default: 0,
            order: 0,
            image: "",
            status: "published"
        }
    })

    const handleSelectCategory = useCategorySelect(setSelected, setValue)
    const handleDeleteCategory = (id: number) => {
        if (deleteMutation.isPending) return
      //  if (!confirm("Delete this category?")) return
        deleteMutation.mutate(id)
    }
    
    const onSubmit = useBlogCategorySubmit({
        selected,
        createMutation,
        updateMutation,
        reset,
        setSelected,
        router,
        setError
    })

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
                                        onDeleteCategory:handleDeleteCategory,
                                        parentId: 0
                                    })}
                                </SortableContext>
                            </DndContext>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)} className="row">
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
                                        selected
                                        })}
                                    </Form.Select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        rows={6}
                                        {...register("description")}
                                    />
                                </div>

                                <FeatureToggle
                                    control={control}
                                    name="is_featured"
                                    label="Is featured?"
                                />

                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <Form.Select {...register("status")}>
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

                                <Button type="submit">
                                {selected ? "Update Category" : "Create Category"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}