import z from 'zod'

export const AttributeItemSchema = z.object({
   // id:z.number(),
    title: z.string().min(1, 'Attribute title is required'),
    color: z.string().nullable().optional(),
    image: z.string().nullable().optional(),
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
})
export type AttributeListResType = z.TypeOf<typeof AttributeSetListRes>

export const CreateAttributeSetBody = z.object({
    name: z.string().min(3),
    status:z.string(),
    attributes: z.array(AttributeItemSchema).min(1, 'At least one attribute is required'),
})
export type CreateAttributeSetBodyType = z.TypeOf<typeof CreateAttributeSetBody>