import z from 'zod'

export const DiscountSchema = z.object({
    id: z.number(),
    title: z.string(),
    code: z.string(),
    start_date: z.date(),
    end_date:z.date(),
    quantity:z.number(),
    total_used: z.number(),
    value:z.string(),
    type:z.string(),
    can_use_with_promotion: z.number(),
    type_option:z.string(),
    target:z.string(),
    display_at_checkout:z.number(),
})
export type DiscountResType = z.TypeOf<typeof DiscountSchema>

export const DiscountListRes = z.object({
    data: z.array(DiscountSchema),
})
export type DiscountListResType = z.TypeOf<typeof DiscountListRes>

export const CreateDiscountBody = z.object({
    title: z.string().min(4),
    code: z.string().min(4),
    start_date: z.date(),
    end_date:z.date().optional().nullable(),
    quantity:z.coerce.number(),
    total_used: z.coerce.number(),
    value:z.string(),
    type:z.string(),
    can_use_with_promotion: z.number(),
    type_option:z.string(),
    target:z.string(),
    display_at_checkout:z.number(),
})

export type CreateDiscountBodyType = z.TypeOf<typeof CreateDiscountBody>

