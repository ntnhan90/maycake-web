'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { CreateOrderBodyType } from '@/models/product/orderModel';
import productApiRequest from "@/apiRequests/product/productApi";
import { mediaUrl } from "@/utils/lib";

type Attribute = {
  id: number;
  title: string;
  price: number;
  color?: string;
  image?: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  attributes: Attribute[];
};

type SelectedProduct = {
  product_id: number;
  name: string;
  qty: number;
  image: string;

  attributes: Attribute[];
};

type Props = {
  setValue: UseFormSetValue<CreateOrderBodyType>;

  onChangeSubtotal: (value: number) => void;
};

export default function ProductSelector({
  setValue,
  onChangeSubtotal,
}: Props) {
  const [open, setOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>(
    [],
  );

  const [selected, setSelected] = useState<
    SelectedProduct[]
  >([]);

  const wrapperRef = useRef<HTMLDivElement>(null);

  /* ================= FETCH PRODUCTS ================= */

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res =
          await productApiRequest.list({
            page: 1,
            limit: 50,
            order: 'DESC',
          });

        const mapped: Product[] =
          res.payload.data.map((item: any) => ({
            id: Number(item.id),

            name: item.name,

            price: Number(item.price),

            image: item.image,

            attributes:
              item.attributes || [],
          }));

        setProducts(mapped);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);

  /* ================= CLICK OUTSIDE ================= */

  useEffect(() => {
    const handleOutside = (
      e: MouseEvent,
    ) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          e.target as Node,
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleOutside,
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleOutside,
      );
    };
  }, []);

  /* ================= ADD PRODUCT ================= */

  function addProduct(product: Product) {
    const exists = selected.find(
      (x) =>
        x.product_id === product.id,
    );

    if (exists) {
      setOpen(false);
      return;
    }

    setSelected((prev) => [
      ...prev,
      {
        product_id: product.id,

        name: product.name,

        qty: 1,

        image: product.image,

        attributes:
          product.attributes || [],
      },
    ]);

    setOpen(false);
  }

  /* ================= UPDATE QTY ================= */

  function updateQty(
    productId: number,
    qty: number,
  ) {
    setSelected((prev) =>
      prev.map((item) =>
        item.product_id === productId
          ? {
              ...item,

              qty:
                qty < 1 ? 1 : qty,
            }
          : item,
      ),
    );
  }

  /* ================= REMOVE PRODUCT ================= */

  function removeProduct(
    productId: number,
  ) {
    setSelected((prev) =>
      prev.filter(
        (item) =>
          item.product_id !==
          productId,
      ),
    );
  }

  /* ================= SYNC FORM ================= */

  useEffect(() => {
    const payload = selected.flatMap(
      (product) =>
        product.attributes.map(
          (attr) => ({
            product_id:
              product.product_id,

            attribute_id: attr.id,

            price: attr.price,

            qty: product.qty,
          }),
        ),
    );

    setValue(
      'products',
      payload as any,
    );
  }, [selected, setValue]);

  /* ================= TOTAL ================= */

  const subTotal = useMemo(() => {
    return selected.reduce(
      (sum, product) => {
        const totalAttributePrice =
          product.attributes.reduce(
            (s, attr) =>
              s +
              Number(attr.price),
            0,
          );

        return (
          sum +
          totalAttributePrice *
            product.qty
        );
      },
      0,
    );
  }, [selected]);

  const prevSubRef =
    useRef<number>(0);

  useEffect(() => {
    if (
      subTotal !==
      prevSubRef.current
    ) {
      onChangeSubtotal(subTotal);

      setValue(
        'sub_amount',
        subTotal.toFixed(2) as any,
      );

      prevSubRef.current =
        subTotal;
    }
  }, [
    subTotal,
    onChangeSubtotal,
    setValue,
  ]);

  return (
    <div ref={wrapperRef}>
      <div className="card-body position-relative">
        {/* SEARCH INPUT */}

        <input
          className="form-control"
          placeholder="Search or select products"
          onFocus={() =>
            setOpen(true)
          }
        />

        {/* DROPDOWN */}

        {open && (
          <div
            className="position-absolute w-100 bg-white border rounded shadow-sm mt-2 z-3 overflow-auto"
            style={{
              maxHeight: 400,
            }}
          >
            {products.map(
              (product) => (
                <button
                  key={product.id}
                  type="button"
                  className="dropdown-item border-bottom p-2"
                  onClick={() =>
                    addProduct(
                      product,
                    )
                  }
                >
                  <div className="d-flex gap-2 align-items-start">
                    <img
                      src={mediaUrl(
                        product.image,
                      )}
                      width={50}
                      height={50}
                      alt={
                        product.name
                      }
                      className="rounded"
                    />

                    <div className="text-start">
                      <div className="fw-semibold">
                        {
                          product.name
                        }
                      </div>

                      {product
                        .attributes
                        .length >
                        0 && (
                        <div className="mt-1 d-flex flex-wrap gap-1">
                          {product.attributes.map(
                            (
                              attr,
                            ) => (
                              <span
                                key={
                                  attr.id
                                }
                                className="badge bg-light text-dark border"
                              >
                                {
                                  attr.title
                                }
                                {' - $'}
                                {Number(
                                  attr.price,
                                ).toFixed(
                                  2,
                                )}
                              </span>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ),
            )}
          </div>
        )}

        {/* TABLE */}

        {selected.length >
          0 && (
          <div className="table-responsive mt-3">
            <table className="table table-bordered align-middle">
              <thead>
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th>Attributes</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {selected.map(
                  (item) => {
                    const total =
                      item.attributes.reduce(
                        (
                          s,
                          attr,
                        ) =>
                          s +
                          Number(
                            attr.price,
                          ),
                        0,
                      ) *
                      item.qty;

                    return (
                      <tr
                        key={
                          item.product_id
                        }
                      >
                        <td>
                          <img
                            src={mediaUrl(
                              item.image,
                            )}
                            width={
                              50
                            }
                            alt={
                              item.name
                            }
                          />
                        </td>

                        <td>
                          <div className="fw-semibold text-primary">
                            { item.name }
                          </div>
                        </td>

                        <td>
                          <div className="d-flex flex-wrap gap-1">
                            {item.attributes.map(
                              (
                                attr,
                              ) => (
                                <span
                                  key={
                                    attr.id
                                  }
                                  className="badge bg-light text-dark border"
                                >
                                  {
                                    attr.title
                                  }
                                  {' - $'}
                                  {Number(
                                    attr.price,
                                  ).toFixed(
                                    2,
                                  )}
                                </span>
                              ),
                            )}
                          </div>
                        </td>

                        <td>
                          <input
                            type="number"
                            min={1}
                            className="form-control form-control-sm"
                            value={
                              item.qty
                            }
                            onChange={(
                              e,
                            ) =>
                              updateQty(
                                item.product_id,
                                Number(
                                  e
                                    .target
                                    .value,
                                ),
                              )
                            }
                          />
                        </td>

                        <td>
                          $
                          {total.toFixed(
                            2,
                          )}
                        </td>

                        <td className="text-center">
                          <button
                            type="button"
                            className="btn btn-link text-danger"
                            onClick={() =>
                              removeProduct(
                                item.product_id,
                              )
                            }
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>

            <div className="text-end fw-bold fs-5">
              Subtotal: $
              {subTotal.toFixed(
                2,
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}