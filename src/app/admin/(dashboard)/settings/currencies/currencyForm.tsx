"use client"

import { useForm ,Controller} from "react-hook-form";
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
    const createCurrencyMutation = useCreateCurrencyMutation();
    const updateCurrencyMutaiton = useUpdateCurrencyMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
        control
    } = useForm<CreateCurrencyBodyType>({
        resolver: zodResolver(CreateCurrencyBody),
        defaultValues: {
            title:"",
            exchange_rate:0,
            is_prefix_symbol:1,
            default: 0
        },
    });
    
    let currencyData=  null;
    if(id){
        const currencyId = Number(id);
        try {
            const {data } = useGetCurrencyQuery(currencyId);
            currencyData = data?.payload
        }catch (error) {
            return <div>Something went wrong</div>
        }
    }
    
    useEffect(() => {
        if (currencyData) {
            reset({
                title: currencyData.title ?? "",
                exchange_rate: currencyData.exchange_rate ?? 0,
                is_prefix_symbol:currencyData.is_prefix_symbol ?? 1,
                default:currencyData.default ?? 0,
            })
        }
    }, [currencyData, reset])

    const onSubmit = async(data: CreateCurrencyBodyType) =>{
        console.log(data)
        try {
            if(id){
                if(updateCurrencyMutaiton.isPending) return
                let body: CreateCurrencyBodyType & {id:number} ={
                    id: id as number,
                    ...data
                }
                await updateCurrencyMutaiton.mutateAsync(body)
                toast.success("update success");
            }else{
                if(createCurrencyMutation.isPending) return
                await createCurrencyMutation.mutateAsync(data);
                toast.success("add success");
            }
            router.push("/admin/settings/currencies")
        } catch (error) {
            handleErrorApi({
                error,
                setError:setError
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, (err)=>{
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
                                <input className="form-control " placeholder="Enter title"  {...register("title")} />
                                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                            </div>

                            <div className="mb-3 position-relative">
                                <label className="form-label form-label" htmlFor="first_name">
                                    Exchange Rate <span className="text-red-500">*</span>
                                </label>
                                <input className="form-control " placeholder="Enter decimals" 
                                    type="number"
                                    step="0.01"
                                    {...register("exchange_rate",{
                                        valueAsNumber:true,
                                    })}
                                    onKeyDown={(e) =>{
                                        const allowed = ["Backspace", "Tab", "ArrowLeft", "ArrowRight"];
                                        if (allowed.includes(e.key)) return;
                                        if (/^[0-9]$/.test(e.key)) return;
                                        if (e.key === "." && !e.currentTarget.value.includes(".")) return;
                                        e.preventDefault();
                                    }}
                                />
                                {errors.exchange_rate && <p className="text-red-500">{errors.exchange_rate.message}</p>}
                            </div>

                            <div className="mb-3 form-check form-switch">
                                <Controller
    name="default"
    control={control}
    render={({ field }) => (
        <input
            type="checkbox"
            className="form-check-input"
            checked={field.value === 1}
            onChange={(e) => field.onChange(e.target.checked ? 1 : 0)}
        />
    )}
/>
                                <label className="form-check-label" htmlFor="is_default">
                                    Set as default
                                </label>
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
                        <h5 className="card-title">Position of symbol
                        </h5>
                    </CardHeader>
                    <CardBody>
                        <Form.Select aria-label="Default select example" {...register("is_prefix_symbol")} >
                            <option value="0">Before</option>
                            <option value="1">After</option>
                        </Form.Select>
                    </CardBody>
                </Card>
            </div>
        </form>
    )
}