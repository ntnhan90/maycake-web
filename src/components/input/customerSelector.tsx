'use client'

import { useEffect, useRef, useState } from "react"
import {} from "react-bootstrap-icons"
type Customer ={
    id: number;
    name: string;
    email: string;
    avatar?: string;
    createdAt: string;
}

export default function CustomerSelector() {
    const [open , setOpen]  = useState(false);
    const [keyword, setKeyword] = useState('');
    const [customers, setCustomers ] = useState<Customer[]>([]);
    const [page, setPage] = useState(1)
    const [selected, setSelected] = useState<Customer | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    /* ================= MOCK API ================= */
    async function fetchCustomers() {
        const mock: Customer[] = [
        {
            id: 1,
            name: 'John Smith',
            email: 'customer@botble.com',
            createdAt: '2025-01-01',
        },
        {
            id: 2,
            name: 'Customer 1',
            email: 'customer1@botble.com',
            createdAt: '2025-01-03',
        },
        {
            id: 3,
            name: 'Customer 2',
            email: 'customer2@botble.com',
            createdAt: '2025-01-05',
        },
        ];

        const filtered = mock .filter(c =>
            `${c.name} ${c.email}`.toLowerCase().includes(keyword.toLowerCase()),
        ).sort(  (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime(),
        );

        setCustomers(filtered);
    }

    /* ================= EFFECT ================= */
    useEffect(() => {
        if(open) fetchCustomers();
    },[open, keyword, page]);

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
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    /* ================= HANDLERS ================= */
    function selectCustomer(c: Customer){
        setSelected(c)
        setOpen(false)
    }

    return(
        <div className="position-relative" ref={wrapperRef}>
            <div className="card">
                <div className="card-header fw-semibold">
                    Customer information
                </div>
            </div>

            {/* INPUT */}
            <input
                type="text"
                className="form-control"
                placeholder="Search or create a new customer"
                value={selected ? selected.name : keyword}
                onFocus={() => setOpen(true)}
                onChange={e => {
                setKeyword(e.target.value);
                setSelected(null);
                }}
            />

            {/* DROPDOWN */}
            {open && (
                <div className="dropdown-menu show w-100 mt-1 p-0 shadow">
                    <button className="dropdown-item d-flex align-item-center gap-2">
                        Create new customer
                    </button>
                    <div className="dropdown-divider" />
                    {customers.length === 0 && (
                        <div className="px-3 py-3 text-muted small">
                        No customer found
                        </div>
                    )}

                    {customers.map(c => (
                        <button
                        key={c.id}
                        className="dropdown-item d-flex align-items-center gap-3"
                        onClick={() => selectCustomer(c)}
                        >
                            <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                                style={{ width: 32, height: 32 }}>
                            </div>
                            <div className="text-start">
                                <div className="fw-medium">{c.name}</div>
                                <small className="text-muted">{c.email}</small> 
                            </div>
                        </button>
                    ))}

                    {/* PAGINATION */}
                    <div className="d-flex justify-content-end gap-2 px-3 py-2"> 
                        <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                        >
                            ‹
                        </button>
                        <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => setPage(p => p + 1)}
                        >
                            ›
                        </button>
                    </div>
                </div>
            )}

            {/* SELECTED CUSTOMER */}
            {selected && (
                <div className="card mt-3">
                     <div className="card-body p-2">
                        <div className="fw-semibold">{selected.name}</div>
                        <div className="text-muted small">{selected.email}</div>
                    </div>
                </div>
            )}

            {/* MODAL */}
            {showCreateModal && (
                <CreateCustomerModal 
                    onClose={() => setShowCreateModal(false)}
                    onCreated={customers => {
                        setSelected(customers);
                        setShowCreateModal(false);
                    }}
                />
            )}
        </div>
    )
}

function CreateCustomerModal({
    onClose,
    onCreated,
}: {
  onClose: () => void;
  onCreated: (c: Customer) => void;
}) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    function submit1() {
        onCreated({
            id: Date.now(),
            name,
            email,
            createdAt: new Date().toISOString(),
        });
    }
    return(
        <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Create new customer</h5>
                    <button className="btn-close" onClick={onClose} />
                </div>

                <div className="modal-body">
                    <input
                    className="form-control mb-2"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    <input
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="modal-footer">
                    <button className="btn btn-light" onClick={onClose}>
                    Cancel
                    </button>
                    <button className="btn btn-primary" onClick={submit1}>
                    Create
                    </button>
                </div>
                </div>
            </div>
        </div>
    )
}