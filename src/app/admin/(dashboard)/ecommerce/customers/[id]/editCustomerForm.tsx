"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateCustomerMutation, useGetCustomerQuery } from "@/queries/useCustomer";
import { useRouter } from "next/navigation";
import { Card, CardBody, Modal, CardHeader, Button, Form } from "react-bootstrap";
import { UpdateCustomerBody, UpdateCustomerBodyType } from "@/models/product/customerModel";
import { useState, useEffect } from "react";
import { toDatetimeLocal, handleErrorApi } from "@/utils/lib";
import { toast } from "react-toastify";

/* ================= TYPES ================= */

export type AddressFormValues = {
    id?: number;
    address: string;
    country?: string;
    state?: string;
    city?: string;
    zip_code?: string;
    is_default?: boolean;
};

/* ================= ADDRESS MODAL ================= */

type AddressModalProps = {
    show: boolean;
    initialData: AddressFormValues | null;
    onClose: () => void;
    onSubmit: (data: AddressFormValues) => void;
};

function AddressModal({
    show,
    initialData,
    onClose,
    onSubmit,
}: AddressModalProps) {
    const { register, handleSubmit, reset } = useForm<AddressFormValues>({
        defaultValues: {
            address: "",
            country: "",
            state: "",
            city: "",
            zip_code: "",
            is_default: false,
        },
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        } else {
            reset({
                address: "",
                country: "",
                state: "",
                city: "",
                zip_code: "",
                is_default: false,
            });
        }
    }, [initialData, reset]);

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {initialData ? "Edit address" : "New address"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="mb-2">
                    <label className="form-label">Address</label>
                    <input className="form-control" {...register("address")} />
                </div>

                <div className="mb-2">
                    <label className="form-label">Country</label>
                    <input className="form-control" {...register("country")} />
                </div>

                <div className="mb-2">
                    <label className="form-label">State</label>
                    <input className="form-control" {...register("state")} />
                </div>

                <div className="mb-2">
                    <label className="form-label">City</label>
                    <input className="form-control" {...register("city")} />
                </div>

                <div className="mb-2">
                    <label className="form-label">Zip code</label>
                    <input className="form-control" {...register("zip_code")} />
                </div>

                <label className="d-flex gap-2 align-items-center mt-2">
                    <input type="checkbox" {...register("is_default")} />
                    Default address
                </label>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

/* ================= MAIN FORM ================= */

export default function EditCustomerForm({ id }: { id?: number }) {
    const router = useRouter();
    const customerId = id ? Number(id) : 0;

    const updateCustomerMutation = useUpdateCustomerMutation();
    const customerQuery = useGetCustomerQuery(customerId);
    const customerData = customerQuery.data?.payload;

    const [addresses, setAddresses] = useState<AddressFormValues[]>([]);
    const [editingAddress, setEditingAddress] = useState<AddressFormValues | null>(null);
    const [showAddressModal, setShowAddressModal] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<UpdateCustomerBodyType>({
        resolver: zodResolver(UpdateCustomerBody),
    });

    /* ================= LOAD CUSTOMER ================= */

    useEffect(() => {
        if (!customerData) return;

        reset({
            name: customerData.name ?? "",
            email: customerData.email ?? "",
            phone: customerData.phone ?? "",
            dob: customerData.dob
                ? toDatetimeLocal(new Date(customerData.dob))
                : undefined,
            status: customerData.status ?? "activated",
        });

        setAddresses(
            customerData.addresses?.map((a: any) => ({
                id: a.id,
                address: a.address,
                country: a.country,
                state: a.state,
                city: a.city,
                zip_code: a.zip_code,
                is_default: !!a.is_default,
            })) ?? []
        );
    }, [customerData, reset]);

    /* ================= SUBMIT ================= */

    const onSubmit = async (data: UpdateCustomerBodyType) => {
        if (!id || updateCustomerMutation.isPending) return;

        const addressPayload = addresses.map(a => ({
            ...(a.id ? { id: a.id } : {}),
            name: data.name,
            phone: data.phone,
            address: a.address,
            country: a.country,
            state: a.state,
            city: a.city,
            zip_code: a.zip_code,
            is_default: a.is_default ? 1 : 0,
        }));

        const payload = {
            id,
            name: data.name,
            phone: data.phone,
            status: data.status,
            dob: data.dob ? new Date(data.dob) : undefined,
            ...(data.password ? { password: data.password } : {}),
            addresses: addressPayload,
        };

        try {
            await updateCustomerMutation.mutateAsync(payload);
            toast.success("Update customer successfully 🎉");
            router.push("/admin/ecommerce/customers");
        } catch (error) {
            toast.error("Update failed ❌");
            handleErrorApi({ error, setError });
        }
    };

    /* ================= RENDER ================= */

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="row">
            <div className="col-md-9">
                <Card>
                    <CardBody>
                        <div className="row row-cols-lg-2">
                            <div className="mb-3">
                                <label className="form-label">Name *</label>
                                <input className="form-control" {...register("name")} />
                                {errors.name && <p className="text-danger">{errors.name.message}</p>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input className="form-control" {...register("email")} disabled />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Phone *</label>
                                <input
                                    className="form-control"
                                    {...register("phone", {
                                        setValueAs: v => v.replace(/\D/g, ""),
                                    })}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Date of birth</label>
                                <input type="datetime-local" className="form-control" {...register("dob")} />
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* ADDRESSES */}
                <Card className="mt-3">
                    <CardHeader className="d-flex justify-content-between">
                        <h5>Addresses</h5>
                        <Button
                            onClick={() => {
                                setEditingAddress(null);
                                setShowAddressModal(true);
                            }}
                        >
                            + New address
                        </Button>
                    </CardHeader>

                    <CardBody>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Address</th>
                                    <th>Country</th>
                                    <th>State</th>
                                    <th>City</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {addresses.map((a, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{a.address}</td>
                                        <td>{a.country}</td>
                                        <td>{a.state}</td>
                                        <td>{a.city}</td>
                                        <td>
                                            <Button
                                                size="sm"
                                                onClick={() => {
                                                    setEditingAddress(a);
                                                    setShowAddressModal(true);
                                                }}
                                            >
                                                ✏️
                                            </Button>{" "}
                                            <Button
                                                size="sm"
                                                variant="danger"
                                                onClick={() =>
                                                    setAddresses(prev =>
                                                        prev.filter((_, idx) => idx !== i)
                                                    )
                                                }
                                            >
                                                🗑
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </div>

            <div className="col-md-3">
                <Card>
                    <CardBody>
                        <Button type="submit" className="w-100">
                            Save
                        </Button>
                    </CardBody>
                </Card>

                <Card className="mt-3">
                    <CardBody>
                        <Form.Select {...register("status")}>
                            <option value="activated">Activated</option>
                            <option value="draft">Draft</option>
                        </Form.Select>
                    </CardBody>
                </Card>
            </div>

            <AddressModal
                show={showAddressModal}
                initialData={editingAddress}
                onClose={() => setShowAddressModal(false)}
                onSubmit={(data) => {
                    setAddresses(prev => {
                        if (data.id) {
                            return prev.map(a => (a.id === data.id ? data : a));
                        }
                        return [...prev, data];
                    });
                    setEditingAddress(null);
                    setShowAddressModal(false);
                }}
            />
        </form>
    );
}