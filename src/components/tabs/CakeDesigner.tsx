'use client';

import { useState } from "react";
import CakePreview from "../cake/CakePreview";
import ProductSelector from "../input/productSelect";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateOrderBody, CreateOrderBodyType } from "@/models/product/orderModel";
import Image from "next/image";
export default function CakeDesigner() {
  const [tab, setTab] = useState("size");
  const [color, setColor] = useState("#ff0000");
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
  const colors = [
    { label: 'Pink', value: '#ff5fa2' },
    { label: 'Blue', value: '#4da6ff' },
    { label: 'Yellow', value: '#ffd633' },
    { label: 'Chocolate', value: '#5a2d0c' },
    { label: 'White', value: '#ffffff' },
    { label: 'Mint', value: '#00ff88' },
  ];
  return (
      <div className="row">
        <div className="col-md-5">
          <CakePreview color={color} />
        </div>
        <div className="col-md-7">
          <ProductSelector setValue={form.setValue} setColor={setColor}/>
        </div>
      </div>
  );
}