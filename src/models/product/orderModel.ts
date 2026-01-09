import z from "zod";

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
})
export type OrderListResType = z.TypeOf<typeof OrderListRes>

export const CreateOrderBody = z.object({
    customer_id: z.number().nullable().optional(),
    note: z.string() .trim().optional().nullable(),
    payment_method: z.enum(['cod', 'bank_transfer', 'online'], {
        required_error: 'Payment method is required',
    }),
    payment_status: z.enum(['pending', 'paid', 'failed'], {
        required_error: 'Payment status is required',
    }),
    sub_amount: z.number().min(0),
    tax_amount: z.number().min(0),
    discount_amount: z.number().min(0),
    total_amount: z.number().min(0),
})
export type CreateOrderBodyType = z.TypeOf<typeof CreateOrderBody>