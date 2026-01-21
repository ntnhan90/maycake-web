"use client"
import { CreateRoleBodyType, CreateRoleBody } from "@/models/roleModel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import { useCreateRoleMutation, useGetRoleQuery, useUpdateRoleMutation } from "@/queries/useRole";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { handleErrorApi } from "@/utils/lib";
import { PermissionCheckboxes } from "@/components/input/permissionsCheckbox";

type Props = {
    id? : number
}

export default function RoleForm({id}: Props){
    const router = useRouter()
    const createRoleMutation = useCreateRoleMutation();
    const updateRoleMutation = useUpdateRoleMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
        setError,
        control
    } = useForm<CreateRoleBodyType>({
        resolver: zodResolver(CreateRoleBody),
        defaultValues: {
            name: "",
            description: "",
            is_default: 0
        },
    });

    let roleData = null;
    if(id){
        const roleId = Number(id);
         try {
            const { data, isLoading, error } = useGetRoleQuery(roleId);
            roleData = data?.payload
        } catch (error) {
            return <div>Something went wrong</div>
        }
    }
    useEffect(() => {
        if (roleData) {
            reset({
                name: roleData.name ?? "",
                description: roleData.description ?? "",
                is_default: roleData.is_default ?? 0
            })
        }
    }, [roleData, reset])


    const onSubmit = async(data: CreateRoleBodyType) => {
        if(id){
           console.log("Update :", data )
           if(updateRoleMutation.isPending) return
            try {
                let body: CreateRoleBodyType & {id:number} ={
                    id: id as number,
                    ...data
                }
                const result = await updateRoleMutation.mutateAsync(body)
                toast.success("update success");
                router.push("/admin/systems/roles")
            } catch (error) {
                handleErrorApi({
                    error,
                    setError:setError
                })
            }
        }else{
            if(createRoleMutation.isPending) return
            let body = data;
            const result = await createRoleMutation.mutateAsync(body)

            reset({
                name:  "",
                description: "",
            })
            toast.success("add success");
            router.push("/admin/systems/roles")
           //console.log("Create :", data )
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
                            <div className="mb-3 position-relative">
                                <label className="form-label" htmlFor="first_name">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input className="form-control " placeholder="Enter title"  {...register("name")} />
                                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                            </div>
                           
                        
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
            </div>
        </form>
    )
}