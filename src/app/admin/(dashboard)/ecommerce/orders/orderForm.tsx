'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateOrderBody, CreateOrderBodyType } from '@/models/product/orderModel';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { handleErrorApi } from "@/utils/lib";
import { useParams } from 'next/navigation';

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
    const params = useParams();
    const isEdit = !!params?.id;
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
                            <div className="mb-5">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-vcenter">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Product name</th>
                                                <th>Price</th>
                                                <th >Quantity</th>
                                                <th>Total</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <img width="50" src="https://shopwise.botble.com/storage/products/1-2-150x150.jpg" alt="Smart Home Speaker" />
                                                </td>
                                                <td>
                                                    <a target="_blank" href="https://shopwise.botble.com/admin/ecommerce/products/edit/1">Smart Home Speaker</a>
                                                    <p><small>(Color: Black, Size: XXL)</small></p>
                                                </td><td><span>$861.00</span></td>
                                                <td className="text-center">
                                                    <input className="form-control form-control-sm" type="number" min="1" value="1" />
                                                </td>
                                                <td>$861.00</td>
                                                <td className="text-center">
                                                    <a href="javascript:void(0)" className="text-decoration-none">
                                                        <span className="icon-tabler-wrapper icon-sm icon-left">
                                                            X
                                                        </span>
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="position-relative">
                                    <input
                                        className="form-control mb-3"
                                        placeholder="Search or create a new product"
                                    />
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="mb-3 position-relative">
                                        <label className="form-label" htmlFor="txt-note">Note</label>
                                        <textarea className="form-control textarea-auto-height" id="txt-note" rows={4} placeholder="Note for order..."></textarea>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <table className="table table-borderless text-end table-vcenter">
                                        <thead><tr><td></td><td width="120"></td></tr></thead>
                                        <tbody>
                                            <tr>
                                                <td>Sub amount</td>
                                                <td><span className="fw-bold">$861.00</span></td>
                                            </tr>
                                            <tr>
                                                <td>Tax amount</td>
                                                <td><span className="fw-bold">$0.00</span></td>
                                            </tr>
                                            <tr>
                                                <td>Promotion amount</td>
                                                <td><span className="fw-bold">$0.00</span></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    {isEdit ? (
                                                        <>Add discount</>
                                                    )  : (
                                                        <button type="button" className="btn btn-outline-primary btn-sm mb-1">
                                                            <i className="icon-sm ti ti-plus"></i> 
                                                        Add discount
                                                        </button>
                                                    )  }
                                                    
                                                </td>
                                                <td>
                                                    <span className="">$0.00</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Total amount</td>
                                                <td><span className="fw-bold">$0.00</span></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    <label htmlFor="payment-method" className="form-label">Payment method</label>
                                                    <select className="form-select" id="payment-method">
                                                        <option value="cod">Cash on delivery (COD)</option>
                                                        <option value="bank_transfer">Bank transfer</option>
                                                    </select>
                                                </td>
                                            </tr>
                                             <tr>
                                                <td colSpan={2}>
                                                    <label htmlFor="payment-method" className="form-label">Payment Statu</label>
                                                    <select className="form-select" id="payment-method">
                                                        <option value="cod">Pending</option>
                                                        <option value="bank_transfer">Completed</option>
                                                         <option value="bank_transfer">Canceled</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
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
                            <div className="position-relative box-search-advance customer">
                                <input
                                    className="form-control"
                                    placeholder="Search or create a new customer"
                                />
                            </div>
                            <div className="p-3">
                                <div className="mb-3">
                                    <img className="avatar avatar-lg avatar-rounded" src="https://shopwise.botble.com/storage/customers/7-150x150.jpg" alt="" />
                                </div>

                                <p className="mb-1">
                                    0 order(s)
                                </p>
                            
                                <p className="mb-1 fw-semibold">Caesar Kuhlman</p>

                                <p className="mb-1">
                                    <a href="mailto:welch.kelley@example.org">
                                        welch.kelley@example.org
                                    </a>
                                </p>
                            
                                <p className="mb-1">
                                    <a href="tel:+18508507634">
                                        +18508507634
                                    </a>
                                </p>
                            
                                <p className="mb-1">Have an account already</p>
                            </div>
                            <div className="hr my-1"></div>
                            <div className="p-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h4>Shipping information</h4>
                                </div>

                                <dl className="shipping-address-info mb-0">
                                    <dd>Caesar Kuhlman</dd>
                                    <dd>
                                        <a href="tel:+19318337736">
                                                <span dir="ltr">+19318337736</span>
                                        </a>
                                    </dd>

                                    <dd><a href="mailto:welch.kelley@example.org">welch.kelley@example.org</a></dd>
                                    <dd>7475 Feeney Isle Suite 378</dd>
                                    <dd>Port Ciara</dd>
                                    <dd>Maryland</dd>
                                    <dd>LC</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}