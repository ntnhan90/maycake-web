"use client"
import { CreateRoleBodyType, CreateRoleBody } from "@/models/roleModel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import { useCreateRoleMutation, useGetRoleQuery, useUpdateRoleMutation } from "@/queries/useRole";
import { useGetPermissionsListQuery } from "@/queries/useRole";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect ,useState} from "react";
import { handleErrorApi } from "@/utils/lib";
import { PermissionResType } from "@/models/roleModel";

type Props = {
    id? : number
}

export default function RoleForm({id}: Props){
    const router = useRouter()
    const createRoleMutation = useCreateRoleMutation();
    const updateRoleMutation = useUpdateRoleMutation();

    const permsListQuery = useGetPermissionsListQuery();
    const permissions: PermissionResType[] = (permsListQuery.data?.payload.data as PermissionResType[]) ?? [];
     /* ===== Form ===== */
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
            is_default: 0,
            permissionIds: [],
        },
    });


    /* ===== Load role when edit ===== */
    const roleQuery = id ? useGetRoleQuery(id) : null;
    const roleData = roleQuery?.data?.payload;
    const selectedPermissionIds = watch("permissionIds") ?? [];
    useEffect(() => {
        if (roleData) {
            reset({
                name: roleData.name ?? "",
                description: roleData.description ?? "",
                is_default: roleData.is_default ?? 0,
             //   permissionIds: roleData.permissions?.map((p: any) => p.id) ?? [],
            })
        }
    }, [roleData, reset])

    const togglePermission = (id: number) => {
        const current = watch("permissionIds") ?? [];

        const next = current.includes(id)
            ? current.filter((p) => p !== id)
            : [...current, id];

        setValue("permissionIds", next, { shouldDirty: true });
    };
    const groupByModule = (permissions: PermissionResType[]) => {
        return permissions.reduce<Record<string, PermissionResType[]>>((acc, p) => {
            if (!acc[p.module]) acc[p.module] = [];
            acc[p.module].push(p);
            return acc;
        }, {});
    };

    const groupedPermissions = groupByModule(permissions);

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
            /*
            let body = data;
            const result = await createRoleMutation.mutateAsync(body)

            reset({
                name:  "",
                description: "",
            })
            toast.success("add success");
            router.push("/admin/systems/roles")
            */
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

                            <div className="mb-3 position-relative">
                                <label className="form-label form-label" >
                                    Permissions 
                                </label>
                                {Object.entries(groupedPermissions).map(([module, perms]) => (
                                    <div key={module} className="border rounded p-3 mb-3">
                                        <strong className="text-capitalize">{module}</strong>

                                        <div className="row mt-2">
                                        {perms.map((p) => (
                                            <div key={p.id} className="col-md-4">
                                            <Form.Check
                                                type="checkbox"
                                                id={`permission-${p.id}`}
                                                label={p.name}
                                                checked={selectedPermissionIds.includes(p.id)}
                                                onChange={() => togglePermission(p.id)}
                                            />
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                    ))}
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