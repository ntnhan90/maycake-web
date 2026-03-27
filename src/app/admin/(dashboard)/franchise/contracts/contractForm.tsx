'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import {  useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { CreateContractBody, CreateContractBodyType } from '@/models/franchise/contractModel';
import { handleErrorApi } from '@/utils/lib';
import { useCreateContractMutation,useUpdateContractMutation, useGetContractListQuery, useGetContractQuery } from '@/queries/useFranchiseContract';
import { useGetFranchiseListQuery } from '@/queries/useFranchise';
import { formatDateForInput } from '@/utils/lib';
import dayjs from "dayjs";

type Props = {
  id?: number;
};

export default function ContractForm({ id }: Props) {
    const router = useRouter()
    const createContractMutation = useCreateContractMutation();
    const updateContractMutation = useUpdateContractMutation();
    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm<CreateContractBodyType>({
        resolver: zodResolver(CreateContractBody),
        defaultValues: {
            contract_code: "",
            start_date: "",
            end_date: "",
            royalty_percent: "0.00",
            marketing_fee_percent: "0.00",
            payment_status: "pending",
            contract_file_url: "",
            franchise_id:1
        },
    });
    const { data: franchiseData } = useGetFranchiseListQuery()


    let contractData = null;
    if(id){
        const crmId = Number(id);
        try {
            const { data } = useGetContractQuery(crmId);
            contractData = data?.payload
        } catch (error) {
            return <div>Something went wrong</div>
        }
    }
    useEffect(() => {
        if (contractData) {
            reset({
                contract_code: contractData.contract_code ?? "",
                start_date: formatDateForInput(contractData.start_date) ??"",
                end_date: formatDateForInput(contractData.end_date) ?? "",
                royalty_percent: contractData.royalty_percent ??  "0.00",
                marketing_fee_percent: contractData.marketing_fee_percent ?? "0.00",
                payment_status: contractData.payment_status ?? "pending",
                contract_file_url: contractData.contract_file_url ?? "",
                franchise_id: contractData.franchise_id ?? 1
            })
        }
    }, [contractData, reset])


    const onSubmit = async (data: CreateContractBodyType) => {
        if (updateContractMutation.isPending || createContractMutation.isPending) return;

        const formattedData = {
            ...data,
            start_date: dayjs(data.start_date).format("YYYY-MM-DD HH:mm:ss"),
            end_date: dayjs(data.end_date).format("YYYY-MM-DD HH:mm:ss"),
        };
        try {
            if (id) {
                await updateContractMutation.mutateAsync({
                    id: Number(id),
                    ...formattedData,
                });
                toast.success("Update success");
            } else {
                await createContractMutation.mutateAsync(formattedData);
                toast.success("Create success");
            }
         //   router.push("/admin/franchise/contracts")
        } catch (error) {
            handleErrorApi({
                error,
                setError,
            });
        }
    };

    return(
        <form onSubmit={handleSubmit(onSubmit, (err) =>{
            console.log(err)
        })} className="row">
            <div className="col-md-9">
                <div className="mb-3 position-relative">
                    <label className="form-label form-label" htmlFor="first_name">
                        Contract Code <span className="text-red-500">*</span>
                    </label> 
                    <input className="form-control " placeholder="Enter name"  {...register("contract_code")} />
                    {errors.contract_code && <p className="text-red-500">{errors.contract_code.message}</p>}
                </div>
                <div className="mb-3 position-relative">
                    <label className="form-label form-label" htmlFor="first_name">
                        Start date <span className="text-red-500">*</span>
                    </label> 
                    <input
                        type="date"
                        className="form-control"
                        {...register("start_date")}
                        />
                    {errors.start_date && <p className="text-red-500">{errors.start_date.message}</p>}
                </div>
                <div className="mb-3 position-relative">
                    <label className="form-label form-label" htmlFor="first_name">
                        End date <span className="text-red-500">*</span>
                    </label> 
                    <input
                        type="date"
                        className="form-control"
                        {...register("end_date",)}
                        />
                    {errors.end_date && <p className="text-red-500">{errors.end_date.message}</p>}
                </div>

                <div className="mb-3 position-relative">
                    <label className="form-label form-label" htmlFor="first_name">
                        Franchise <span className="text-red-500">*</span>
                    </label> 
                    <Form.Select {...register("franchise_id", { valueAsNumber: true })}>
                        <option value="">Select franchise</option>
                        {franchiseData?.payload?.data?.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.company_name}
                            </option>
                        ))}
                    </Form.Select>
                    {errors.franchise_id && <p className="text-red-500">{errors.franchise_id.message}</p>}
                </div>
                
                <div className="mb-3 position-relative">
                    <label className="form-label form-label" htmlFor="first_name">
                        Royalty percent <span className="text-red-500">*</span>
                    </label> 
                    <input
                    type="number"
                        className="form-control"
                        {...register("royalty_percent")}
                        />
                    {errors.royalty_percent && <p className="text-red-500">{errors.royalty_percent.message}</p>}
                </div>

                <div className="mb-3 position-relative">
                    <label className="form-label form-label" htmlFor="first_name">
                        Marketing Fee Percent <span className="text-red-500">*</span>
                    </label> 
                    <input
                        type="number"
                        className="form-control"
                        {...register("marketing_fee_percent")}
                        />
                    {errors.marketing_fee_percent && <p className="text-red-500">{errors.marketing_fee_percent.message}</p>}
                </div>
                

                <div className="mb-3 position-relative">
                    <label className="form-label form-label" htmlFor="first_name">
                        Contract File Url 
                    </label> 
                    <input className="form-control " placeholder="Enter url"  {...register("contract_file_url")} />
                    {errors.contract_file_url && <p className="text-red-500">{errors.contract_file_url.message}</p>}
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
                        <Form.Select aria-label="Default select example" {...register("payment_status")} >
                            <option value="active">Active</option>
                            <option value="expired">Expired</option>
                            <option value="pending">Pending</option>
                            <option value="terminated">Terminated</option>
                        </Form.Select>
                    </CardBody>
                </Card>
            </div>
        </form>
    )
}
