import z from 'zod'
import { PaginationSchema } from '../pagination'

export const ShopSchema = z.object({
    id: z.number(),
    contract_code: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    royalty_percent: z.string(),
    marketing_fee_percent: z.string(),
    payment_status: z.string(),
    contract_file_url: z.string(),
    franchiseId:z.number()
})
export type ShopResType = z.TypeOf<typeof ShopSchema>

export const ShopListRes = z.object({
    data: z.array(ShopSchema),
    pagination: PaginationSchema,
})
export type ShopListResType = z.TypeOf<typeof ShopListRes>

export const CreateShopResBody = z.object({
    contract_code: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    royalty_percent: z.string(),
    marketing_fee_percent: z.string(),
    payment_status: z.string(),
    contract_file_url: z.string(),
    franchiseId:z.number()
})

export type CreateShopBodyType = z.TypeOf<typeof CreateShopResBody>
