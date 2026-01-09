import z from 'zod'

export const AttributeItemSchema = z.object({
  title: z.string().min(1, 'Attribute title is required'),
  color: z.string(),
  image: z.string().nullable().optional(),
  isDefault: z.boolean(),
})

export const AttributeSetSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    status:z.string(),
   // attributes: z.array(AttributeItemSchema).min(1, 'At least one attribute is required'),
})
export type AttributeSetResType = z.TypeOf<typeof AttributeSetSchema>

export const AttributeSetListRes = z.object({
    data: z.array(AttributeSetSchema),
})
export type ProAttributeListResType = z.TypeOf<typeof AttributeSetListRes>

export const CreateAttributeSetBody = z.object({
    name: z.string(),
    slug: z.string(),
    status:z.string(),
    attributes: z.array(AttributeItemSchema).min(1, 'At least one attribute is required'),
})
export type CreateAttributeSetBodyType = z.TypeOf<typeof CreateAttributeSetBody>