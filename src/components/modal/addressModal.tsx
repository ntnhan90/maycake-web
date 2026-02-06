"use client";

import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

/* ================= TYPES ================= */

export type AddressFormValues = {
  id?: number;
  address: string;
  country?: string;
  state?: string;
  city?: string;
  zip_code?: string;
  is_default?: boolean;
  customer_id: number;
};

type AddressModalProps = {
  show: boolean;
  customerId: number;
  initialData: AddressFormValues | null;
  onClose: () => void;
  onSubmit: (data: AddressFormValues) => void;
};

/* ================= COMPONENT ================= */

export default function AddressModal({
  show,
  customerId,
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
      customer_id: customerId,
    },
  });

  /* ================= LOAD EDIT DATA ================= */
  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        customer_id: customerId, // 🔥 đảm bảo luôn đúng
      });
    } else {
      reset({
        address: "",
        country: "",
        state: "",
        city: "",
        zip_code: "",
        is_default: false,
        customer_id: customerId,
      });
    }
  }, [initialData, customerId, reset]);

  /* ================= RENDER ================= */
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
          <input
            className="form-control"
            {...register("address", { required: true })}
          />
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

        <Button
          variant="primary"
          onClick={handleSubmit((data) => {
            onSubmit({
              ...data,
              customer_id: customerId, // 🔥 FIX QUAN TRỌNG NHẤT
            });
          })}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}