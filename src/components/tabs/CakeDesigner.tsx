'use client';

import { useState } from "react";
import CakePreview from "../cake/CakePreview";
import ProductSelector from "../input/productSelect";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateOrderBody, CreateOrderBodyType } from "@/models/product/orderModel";

export default function CakeDesigner() {
  const [color, setColor] = useState("#ff0000");
  const [shape, setShape] = useState('/img/vuong-16x9cm-base.png');
  const form = useForm<CreateOrderBodyType>({
    resolver: zodResolver(CreateOrderBody),
    defaultValues: {
      products: [],
      sub_amount: '0',
    },
  });

  return (
      <div className="row">
        <div className="col-md-5">
          <CakePreview color={color} shape={shape}/>
        </div>
        <div className="col-md-7">
          <ProductSelector setValue={form.setValue} setColor={setColor} setShape={setShape}/>
        </div>
      </div>
  );
}