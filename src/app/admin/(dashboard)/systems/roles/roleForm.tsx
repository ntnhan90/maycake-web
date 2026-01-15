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


type Props = {
    id? : number
}

export default function RoleForm({id}: Props){
    const router = useRouter()
  
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
         //   status:"published",
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
             //   status:tagData.status  ?? "published",
            })
        }
    }, [roleData, reset])

    const onSubmit = async(data: CreateRoleBodyType) => {
        if(id){
           console.log("Update :", data )
           
        }else{
           console.log("Create :", data )
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