'use client';

import { useEffect, useRef, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { CreateOrderBodyType } from '@/models/product/orderModel';
import customerApiRequest from '@/apiRequests/customerApi';

type Address = {
  id: number;
  name: string;
  phone: string;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  address: string;
  zip_code?: string | null;
  is_default: boolean;
};

type Customer = {
  id: number;
  name: string;
  email: string;
  avatar?: string | number | null;
  phone?: string;
  status?: string;
  addresses: Address[];
};

type Props = {
  setValue: UseFormSetValue<CreateOrderBodyType>;
};

export default function CustomerSelector({
  setValue,
}: Props) {
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selected, setSelected] =useState<Customer | null>(null);
  const wrapperRef =useRef<HTMLDivElement>(null);

  /* ================= FETCH CUSTOMERS ================= */
  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res =
          await customerApiRequest.list({
            page: 1,
            limit: 50,
          });

        setCustomers(
          res.payload.data || [],
        );
      } catch (error) {
        console.error(error);
      }
    }

    fetchCustomers();
  }, []);

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    function handleClickOutside(
      e: MouseEvent,
    ) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          e.target as Node,
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside,
    );

    return () =>
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      );
  }, []);

  /* ================= SELECT CUSTOMER ================= */

  function selectCustomer(
    customer: Customer,
  ) {
    setSelected(customer);
    setOpen(false);

    const defaultAddress =
      customer.addresses?.find(
        (addr) =>
          Number(addr.is_default) === 1,
      );

    setValue('customer_id',customer.id,);

    // auto set address mặc định
    if (defaultAddress) {
      setValue('address.address',defaultAddress.address, );
      setValue('address.name',defaultAddress.name,);
      setValue('address.phone',defaultAddress.phone,);
      setValue('address.city',defaultAddress.city || '',);
      setValue('address.state',defaultAddress.state || '',);
      setValue('address.country',defaultAddress.country || '',);
      setValue('address.zip_code',defaultAddress.zip_code || '',);
    }
  }

  /* ================= CLEAR ================= */
  function clearSelected() {
    setSelected(null);
    setValue('customer_id', null as any,);
  }

  /* ================= RENDER ================= */
  return (
    <>
      <input type="hidden"  value={ selected?.id || ''} />

      <div className="card"  ref={wrapperRef} >
        <div className="card-header fw-semibold">
          Customer information
        </div>

        <div className="card-body position-relative">
          {!selected && (
            <input
              type="text"
              className="form-control"
              placeholder="Search customer"
              onFocus={() =>
                setOpen(true)
              }
            />
          )}

          {open && !selected && (
            <div className="border rounded bg-white shadow-sm position-absolute w-100 mt-2 z-3 overflow-auto">
              {customers.map(
                (customer) => {
                  const defaultAddress =
                    customer.addresses?.find(
                      (
                        addr,
                      ) =>
                        Number(
                          addr.is_default,
                        ) === 1,
                    );

                  return (
                    <button
                      key={
                        customer.id
                      }
                      className="dropdown-item d-flex align-items-start gap-2 py-3"
                      type="button"
                      onClick={() =>
                        selectCustomer(
                          customer,
                        )
                      }
                    >
                      <div
                        className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
                        style={{
                          width: 36,
                          height: 36,
                          minWidth: 36,
                        }}
                      >
                        👤
                      </div>

                      <div className="text-start">
                        <div className="fw-semibold">
                          {
                            customer.name
                          }
                        </div>

                        <div className="small text-muted">
                          {
                            customer.email
                          }
                        </div>

                        {customer.phone && (
                          <div className="small text-muted">
                            {
                              customer.phone
                            }
                          </div>
                        )}

                        {defaultAddress && (
                          <div className="small text-primary mt-1">
                            Default
                            address:{' '}
                            {
                              defaultAddress.address
                            }
                          </div>
                        )}
                      </div>
                    </button>
                  );
                },
              )}
            </div>
          )}

          {/* SELECTED */}

          {selected && (
            <div className="border rounded px-3 py-3 bg-light d-flex justify-content-between align-items-start mt-2">
              <div>
                <div className="fw-semibold">
                  {selected.name}
                </div>

                <div className="small text-muted">
                  {selected.email}
                </div>

                {selected.phone && (
                  <div className="small text-muted">
                    {selected.phone}
                  </div>
                )}

                {selected.addresses?.find(
                  (a) =>
                    Number(
                      a.is_default,
                    ) === 1,
                ) && (
                  <div className="small text-primary mt-2">
                    {
                      selected.addresses.find(
                        (
                          a,
                        ) =>
                          Number(
                            a.is_default,
                          ) === 1,
                      )?.address
                    }
                  </div>
                )}
              </div>

              <button
                className="btn btn-sm btn-outline-secondary"
                type="button"
                onClick={
                  clearSelected
                }
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}