'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'react-bootstrap';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import {CreateOrderBody,CreateOrderBodyType,} from '@/models/product/orderModel';
import ProductSelector from '@/components/input/productSelect';
import CustomerSelector2 from '@/components/input/customerSelector2';
import { handleErrorApi } from '@/utils/lib';
import {useCreateOrderMutation,useUpdateOrderMutation,} from '@/queries/useOrder';

type Props = {
  id?: number;
};

export default function OrderForm({ id }: Props) {
  const router = useRouter();
  const params = useParams();
  const isEdit = !!params?.id;

  const createOrderMutation = useCreateOrderMutation();
  const updateOrderMutation = useUpdateOrderMutation();

  /* ================= FORM ================= */
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm<CreateOrderBodyType>({
    resolver: zodResolver(CreateOrderBody),
    defaultValues: {
      customer_id: null,
      note: '',
      payment_method: 'cod',
      payment_status: 'pending',
      sub_amount: '0.00',
      tax_amount: '0.00',
      discount_amount: '0.00',
      total_amount: '0.00',
      products: [],
      status: 'pending',
    },
  });

  /* ================= WATCH MONEY (STRING → NUMBER) ================= */
  const sub = Number(watch('sub_amount') || 0);
  const tax = Number(watch('tax_amount') || 0);
  const discount = Number(watch('discount_amount') || 0);
  const total = Number(watch('total_amount') || 0);

  /* ================= CALCULATE TOTAL ================= */
  useEffect(() => {
    const t = sub + tax - discount;
    setValue('total_amount', (t > 0 ? t : 0).toFixed(2));
  }, [sub, tax, discount, setValue]);

  /* ================= SUBMIT ================= */
  const onSubmit = async (data: CreateOrderBodyType) => {
    try {
      if (isEdit && id) {
        await updateOrderMutation.mutateAsync({ id,  ...data });
        toast.success('Update order success');
      } else {
        if (createOrderMutation.isPending) return;
        await createOrderMutation.mutateAsync(data);
        toast.success('Create order success');
      }
      router.push("/admin/ecommerce/orders")
    } catch (error) {
      handleErrorApi({
        error,
        setError,
      });
    }
  };

  /* ================= RENDER ================= */
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
              {/* PRODUCT SELECTOR */}
              <ProductSelector
                setValue={setValue}
                onChangeSubtotal={(value) =>
                  setValue('sub_amount', value.toFixed(2))
                }
              />

              <div className="row mt-4">
                {/* NOTE */}
                <div className="col-sm-6">
                  <div className="mb-3">
                    <label className="form-label">Note</label>
                    <textarea
                      {...register('note')}
                      className="form-control"
                      rows={4}
                      placeholder="Note for order..."
                    />
                  </div>
                </div>

                {/* AMOUNT SUMMARY */}
                <div className="col-sm-6">
                  <table className="table table-borderless text-end">
                    <tbody>
                      <tr>
                        <td>Sub total</td>
                        <td>
                          <strong>${sub.toFixed(2)}</strong>
                        </td>
                      </tr>

                      <tr>
                        <td>Tax amount</td>
                        <td>
                          <strong>${tax.toFixed(2)}</strong>
                        </td>
                      </tr>

                      <tr>
                        <td>Promotion amount</td>
                        <td>
                          <strong>${discount.toFixed(2)}</strong>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          {!isEdit && (
                            <button
                              type="button"
                              className="btn btn-outline-primary btn-sm"
                              onClick={() =>
                                setValue('discount_amount', '50.00')
                              }
                            >
                              Add discount
                            </button>
                          )}
                        </td>
                        <td />
                      </tr>

                      <tr className="border-top">
                        <td>Total amount</td>
                        <td>
                          <strong>${total.toFixed(2)}</strong>
                        </td>
                      </tr>

                      {/* PAYMENT METHOD */}
                      <tr>
                        <td colSpan={2} className="pt-3">
                          <label className="form-label">
                            Payment method
                          </label>
                          <select
                            {...register('payment_method')}
                            className="form-select"
                          >
                            <option value="cod">
                              Cash on delivery (COD)
                            </option>
                            <option value="bank_transfer">
                              Bank transfer
                            </option>
                          </select>
                        </td>
                      </tr>

                      {/* PAYMENT STATUS */}
                      <tr>
                        <td colSpan={2}>
                          <label className="form-label">
                            Payment status
                          </label>
                          <select
                            {...register('payment_status')}
                            className="form-select"
                          >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="failed">Failed</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* SAVE */}
          <div className="mt-3">
            <Button type="submit" variant="primary" className="w-100">
              Save
            </Button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-lg-3">
          <CustomerSelector2 setValue={setValue} />
        </div>
      </div>
    </form>
  );
}