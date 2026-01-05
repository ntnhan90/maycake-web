"use client"
import { CreateContactBodyType, CreateContactBody } from "@/models/contactModel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import { useGetContactQuery, useUpdateContactMutation } from "@/queries/useContact";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { handleErrorApi } from "@/utils/lib";
import { update } from "cypress/types/lodash";

type Props ={
    id?: number,
   // children?: React.ReactNode;
}
//({id}:Props)
export default function AdminContactForm({id}:Props) {
    const router = useRouter()
    const updateContactMutation = useUpdateContactMutation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setError
    } = useForm<CreateContactBodyType>({
        resolver: zodResolver(CreateContactBody),
        defaultValues: {
            email: "",
            name: "",
            phone: "",
            address: "",
            content:"",
            status: "unread",
        },
    });

    let contactData = null;
    const contactId= Number(id);
    try {
        const { data, isLoading, error } = useGetContactQuery(contactId);
        contactData = data?.payload
    } catch (error) {
        return <div>Something went wrong</div>
    }

    useEffect(() => {
        if (contactData) {
            reset({
                email: contactData.email ??"",
                name: contactData.name ??"",
                phone: contactData.phone ??"",
                address:contactData.address ?? "",
                content:contactData.content ??"",
                status: contactData.status ?? "unread",
            })
        }
    }, [contactData, reset])

    const onSubmit = async(data:CreateContactBodyType) => {
        if(updateContactMutation.isPending) return
        try {
            let body: CreateContactBodyType & {id:number} ={
                id: id as number,
                ...data
            }
            const result = await updateContactMutation.mutateAsync(body)
            toast.success("update success");
            router.push("/admin/contact")
        } catch (error) {
            handleErrorApi({
                error,
                setError:setError
            })
        }
        console.log("contact : " , data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, (err) =>{
            console.log(err)
        })} className="row">
            <div className="col-md-9">
                <Card>
                    <CardHeader>
                        <h5 className="card-title"> Contact information </h5>
                    </CardHeader>
                    <CardBody>
                        <p>
                            Name : {contactData?.name}
                        </p>
                        <p>
                            Email : {contactData?.email}
                        </p>
                         <p>
                            Phone : {contactData?.address}
                        </p>
                        <p>
                            Address : {contactData?.address}
                        </p>
                        <p>
                            content : {contactData?.content}
                        </p>

                    </CardBody>
                </Card>
            </div>
            <div className="col-md-3">
                <Card>
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
                            <option value="unread">Unread</option>
                            <option value="read">Read</option>
                        </Form.Select>
                    </CardBody>
                </Card>
            </div>
        </form>
    )
}