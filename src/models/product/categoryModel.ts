import z from 'zod'

export const ProCateSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    parent_id: z.number(),
    description:z.string(),
    status:z.string(),
})
export type ProCateResType = z.TypeOf<typeof ProCateSchema>

export const ProCateListRes = z.object({
    data: z.array(ProCateSchema),
})
export type ProCateListResType = z.TypeOf<typeof ProCateListRes>

export const CreateProCateBody = z.object({
    name: z.string(),
    slug: z.string(),
    parent_id: z.number(),
    description:z.string(),
    status:z.string(),
})

export type CreateProCateBodyType = z.TypeOf<typeof CreateProCateBody>
