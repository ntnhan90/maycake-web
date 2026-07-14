'use client';

import { useEffect, useMemo, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { CreateOrderBodyType } from '@/models/product/orderModel';
import productApiRequest from '@/apiRequests/product/productApi';

import ShapeTab from '../tabs/ShapeTab';
import FlavorTab from "../tabs/FlavorTab";
import ToppingTab from "../tabs/ToppingTab";
import ColorTab from "../tabs/ColorTab";
import CustomerTab from "../tabs/CustomerTab";
/* ================= TYPES ================= */

type Attribute = {
  id: number;
  title: string;
  price: number;
  attributeSet: {
    id: number;
    name: string;
  };
};

type Product = {
  id: number;
  name: string;
  image: string | null;
  attributes: Attribute[];
};

type SelectedGroup = {
  groupId: number;
  groupName: string;
  selected: Attribute;
  options: Attribute[];
};

type SelectedProduct = {
  productId: number;
  name: string;
  qty: number;
  groups: SelectedGroup[];
};

type Props = {
  setValue: UseFormSetValue<CreateOrderBodyType>;
  setColor: (color: string) => void;
};

/* ================= COMPONENT ================= */

export default function ProductSelector({ setValue,setColor }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<SelectedProduct[]>([]);
  const [tab, setTab] = useState("size");
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  /* ================= FETCH PRODUCTS ================= */

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await productApiRequest.list({
          page: 1,
          limit: 50,
          order: 'DESC',
        });

        const list: Product[] = (res.payload.data || []).map((p: any) => ({
          id: p.id,
          name: p.name,
          image: p.image ?? null,
          attributes: (p.attributes || []).map((a: any) => ({
            id: a.id,
            title: a.title,
            price: Number(a.price || 0),
            attributeSet: {
              id: a.attributeSet?.id ?? 0,
              name: a.attributeSet?.name ?? 'Unknown',
            },
          })),
        }));

        setProducts(list);
      } catch (err) {
        console.error('Product fetch error:', err);
      }
    }

    fetchProducts();
  }, []);

  /* ================= FILTER SEARCH ================= */

  const filteredProducts = useMemo(() => {
    if (!search) return products;

    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  /* ================= ADD PRODUCT ================= */

  function addProduct(product: Product) {
    setSelected((prev) => {
      if (prev.some((p) => p.productId === product.id)) return prev;

      const groupsMap: Record<number, SelectedGroup> = {};

      product.attributes.forEach((attr) => {
        const gid = attr.attributeSet.id;

        if (!groupsMap[gid]) {
          groupsMap[gid] = {
            groupId: gid,
            groupName: attr.attributeSet.name,
            options: [],
            selected: attr,
          };
        }

        groupsMap[gid].options.push(attr);
      });

      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          qty: 1,
          groups: Object.values(groupsMap),
        },
      ];
    });
  }

  function removeProduct(productId: number) {
    setSelected((prev) =>{
      const next = prev.filter((p) => p.productId !== productId);
      return next;
    });
  }
  /* ================= CHANGE ATTRIBUTE ================= */

  function changeOption(
    productId: number,
    groupId: number,
    attrId: number
  ) {
    setSelected((prev) =>
      prev.map((p) => {
        if (p.productId !== productId) return p;

        return {
          ...p,
          groups: p.groups.map((g) =>
            g.groupId !== groupId
              ? g
              : {
                  ...g,
                  selected:
                    g.options.find((o) => o.id === attrId)!,
                }
          ),
        };
      })
    );
  }

  /* ================= TOTAL ================= */

  const subTotal = useMemo(() => {
    return selected.reduce((sum, p) => {
      const productTotal =
        p.groups.reduce((s, g) => s + g.selected.price, 0) * p.qty;

      return sum + productTotal;
    }, 0);
  }, [selected]);

  /* ================= SYNC FORM ================= */

  useEffect(() => {
    const payload = selected.flatMap((p) =>
      p.groups.map((g) => ({
        product_id: p.productId,
        attribute_id: g.selected.id,
        qty: p.qty,
        price: g.selected.price,
      }))
    );

    setValue('products', payload as any);
    setValue('sub_amount', subTotal.toFixed(2));
  }, [selected, subTotal, setValue]);

  /* ================= UI ================= */

  return (
    <div className="card">
      <div className="card-header">Products</div>
      <div className="card-body">
        <div className="mb-3 position-relative" onClick={(e) => e.stopPropagation()} >
          <input
            className="form-control"
            placeholder="Search product..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
          />

          {open && filteredProducts.length > 0 && (
            <div
              className="border rounded bg-white position-absolute w-100 mt-1 shadow-sm"
              style={{
                zIndex: 1000,
                maxHeight: 250,
                overflowY: 'auto',
              }}
            >
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="px-3 py-2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    addProduct(p);
                    setSearch('');
                    setOpen(false);
                  }}
                >
                  {p.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {selected.map((p) => {
          const shapeGroup = p.groups.find((g) => g.groupId === 1);
          const flavorGroup = p.groups.find((g) => g.groupId === 2);
          const colorGroup = p.groups.find((g) => g.groupId === 3);
          const toppingGroup = p.groups.find((g) => g.groupId === 4);

          return (
            <div key={p.productId}>
              <div>
                <span>{p.name}</span>

                <div>
                  {p.groups.map((g) => (
                    <span key={g.groupId} className="mb-2">
                      <div className="fw-bold">{g.groupName}</div>
                      <div>
                        {g.selected.title}
                      </div>
                    </span>
                  ))}
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger ms-2"
                    onClick={() => removeProduct(p.productId)}
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="attributes">
                <div className="d-flex">
                  <div
                    className={`config-tab ${tab === "size" ? "active" : ""}`}
                    onClick={() => setTab("size")}
                  >
                    Shape
                  </div>

                  <div
                    className={`config-tab ${tab === "flavor" ? "active" : ""}`}
                    onClick={() => setTab("flavor")}
                  >
                    FLAVOR
                  </div>

                  <div
                    className={`config-tab ${tab === "color" ? "active" : ""}`}
                    onClick={() => setTab("color")}
                  >
                    COLOR
                  </div>

                  <div
                    className={`config-tab ${tab === "topping" ? "active" : ""}`}
                    onClick={() => setTab("topping")}
                  >
                    TOPPINGS
                  </div>

                  <div
                    className={`config-tab ${tab === "customer" ? "active" : ""}`}
                    onClick={() => setTab("customer")}
                  >
                    CUSTOMER
                  </div>
                </div>

                <div className="mt-4">
                  {tab === "size" && (
                    <ShapeTab id={1} attr_id={shapeGroup?.selected.id} />
                  )}

                  {tab === "flavor" && (
                    <FlavorTab id={2} attr_id={flavorGroup?.selected.id}  />
                  )}

                  {tab === "color" && (
                    <ColorTab id={3} attr_id={colorGroup?.selected.id} setColor={setColor}/>
                  )}

                  {tab === "topping" && (
                    <ToppingTab id={4} attr_id={toppingGroup?.selected.id} />
                  )}

                  {tab === "customer" && <CustomerTab />}
                </div>
              </div>
            </div>
          );
        })}
        <div className="text-end fw-bold">
            Subtotal: ${subTotal.toFixed(2)}
        </div>
      </div>
    </div>
  );
}