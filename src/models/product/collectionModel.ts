import z from 'zod'
import { PaginationSchema } from '../pagination';

export const ProCollectionSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    description:z.string(),
    image:z.string(),
    status:z.string(),
})
export type ProCollectionResType = z.TypeOf<typeof ProCollectionSchema>

export const ProCollectionListRes = z.object({
    data: z.array(ProCollectionSchema),
    pagination: PaginationSchema,
})
export type ProCollectionListResType = z.TypeOf<typeof ProCollectionListRes>

export const CreateProCollectionBody = z.object({
    name: z.string(),
    slug: z.string(),
    description:z.string().nullable().optional(),
    image:z.string().nullable().optional(),
    status:z.string(),
})

export type CreateProCollectionBodyType = z.TypeOf<typeof CreateProCollectionBody>
