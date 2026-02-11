"use client"
import { CreateMaterialBodyType, CreateMaterialBody } from "@/models/materialModel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import { useCreateMaterialMutation, useGetMaterialQuery, useUpdateMaterialMutation } from "@/queries/useMaterial";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { handleErrorApi } from "@/utils/lib";
import SlugInput from "@/components/input/slugInput";
type Props = {
    id? :number
}

export default function MaterialForm({id}:Props){
    const router = useRouter();
    const createMaterialMutation = useCreateMaterialMutation();
    const updateMaterialMutation = useUpdateMaterialMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
        setError
    } = useForm<CreateMaterialBodyType>({
        resolver: zodResolver(CreateMaterialBody),
        defaultValues: {
            name: "",
            unit: "kg",
            category: "Sponge",
            cost_price: "0.00",
            status:"active",
        },
    });

    let materialData = null;
    if(id){
        const tagId = Number(id);
        try {
            const { data, isLoading, error } = useGetMaterialQuery(tagId);
            materialData = data?.payload
        } catch (error) {
            return <div>Something went wrong</div>
        }
    }
    useEffect(() => {
        if (materialData) {
            reset({
                name: materialData.name ?? "",
                unit: materialData.unit ?? "kg",
                category: materialData.category ?? "Sponge",
                cost_price: materialData.cost_price ?? "0.00",
                status:materialData.status  ?? "published",
            })
        }
    }, [materialData, reset])

    const onSubmit = async( data: CreateMaterialBodyType) => {
        try {
            if(id){
                if(updateMaterialMutation.isPending) return
                await updateMaterialMutation.mutateAsync({
                    id: id as number,
                    ...data,
                })
                toast.success("Update success")
            }else{
                if(createMaterialMutation.isPending) return
                await createMaterialMutation.mutateAsync(data)
                toast.success("Add success")
            }
            router.push("/admin/ecommerce/product-materials")
        } catch (error) {
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
                <div className="mb-3 position-relative">
                    <label className="form-label">Name</label>
                    <input
                        {...register("name")}
                        placeholder="Nhập tiêu đề"
                        className="form-control"
                    />
                    {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                    )}
                </div>
                <div className="row row-cols-lg-3">
                     <div className="mb-3 position-relative">
                        <label className="form-label form-label" htmlFor="Unit">
                            Unit <span className="text-red-500">*</span>
                        </label>
                        <Form.Select aria-label="Default select example" {...register("unit")} >
                            <option value="piece">Piece</option>
                            <option value="kg">Kg</option>
                            <option value="lit">Lit</option>
                        </Form.Select>
                    </div>

                    <div className="mb-3 position-relative">
                        <label className="form-label form-label" htmlFor="category">
                            Category<span className="text-red-500">*</span>
                        </label>
                        <Form.Select aria-label="Default select example" {...register("category")} >
                            <option value="piece">Sponge</option>
                            <option value="kg">Filling</option>
                            <option value="lit">Topping</option>
                            <option value="kg">Frosting</option>{/** lớp phủ */}
                            <option value="lit">Packaging</option> {/** bao bi */}
                        </Form.Select>
                    </div>

                    <div className="mb-3 position-relative">
                        <label className="form-label form-label" htmlFor="first_name">
                            Username <span className="text-red-500">*</span>
                        </label>
                        <input className="form-control " placeholder="Enter Username"  {...register("cost_price")} />
                    </div>
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
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </Form.Select>
                    </CardBody>
                </Card>
            </div>
        </form>
    )
}
