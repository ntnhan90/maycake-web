'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { CreateContractBody, CreateContractBodyType } from '@/models/franchise/contractModel';
import { handleErrorApi } from '@/utils/lib';
import { useCreateContractMutation,useUpdateContractMutation, useGetContractListQuery } from '@/queries/useFranchiseContract';
import { useGetFranchiseListQuery } from '@/queries/useFranchise';

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
        setValue,
        watch,
        setError,
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

    const onSubmit = async (data: CreateContractBodyType) => {
        try {
            if (  id) {
                if(updateContractMutation.isPending) return
                toast.success("Update success");
            } else {
                if(createContractMutation.isPending) return
                toast.success("Create success");
            }
            router.push("/admin/frachise/contract")
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
                        type="datetime-local"
                        className="form-control"
                        {...register("start_date", { valueAsDate: true })}
                        />
                    {errors.start_date && <p className="text-red-500">{errors.start_date.message}</p>}
                </div>
                <div className="mb-3 position-relative">
                    <label className="form-label form-label" htmlFor="first_name">
                        Contract Code <span className="text-red-500">*</span>
                    </label> 
                    <input
                        type="datetime-local"
                        className="form-control"
                        {...register("end_date", { valueAsDate: true })}
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
                        {...register("royalty_percent", { valueAsNumber: true })}
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
                        {...register("marketing_fee_percent", { valueAsNumber: true })}
                        />
                    {errors.marketing_fee_percent && <p className="text-red-500">{errors.marketing_fee_percent.message}</p>}
                </div>
                

                <div className="mb-3 position-relative">
                    <label className="form-label form-label" htmlFor="first_name">
                        Contract File Url <span className="text-red-500">*</span>
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
