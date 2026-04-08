import z from 'zod'
import { PaginationSchema } from '../pagination';

export const AttributeItemSchema = z.object({
    attribute_set_id: z.number().optional(),
    attribute_id: z.number(),
    title: z.string().optional(),
    color: z.string().nullable().optional(),
    image: z.string().nullable().optional(),
    price: z.coerce.number().optional(),
})

export const AttributeSetSchema = z.object({
    id: z.number(),
    name: z.string(),
    status:z.string(),
    attributes: z.array(AttributeItemSchema).min(1, 'At least one attribute is required'),
    deletedAt: z.string().nullable().optional(),
})
export type AttributeSetResType = z.TypeOf<typeof AttributeSetSchema>

export const AttributeSetListRes = z.object({
    data: z.array(AttributeSetSchema),
    pagination: PaginationSchema,
})
export type AttributeListResType = z.TypeOf<typeof AttributeSetListRes>

export const CreateAttributeSetBody = z.object({
    name: z.string().min(3),
    status:z.string(),
    attributes: z.array(AttributeItemSchema).min(1, 'At least one attribute is required'),
})
export type CreateAttributeSetBodyType = z.TypeOf<typeof CreateAttributeSetBody>