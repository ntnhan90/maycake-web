'use client'
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CreateProCateBodyType , CreateProCateBody} from "@/models/product/categoryModel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "react-bootstrap";
import ImageUploadBox from "@/components/Image/ImageUploadBox";
// ================= TYPES =================
export interface CategoryItem {
    id: number;
    name: string;
    count: number;
    parent_id: number;
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
export default function CategoryManager() {
    const [categories,setCategories] = useState<CategoryItem[]>([
        { id: 1, name: "Television", count: 19, parent_id: 0 },
        { id: 2, name: "Home Audio & Theaters", count: 4, parent_id: 1 },
        { id: 3, name: "TV & Videos", count: 2, parent_id: 1 },
        { id: 4, name: "Camera, Photos & Videos", count: 3, parent_id: 0 },
        { id: 5, name: "DSLR Camera", count: 1, parent_id: 4 },
    ]);

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
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
        setError
    } = useForm<CreateProCateBodyType>({
        resolver: zodResolver(CreateProCateBody),
        defaultValues: {
            name: "",
            parent_id: 0,
            description: "",
            status: "",
        },
    });

    const onSubmit = async(data: CreateProCateBodyType) => {
        try{
            if (selected) {
                console.log("UPDATE", selected.id, data);
            }else{
                console.log("CREATE", data);
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
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input  className="form-control"
                                         {...register("name")} 
                                    />
                                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Parent</label>
                                    <input
                                        className="form-control"
                                        value={selected ? getParentName(selected.parent_id, categories) : ""}
                                        readOnly
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" rows={6}  {...register("description")}  />
                                </div>


                                <Form.Select aria-label="Default select example" {...register("status")} >
                                    <option value="published">Published</option>
                                    <option value="draft">Draft</option>
                                    <option value="pending">Pending</option>
                                </Form.Select>
                                
                                <ImageUploadBox
                                    name="image"
                                    setValue={setValue}
                                    watch={watch}
                                />
                                <Button variant="primary" type="submit">Save</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
