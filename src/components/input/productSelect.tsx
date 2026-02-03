'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { CreateOrderBodyType } from '@/models/product/orderModel';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  option?: string;
};

type SelectedProduct = {
  product_id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
  option?: string;
};

type Props = {
    setValue: UseFormSetValue<CreateOrderBodyType>;
    onChangeSubtotal: (value: number) => void;
};

export default function ProductSelector({ setValue ,onChangeSubtotal}: Props) {
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [selected, setSelected] = useState<SelectedProduct[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    /* ================= MOCK API ================= */
    useEffect(() => {
        setProducts([
        {
            id: 1,
            name: 'Smart Home Speaker',
            price: 861,
            image:
            'https://shopwise.botble.com/storage/products/1-2-150x150.jpg',
            option: 'Color: Red, Size: S',
        },
        {
            id: 2,
            name: 'Wireless Headphones',
            price: 350,
            image:
            'https://shopwise.botble.com/storage/products/2-2-150x150.jpg',
        },
        {
            id: 3,
            name: 'Smart Watch Pro',
            price: 590,
            image:
            'https://shopwise.botble.com/storage/products/3-2-150x150.jpg',
        },
        ]);
    }, []);

    /* ================= CLICK OUTSIDE ================= */
    useEffect(() => {
        const handleOutside = (e: MouseEvent) => {
        if (
            wrapperRef.current &&
            !wrapperRef.current.contains(e.target as Node)
        ) {
            setOpen(false);
        }
        };
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, []);

  /* ================= SYNC TO FORM ================= */
    useEffect(() => {
        setValue(
        'products',
        selected.map(p => ({
            product_id: p.product_id,
            price: p.price,
            qty: p.qty,
        })),
        );
    }, [selected, setValue]);

    /* ================= ADD PRODUCT ================= */
    function addProduct(p: Product) {
        if (selected.find(x => x.product_id === p.id)) {
        setOpen(false);
        return;
        }

        setSelected(prev => [
        ...prev,
        {
            product_id: p.id,
            name: p.name,
            price: p.price,
            qty: 1,
            image: p.image,
            option: p.option,
        },
        ]);

        setOpen(false);
    }

    /* ================= UPDATE QTY ================= */
    function updateQty(id: number, qty: number) {
        setSelected(prev =>
        prev.map(p =>
            p.product_id === id
            ? { ...p, qty: qty < 1 ? 1 : qty }
            : p,
        ),
        );
    }

    /* ================= REMOVE ================= */
    function removeProduct(id: number) {
        setSelected(prev => prev.filter(p => p.product_id !== id));
    }

    /* ================= TOTAL ================= */
    const subTotal = useMemo(
        () => selected.reduce((s, p) => s + p.qty * p.price, 0),
        [selected],
    );

    const prevSubRef = useRef<number>(0);

    useEffect(() => {
        if (subTotal !== prevSubRef.current) {
            // gửi number cho UI
            onChangeSubtotal(subTotal);

            // gửi string cho react-hook-form (BE)
            setValue('sub_amount', subTotal.toFixed(2) as any);

            prevSubRef.current = subTotal;
        }
    }, [subTotal, onChangeSubtotal, setValue]);

    return (
        <div ref={wrapperRef} className="">
            <div className="card-body position-relative">
                {/* SEARCH INPUT 
                 {selected.length === 0 && (*/}
                <input
                    className="form-control"
                    placeholder="Search or select products"
                    onFocus={() => setOpen(true)}
                />
              {/* )}(*/}

                    {/* DROPDOWN */}
                {open && (
                    <div className="dropdown-list position-absolute w-100 bg-white border rounded shadow-sm mt-2 z-3">
                        {products.map(p => (
                        <button
                            key={p.id}
                            type="button"
                            className="dropdown-item d-flex align-items-center gap-2"
                            onClick={() => addProduct(p)}
                        >
                            <img src={p.image} width={40} height={40} />
                            <div className="text-start">
                            <div className="fw-semibold">{p.name}</div>
                            <small className="text-muted">
                                ${p.price.toFixed(2)}
                            </small>
                            </div>
                        </button>
                        ))}
                    </div>
                    )}

                {/* TABLE SELECTED PRODUCTS */}
                {selected.length > 0 && (
                <div className="table-responsive mt-3">
                    <table className="table table-bordered align-middle">
                    <thead>
                        <tr>
                        <th></th>
                        <th>Product name</th>
                        <th>Price</th>
                        <th style={{ width: 120 }}>Quantity</th>
                        <th>Total</th>
                        <th style={{ width: 60 }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {selected.map(p => (
                        <tr key={p.product_id}>
                            <td>
                                <img src={p.image} width={50} />
                            </td>
                            <td>
                                <strong className="text-primary">{p.name}</strong>
                                {p.option && (
                                    <div className="text-muted small">
                                    ({p.option})
                                    </div>
                                )}
                            </td>
                            <td>${p.price.toFixed(2)}</td>
                            <td>
                            <input
                                type="number"
                                min={1}
                                className="form-control form-control-sm"
                                value={p.qty}
                                onChange={e =>
                                updateQty(
                                    p.product_id,
                                    Number(e.target.value),
                                )
                                }
                            />
                            </td>
                            <td>${(p.qty * p.price).toFixed(2)}</td>
                            <td className="text-center">
                            <button
                                type="button"
                                className="btn btn-link text-danger"
                                onClick={() => removeProduct(p.product_id)}
                            >
                                ✕
                            </button>
                            </td>
                        </tr>
                        ))}

                      
                    </tbody>
                    </table>

                </div>
                )}
            </div>
        </div>
  );
}