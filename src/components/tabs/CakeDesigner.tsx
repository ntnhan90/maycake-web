'use client';

import { useState } from "react";
import CakePreview from "../cake/CakePreview";
import ProductSelector from "../input/productSelect";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateOrderBody, CreateOrderBodyType } from "@/models/product/orderModel";

export default function CakeDesigner() {
  const [tab, setTab] = useState("size");
  const form = useForm<CreateOrderBodyType>({
    resolver: zodResolver(CreateOrderBody),
    defaultValues: {
      products: [],
      sub_amount: '0',
    },
  });

  const onSubmit = (values: CreateOrderBodyType) => {
    console.log(values);
  };

  return (
    <div className="designer-container">
      <div className="row">
        <div className="col-md-5">
          <CakePreview />
        </div>
        <div className="col-md-7">
          <ProductSelector setValue={form.setValue}/>
        </div>
      </div>
    </div>
  );
}