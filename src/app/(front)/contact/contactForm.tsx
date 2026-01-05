'use client'
import { CreateContactBodyType, CreateContactBody } from "@/models/contactModel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleErrorApi } from "@/utils/lib";
import { useRouter } from "next/navigation";
import { useCreateContactMutation } from "@/queries/useContact";

export default function ContactForm() {
    const router = useRouter()
    const createContactMutation = useCreateContactMutation();
    const {
        register,
        handleSubmit,
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

    const onSubmit = async(data:CreateContactBodyType) => {
        if(createContactMutation.isPending) return
        let body = {
            ...data,
            status : "unread"
        }
        
        const result = await createContactMutation.mutateAsync(body)
        console.log("result " , result)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, (err) =>{
            console.log(err)
        })}>
            <div className="row">
                <div className="col-lg-6">
                    <input className="form-control " placeholder="Name"  {...register("name")} />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
                <div className="col-lg-6">
                    <input className="form-control " placeholder="Email"  {...register("email")} />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div className="col-lg-6">
                    <input className="form-control " placeholder="Phone"  {...register("phone")} />
                    {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
            
                </div>
                <div className="col-lg-6">
                    <input className="form-control " placeholder="Address"  {...register("address")} />
                    {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                </div>
                <div className="col-lg-12">
                    <textarea className="form-control " placeholder="Message" {...register("content")}></textarea>
                    {errors.content && <p className="text-red-500">{errors.content.message}</p>}
                    <button type="submit" className="site-btn">Send Us</button>
                </div>
            </div>
        </form>
    )
}