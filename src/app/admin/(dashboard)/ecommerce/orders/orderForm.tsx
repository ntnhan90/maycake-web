'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateOrderBody, CreateOrderBodyType } from '@/models/product/orderModel';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { handleErrorApi } from "@/utils/lib";

type Props = {
    id? : number
}
/* =======================
   HELPERS
======================= */
function SummaryRow({
  label,
  value,
  bold,
}: {
  label: string;
  value: number;
  bold?: boolean;
}) {
  return (
    <div className="d-flex justify-content-between mb-2">
      <span className={bold ? 'fw-semibold' : ''}>{label}</span>
      <strong>${value.toFixed(2)}</strong>
    </div>
  );
}

export default function OrderForm({id}: Props) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<CreateOrderBodyType>({
        resolver: zodResolver(CreateOrderBody),
        defaultValues: {
            customer_id: null,
            note: '',

            payment_method: 'cod',
            payment_status: 'pending',
            sub_amount: 0,
            tax_amount: 0,
            discount_amount: 0,
            total_amount: 0,
        },
    });

    const sub = watch('sub_amount');
    const tax = watch('tax_amount');
    const discount = watch('discount_amount');
    
    useEffect(() => {
        const total = sub + tax - discount;
        setValue('total_amount', total >= 0 ? total : 0);
    }, [sub, tax, discount, setValue]);

    const onSubmit = (data: CreateOrderBodyType) => {
        console.log('CREATE ORDER:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-4">
                {/* LEFT */}
                <div className="col-lg-9">
                <div className="card">
                    <div className="card-header fw-semibold">
                    Order information
                    </div>

                    <div className="card-body">
                    {/* Product search */}
                    <input
                        className="form-control mb-3"
                        placeholder="Search or create a new product"
                    />

                    {/* Note */}
                    <label className="form-label">Note</label>
                    <textarea
                        className="form-control mb-4"
                        rows={3}
                        placeholder="Note for order..."
                        {...register('note')}
                    />

                    {/* SUMMARY */}
                    <div className="mb-4">
                        <SummaryRow label="Sub amount" value={sub} />
                        <SummaryRow label="Tax amount" value={tax} />

                        <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>Promotion amount</span>
                        <div className="d-flex align-items-center gap-2">
                            <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            >
                            Add discount
                            </button>
                            <strong>${discount.toFixed(2)}</strong>
                        </div>
                        </div>

                        <hr />

                        <SummaryRow
                        label="Total amount"
                        value={watch('total_amount')}
                        bold
                        />

                        {/* hidden fields */}
                        <input
                        type="hidden"
                        {...register('sub_amount', { valueAsNumber: true })}
                        />
                        <input
                        type="hidden"
                        {...register('tax_amount', { valueAsNumber: true })}
                        />
                        <input
                        type="hidden"
                        {...register('discount_amount', {
                            valueAsNumber: true,
                        })}
                        />
                        <input
                        type="hidden"
                        {...register('total_amount', {
                            valueAsNumber: true,
                        })}
                        />
                    </div>

                    {/* PAYMENT */}
                    <div className="mb-3">
                        <label className="form-label">Payment method</label>
                        <select
                        className="form-select"
                        {...register('payment_method')}
                        >
                        <option value="cod">Cash on delivery (COD)</option>
                        <option value="bank_transfer">Bank transfer</option>
                        <option value="online">Online payment</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Payment status</label>
                        <select
                        className="form-select"
                        {...register('payment_status')}
                        >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="failed">Failed</option>
                        </select>
                    </div>

                    
                    </div>
                </div>
                </div>

                {/* RIGHT */}
                <div className="col-lg-3">
                <div className="card">
                    <div className="card-header fw-semibold">
                    Customer information
                    </div>
                    <div className="card-body">
                    <input
                        className="form-control"
                        placeholder="Search or create a new customer"
                    />
                    </div>
                </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="card mt-4">
                <div className="card-body d-flex justify-content-between align-items-center">
                <div className="fw-semibold">
                    CONFIRM PAYMENT AND CREATE ORDER
                </div>
                <button type="submit" className="btn btn-primary">
                    Create order
                </button>
                </div>
            </div>
        </form>
    );
}