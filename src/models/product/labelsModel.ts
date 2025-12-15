import z from 'zod'
import { PaginationSchema } from '../pagination'
export const ProLabelSchema = z.object({
    id: z.number(),
    name: z.string(),
    color: z.string(),
    status:z.string(),
})
export type ProLabelResType = z.TypeOf<typeof ProLabelSchema>

export const ProLabelListRes = z.object({
    data: z.array(ProLabelSchema),
    pagination: z.array(PaginationSchema)
})
export type ProLabelListResType = z.TypeOf<typeof ProLabelListRes>

export const CreateProLabelBody = z.object({
    name: z.string(),
    color: z.string(),
    status:z.string(),
})

export type CreateProLabelBodyType = z.TypeOf<typeof CreateProLabelBody>
