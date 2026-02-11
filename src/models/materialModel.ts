import z from "zod";
import { PaginationSchema } from "./pagination";

export const MaterialSchema = z.object({
    id: z.number(),
    name: z.string(),
    sku: z.string(),
    unit: z.string(),
    category: z.string(),
    cost_price:z.string(),
    status: z.string(),
})

export type MaterialResType = z.TypeOf<typeof MaterialSchema>

export const MaterialListRes = z.object({
    data: z.array(MaterialSchema),
    pagination: PaginationSchema,
})
export type MaterialListResType = z.TypeOf<typeof MaterialListRes>

export const CreateMaterialBody = z.object({
    name: z.string(),
   // sku: z.string(),
    unit: z.string(),
    category: z.string(),
    cost_price:z.string(),
    status: z.string(),
})
export type CreateMaterialBodyType = z.TypeOf<typeof CreateMaterialBody>
