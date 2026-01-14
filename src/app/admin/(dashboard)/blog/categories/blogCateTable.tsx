'use client'
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CreateBlogCateBodyType, CreateBlogCateBody } from "@/models/blog/categoryModel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "react-bootstrap";
import ImageUploadBox from "@/components/Image/ImageUploadBox";
import { useCreateBlogCateMutation, useUpdateBlogCateMutation,useGetBlogCateListQuery ,useGetBlogCateTreeQuery} from "@/queries/useBlogCate";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SlugInput from "@/components/input/slugInput";
import { handleErrorApi } from "@/utils/lib";
import { CategoryWithCountType } from "@/models/blog/categoryModel";
import FeatureToggle from "@/components/input/FeatureToggle";

// ================= TYPES =================
export interface CategoryItem {
    id: number;
    name: string;
    count: number;
    parent_id: number;
    is_featured: number;
    is_default: number;
}

interface SortableItemProps {
    item: CategoryItem;
    depth: number;
    hasChildren: boolean;
    isExpanded: boolean;
    onToggle: (id: number) => void;
    onSelect: (item: CategoryItem) => void;
}

// ================= SORTABLE ITEM =================
function SortableItem({
    item,
    depth,
    hasChildren,
    isExpanded,
    onToggle,
    onSelect,
}: SortableItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: item.id });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        marginLeft: depth * 20,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="d-flex align-items-center justify-content-between p-2 border rounded mb-1 bg-white"
        >
            <div className="d-flex align-items-center gap-2">
                {hasChildren && (
                <button
                    type="button"
                    className="btn btn-sm btn-light"
                    onClick={() => onToggle(item.id)}
                >
                    {isExpanded ? "−" : "+"}
                </button>
                )}

                <span
                {...attributes}
                {...listeners}
                className="text-muted"
                style={{ cursor: "grab" }}
                >
                ≡
                </span>

                <span role="button" onClick={() => onSelect(item)}>
                {item.name} <span className="text-primary">({item.count})</span>
                </span>
            </div>
        </div>
    );
}

// ================= MAIN COMPONENT =================
export default function BlogCategoryManager() {
    const router = useRouter()
    const createCateMutation = useCreateBlogCateMutation();
    const updateCateMutation = useUpdateBlogCateMutation();

    const cateListQuery = useGetBlogCateTreeQuery();
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

    const renderCategories = (parentId: number, depth = 0) => {
        return categories
            .filter(c => c.parent_id === parentId)
            .map(cat => {
            const children = categories.filter(c => c.parent_id === cat.id);
            const hasChildren = children.length > 0;
            const isExpanded = !!expanded[cat.id];

            return (
                <div key={cat.id}>
                    <SortableItem
                        item={cat}
                        depth={depth}
                        hasChildren={hasChildren}
                        isExpanded={isExpanded}
                        onToggle={toggleExpand}
                        onSelect={onSelectCategory}
                    />

                    {hasChildren && isExpanded && (
                        <div>{renderCategories(cat.id, depth + 1)}</div>
                    )}
                </div>
            );
        });
    };

    const getParentName = (
        parentId: number,
        categories: CategoryItem[]
    ) => {
        if (parentId === 0) return "None";

        const parent = categories.find(c => c.id === parentId);
        return parent ? parent.name : "Unknown";
    };

    const onSelectCategory = (item: CategoryItem) => {
        setSelected(item);

        setValue("name", item.name);
        setValue("parent_id", item.parent_id);
        setValue("description", "");
        setValue("is_featured",item.is_featured);
        setValue("is_default",item.is_default);
    };

    const renderParentOptions = (parentId = 0, depth = 0):  React.ReactNode[]  => {
        return categories
            .filter(c => c.parent_id === parentId)
            .flatMap(cat => {
            // Không cho chọn chính nó
            if (selected && cat.id === selected.id) {
                return [];
            }

            return [
                <option key={cat.id} value={cat.id}>
                {"— ".repeat(depth)} {cat.name}
                </option>,
                ...renderParentOptions(cat.id, depth + 1),
            ];
            });
        };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
        setError,
        control,
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
            status: "published",
        },
    });

    const onSubmit = async(data: CreateBlogCateBodyType) => {
        try{
            if (selected) {
                if(updateCateMutation.isPending) return

                try {
                    let body: CreateBlogCateBodyType & {id:number} ={
                        id: selected.id as number,
                        ...data
                    }
                    const result = await updateCateMutation.mutateAsync(body)
                    toast.success("update success");
                    reset();
                    router.refresh()
                } catch (error) {
                    handleErrorApi({
                        error,
                        setError:setError
                    })
                }
                console.log("UPDATE", selected.id, data);
                console.log("UPDATE", selected.id,);
            }else{
                if(createCateMutation.isPending) return
                let body = data;
                console.log("CREATE", data);
                const result = await createCateMutation.mutateAsync(body);
                reset();
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
                {/* LEFT */}
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">

                        <DndContext collisionDetection={closestCenter}>
                            <SortableContext
                            items={categories.map(c => c.id)}
                            strategy={verticalListSortingStrategy}
                            >
                            {renderCategories(0)}
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
                                        {renderParentOptions()}
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
                                        setValue={setValue}
                                        watch={watch}
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
