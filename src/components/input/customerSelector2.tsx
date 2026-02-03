'use client';

import { useEffect, useRef, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { CreateOrderBodyType } from '@/models/product/orderModel';

type Customer = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    createdAt: string;
};

type Props = {
    setValue: UseFormSetValue<CreateOrderBodyType>;
};

export default function CustomerSelector({ setValue }: Props) {
    const [open, setOpen] = useState(false);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selected, setSelected] = useState<Customer | null>(null);

    const wrapperRef = useRef<HTMLDivElement>(null);

    /* MOCK API */
    useEffect(() => {
        const mock: Customer[] = [
        {
            id: 1,
            name: 'John Smith',
            email: 'john@example.com',
            createdAt: '2025-02-10',
        },
        {
            id: 2,
            name: 'Jane Doe',
            email: 'jane@example.com',
            createdAt: '2025-01-15',
        },
        ];
        setCustomers(
        mock.sort(
            (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        )
        );
    }, []);

    /* Close dropdown when click outside */
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
        if (
            wrapperRef.current &&
            !wrapperRef.current.contains(e.target as Node)
        ) {
            setOpen(false);
        }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    /* Select a customer */
    function selectCustomer(c: Customer) {
        setSelected(c);
        setOpen(false);
        setValue('customer_id', c.id);
    }

    /* Clear selected */
    function clearSelected() {
        setSelected(null);
        setValue('customer_id', null);
    }

    return (
        <>
        {/* Hidden input */}
        <input
            type="hidden"
            {...{ name: 'customer_id' }}
            value={selected?.id ?? ''}
        />

        <div className="card" ref={wrapperRef}>
            <div className="card-header fw-semibold">
            Customer information
            </div>

            <div className="card-body position-relative">
            {/* show input only when no selection */}
            {!selected && (
                <input
                type="text"
                className="form-control"
                placeholder="Search or create a new customer"
                onFocus={() => setOpen(true)}
                />
            )}

            {/* dropdown */}
            {open && !selected && (
                <div className="border rounded bg-white shadow-sm position-absolute w-100 mt-2 z-3">
                <button
                    className="dropdown-item text-primary fw-semibold"
                    type="button"
                >
                    ➕ Create new customer
                </button>

                <div className="dropdown-divider"></div>

                {customers.map((c) => (
                    <button
                    key={c.id}
                    className="dropdown-item d-flex align-items-center gap-2"
                    type="button"
                    onClick={() => selectCustomer(c)}
                    >
                    <div className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
                        style={{ width: 32, height: 32 }}>
                        👤
                    </div>
                    <div className="text-start">
                        <div className="fw-semibold">{c.name}</div>
                        <small className="text-muted">{c.email}</small>
                    </div>
                    </button>
                ))}
                </div>
            )}

            {/* selected info */}
            {selected && (
                <div className="mt-2 border rounded px-3 py-2 bg-light d-flex justify-content-between align-items-center">
                <div>
                    <div className="fw-semibold">{selected.name}</div>
                    <div className="text-muted small">{selected.email}</div>
                </div>
                <button
                    className="btn btn-sm btn-outline-secondary"
                    type="button"
                    onClick={clearSelected}
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