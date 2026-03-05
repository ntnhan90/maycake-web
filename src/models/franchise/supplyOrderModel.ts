import z from 'zod'
import { PaginationSchema } from '../pagination'

export const SupplyOrderSchema = z.object({
    id: z.number(),
    shop_id: z.string(),
    order_date: z.string(),
    total_cost: z.string(),
    status: z.string(),
})
export type SupplyOrderResType = z.TypeOf<typeof SupplyOrderSchema>

export const SupplyOrderListSchema = z.object({
    data: z.array(SupplyOrderSchema),
    pagination: PaginationSchema,
})
export type SupplyOrderListType = z.TypeOf<typeof SupplyOrderListSchema>

export const CreateSupplyOrderBody = z.object({
    shop_id: z.string(),
    order_date: z.string(),
    total_cost: z.string(),
    status: z.string(),
})

export type CreateSupplyOrderBodyType = z.TypeOf<typeof CreateSupplyOrderBody>
