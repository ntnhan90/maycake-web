import z from 'zod'

export const ProAttributeSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    display_layout: z.string(),
    order:z.number(),
    status:z.string(),
})
export type ProAttributeResType = z.TypeOf<typeof ProAttributeSchema>

export const ProAttributeListRes = z.object({
    data: z.array(ProAttributeSchema),
})
export type ProAttributeListResType = z.TypeOf<typeof ProAttributeListRes>

export const CreateProAttributeBody = z.object({
    name: z.string(),
    slug: z.string(),
    display_layout: z.string(),
    order:z.number(),
    status:z.string(),
})
export type CreateProAttributeBodyType = z.TypeOf<typeof CreateProAttributeBody>