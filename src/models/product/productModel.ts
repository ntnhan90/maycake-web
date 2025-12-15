import z from 'zod'
export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    color: z.string(),
    status:z.string(),
})
export type ProductResType = z.TypeOf<typeof ProductSchema>

export const ProductListRes = z.object({
    data: z.array(ProductSchema),
})
export type ProductListResType = z.TypeOf<typeof ProductListRes>

export const CreateProductBody = z.object({
    name: z.string(),
    color: z.string(),
    status:z.string(),
})

export type CreateProductBodyType = z.TypeOf<typeof CreateProductBody>