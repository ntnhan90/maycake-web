import z from 'zod'
import { PaginationSchema } from '../pagination'

export const ShopSchema = z.object({
    id: z.number(),
    name: z.string(),
    address: z.string(),
    city: z.string(),
    postal_code: z.string(),
    is_active: z.number(),
    status: z.string(),
    franchiseId:z.number()
})
export type ShopResType = z.TypeOf<typeof ShopSchema>

export const ShopListRes = z.object({
    data: z.array(ShopSchema),
    pagination: PaginationSchema,
})
export type ShopListResType = z.TypeOf<typeof ShopListRes>

export const CreateShopBody = z.object({
    name: z.string(),
    address: z.string(),
    city: z.string(),
    postal_code: z.string(),
    is_active: z.number(),
    status: z.string(),
    franchiseId:z.number()
})

export type CreateShopBodyType = z.TypeOf<typeof CreateShopBody>
