import z from 'zod'
import { PaginationSchema } from '../pagination'
export const ProLabelSchema = z.object({
    id: z.number(),
    name: z.string(),
   // price: z.coerce.number(),
    color: z.string(),
  //  createdAt: z.date(),
   // updatedAt: z.date()
})


export const ProLabelListRes = z.object({
    data: z.array(ProLabelSchema),
    pagination: z.array(PaginationSchema)
})
export type ProLabelListResType = z.TypeOf<typeof ProLabelListRes>