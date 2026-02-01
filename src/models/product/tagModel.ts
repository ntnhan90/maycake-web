import z from 'zod'
import { PaginationSchema } from '../pagination'
export const ProTagSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    status:z.string(),
})
export type ProTagResType = z.TypeOf<typeof ProTagSchema>

export const ProTagListRes = z.object({
    data: z.array(ProTagSchema),
    pagination: PaginationSchema,
})
export type ProTagListResType = z.TypeOf<typeof ProTagListRes>

export const CreateProTagBody = z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
    description:z.string().nullable().optional(),
    status:z.string(),
})

export type CreateProTagBodyType = z.TypeOf<typeof CreateProTagBody>
