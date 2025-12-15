"use client"
import { CreateProLabelBodyType, CreateProLabelBody } from "@/models/product/labelsModel"
import {useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { handleErrorApi } from "@/utils/lib";

type Props ={
    id?: number
}

export default function LabelForm({id}:Props){
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
        setError
    } = useForm<CreateProLabelBodyType>({
        resolver: zodResolver(CreateProLabelBody),
        defaultValues: {
            name:"",
            color:"",
            status:"published",
        },
    });


     const onSubmit = async(data:CreateProLabelBodyType) => {
        if(id){
            console.log("update" , data)
        }else{
            console.log("create" , data)
        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit, (err) =>{
            console.log(err)
        })} className="row">
            <div className="col-md-9">
                <Card>
                    <CardBody>
                        <div className="form-body">
                            <div className="mb-3 position-relative">
                                <label className="form-label form-label" htmlFor="first_name">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input className="form-control " placeholder="Enter title"  {...register("name")} />
                                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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
                <Card className="mt-4">
                    <CardHeader>
                        <h5 className="card-title">Status
                            <span className="text-red-500">*</span>
                        </h5>
                    </CardHeader>
                    <CardBody>
                        <Form.Select aria-label="Default select example" {...register("status")} >
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                            <option value="pending">Pending</option>
                        </Form.Select>
                    </CardBody>
                </Card>
            </div>
        </form>
    )
}