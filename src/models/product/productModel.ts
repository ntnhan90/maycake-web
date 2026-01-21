import z from 'zod'
export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    content: z.string(),
    status:z.string(),
    image:z.string(),
    images:z.string(),
    sku:z.string(),
    order:z.number(),
    is_featured: z.number(),
    price:z.number(),
    sale_price:z.number(),
    start_date:z.date(),
    end_date:z.date(),
    length:z.number(),
    wide:z.number(),
    height:z.number(),
    weight:z.number(),
})
export type ProductResType = z.TypeOf<typeof ProductSchema>

export const ProductListRes = z.object({
    data: z.array(ProductSchema),
})
export type ProductListResType = z.TypeOf<typeof ProductListRes>

export const CreateProductBody = z.object({
    name: z.string().min(3),
    slug: z.string(),
    description: z.string(),
    content: z.string(),
    status:z.string(),
   // image:z.string(),
    //images:z.string(),
   // sku:z.string(),
  //  order:z.number(),
    is_featured: z.number(),
   // price:z.number(),
   // sale_price:z.number(),
    //start_date:z.date(),
    //end_date:z.date(),
   // length:z.number(),
   // wide:z.number(),
   // height:z.number(),
   // weight:z.number(),
    tags: z.array(z.string()),
    categories: z.array(z.coerce.number()),
})

export type CreateProductBodyType = z.TypeOf<typeof CreateProductBody>