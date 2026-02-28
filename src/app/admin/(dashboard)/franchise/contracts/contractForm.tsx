'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardBody, CardHeader, Button ,Form} from "react-bootstrap";
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { CreateContractBody, CreateContractBodyType } from '@/models/franchise/contractModel';
import { handleErrorApi } from '@/utils/lib';
import { useCreateContactMutation, useUpdateContactMutation } from '@/queries/useContact';

type Props = {
  id?: number;
};

export default function ContractForm({ id }: Props) {
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
            franchiseId:1
        },
    });

    const onSubmit = async (data: CreateContractBodyType) => {
        try {
            if (  id) {
                
            } else {
                
            }
            //router.push("/admin/ecommerce/orders")
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
                <Card>
                    <CardBody>
                        <div className="mb-3 position-relative">
                            <label className="form-label form-label" htmlFor="first_name">
                                Name <span className="text-red-500">*</span>
                            </label> 
                            <input className="form-control " placeholder="Enter name"  {...register("contract_code")} />
                            {errors.contract_code && <p className="text-red-500">{errors.contract_code.message}</p>}
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
