import z from "zod";
import { PaginationSchema } from "../pagination";
/**
 * Schema cho 1 sản phẩm trong đơn hàng
 */
const DecimalString = z
  .string()
  .refine(v => !isNaN(Number(v)), {
    message: 'Must be a number',
  })
  .refine(v => Number(v) >= 0, {
    message: 'Must be >= 0',
  });


export const OrderProductItem = z.object({
  product_id: z.number().min(1),
  qty: z.number().min(1),
  price: z.number().nonnegative(),
});

export const OrderSchema = z.object({
    id: z.number(),
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string(),
    amount: z.number().nonnegative(),
    payment_method: z.string(),
    payment_status: z.enum(['completed', 'pending', 'failed']),
    status: z.enum(['completed', 'pending', 'cancelled']),
    tax_amount: z.number().nonnegative(),
    shipping_amount: z.number().nonnegative(),
})
export type OrderResType = z.TypeOf<typeof OrderSchema>

export const OrderListRes = z.object({
    data: z.array(OrderSchema),
    pagination: PaginationSchema,
})
export type OrderListResType = z.TypeOf<typeof OrderListRes>

export const CreateOrderBody = z.object({
  customer_id: z.number().nullable().optional(),
  note: z.string().trim().optional().nullable(),

  products: z.array(OrderProductItem).min(1, {
    message: 'Please add at least one product',
  }),

  payment_method: z.enum(['cod', 'bank_transfer']),
  payment_status: z.enum(['pending', 'paid', 'failed']),

  sub_amount: DecimalString,
  tax_amount: DecimalString,
  discount_amount: DecimalString,
  total_amount: DecimalString,

  status: z.enum(['pending', 'completed', 'cancelled']),
});
export type CreateOrderBodyType = z.TypeOf<typeof CreateOrderBody>