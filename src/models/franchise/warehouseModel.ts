import z from 'zod'
import { PaginationSchema } from '../pagination'

export const WarehouseSchema = z.object({
    id: z.number(),
    name: z.string(),
    country: z.string(),
    location: z.string(),
    address: z.string(),
    status: z.string(),
})
export type WarehouseResType = z.TypeOf<typeof WarehouseSchema>

export const WarehouseListSchema = z.object({
    data: z.array(WarehouseSchema),
    pagination: PaginationSchema,
})
export type WarehouseListType = z.TypeOf<typeof WarehouseListSchema>

export const CreateWarehouseBody = z.object({
    name: z.string(),
    country: z.string(),
    location: z.string(),
    address: z.string(),
    status: z.string(),
})

export type CreateWarehouseBodyType = z.TypeOf<typeof CreateWarehouseBody>
