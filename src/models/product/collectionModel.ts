import z from 'zod'

export const ProCollectionSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    description:z.string(),
    image:z.string(),
    is_featured:z.number(),
    status:z.string(),
})
export type ProCollectionResType = z.TypeOf<typeof ProCollectionSchema>

export const ProCollectionListRes = z.object({
    data: z.array(ProCollectionSchema),
})
export type ProCollectionListResType = z.TypeOf<typeof ProCollectionListRes>

export const CreateProCollectionBody = z.object({
    name: z.string(),
    slug: z.string(),
    description:z.string().nullable().optional(),
    image:z.string().nullable().optional(),
    is_featured:z.number(),
    status:z.string(),
})

export type CreateProCollectionBodyType = z.TypeOf<typeof CreateProCollectionBody>
