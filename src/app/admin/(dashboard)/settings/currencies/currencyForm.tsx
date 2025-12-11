"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import { useCreateCurrencyMutation,useGetCurrencyQuery, useUpdateCurrencyMutation } from "@/queries/useCurrency";
import { CreateCurrencyBodyType, CreateCurrencyBody } from "@/models/currencyModel";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { handleErrorApi } from "@/utils/lib";

type Props ={
    id?: number
}

export default function CurrencyForm({id}: Props) {
    const router = useRouter()


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
        setError
    } = useForm<CreateCurrencyBodyType>({
        resolver: zodResolver(CreateCurrencyBody),
        defaultValues: {
            title:"",
            exchange_rate:0,
        },
    });


    const onSubmit = async(data: CreateCurrencyBodyType) =>{
        if(id){
            console.log("update" + data);
        }else{
            console.log("create" + data);
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit, (err)=>{
            console.log(err)
        })}>
            form
        </form>
    )
}