import z from 'zod';

import { PaginationSchema } from '../pagination';

/* ================= DECIMAL ================= */

const DecimalString = z
  .string()
  .refine((v) => !isNaN(Number(v)), {
    message: 'Must be a number',
  })
  .refine((v) => Number(v) >= 0, {
    message: 'Must be >= 0',
  });

/* ================= ORDER PRODUCT ================= */

export const OrderProductItem = z.object({
  product_id: z.number().min(1),
  attribute_ids: z.array(z.number()),
  qty: z.number().min(1),
  price: z.number().nonnegative(),

});

export type OrderProductItemType =
  z.TypeOf<
    typeof OrderProductItem
  >;

/* ================= ORDER ADDRESS ================= */

export const OrderAddressSchema =
  z.object({
    name: z
      .string()
      .trim()
      .min(1),

    phone: z
      .string()
      .trim()
      .min(1),

    address: z
      .string()
      .trim()
      .min(1),

    city: z
      .string()
      .trim()
      .optional()
      .nullable(),

    state: z
      .string()
      .trim()
      .optional()
      .nullable(),

    country: z
      .string()
      .trim()
      .optional()
      .nullable(),

    zip_code: z
      .string()
      .trim()
      .optional()
      .nullable(),
  });

export type OrderAddressType =
  z.TypeOf<
    typeof OrderAddressSchema
  >;

/* ================= ORDER RESPONSE ================= */

export const OrderSchema =
  z.object({
    id: z.number(),

    name: z.string().min(1),

    email: z.string().email(),

    phone: z.string(),

    amount: z
      .number()
      .nonnegative(),

    payment_method:
      z.string(),

    payment_status: z.enum([
      'completed',
      'pending',
      'failed',
    ]),

    status: z.enum([
      'completed',
      'pending',
      'cancelled',
    ]),

    tax_amount: z
      .number()
      .nonnegative(),

    shipping_amount: z
      .number()
      .nonnegative(),
  });

export type OrderResType =
  z.TypeOf<typeof OrderSchema>;

/* ================= ORDER LIST ================= */

export const OrderListRes =
  z.object({
    data: z.array(OrderSchema),

    pagination:
      PaginationSchema,
  });

export type OrderListResType =
  z.TypeOf<
    typeof OrderListRes
  >;

/* ================= CREATE ORDER ================= */

export const CreateOrderBody =
  z.object({
    customer_id: z
      .number()
      .nullable()
      .optional(),

    note: z
      .string()
      .trim()
      .optional()
      .nullable(),

    /* ================= PRODUCTS ================= */

    products: z
      .array(
        OrderProductItem,
      )
      .min(1, {
        message:
          'Please add at least one product',
      }),

    /* ================= ADDRESS ================= */

    address:
      OrderAddressSchema.optional(),

    /* ================= PAYMENT ================= */

    payment_method: z.enum([
      'cod',
      'bank_transfer',
    ]),

    payment_status: z.enum([
      'pending',
      'paid',
      'failed',
    ]),

    /* ================= PRICE ================= */

    sub_amount:
      DecimalString,

    tax_amount:
      DecimalString,

    discount_amount:
      DecimalString,

    total_amount:
      DecimalString,

    /* ================= STATUS ================= */

    status: z.enum([
      'pending',
      'completed',
      'cancelled',
    ]),
  });

export type CreateOrderBodyType =
  z.TypeOf<
    typeof CreateOrderBody
  >;