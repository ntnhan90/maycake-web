import z from 'zod'
import { PaginationSchema } from '../pagination'

export const TagResSchema = z.object({
    id: z.number(),
    name: z.string(),
});
export type TagResType = z.infer<typeof TagResSchema>;

export const CategoryResSchema = z.object({
    id: z.number(),
    name: z.string(),
});
export type CategoryResType = z.infer<typeof CategoryResSchema>;

export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    content: z.string(),
    status:z.string(),
    image:z.string().optional().nullable(),
    images:z.string().optional().nullable(),
    sku:z.string().optional().nullable(),
    order:z.number(),
    is_featured: z.number(),
    price:z.number(),
    sale_price:z.number(),
    start_date:z.date().nullable().optional(),
    end_date:z.date().optional().nullable(),
    tags: z.array(TagResSchema),
    categories: z.array(CategoryResSchema),
})
export type ProductResType = z.TypeOf<typeof ProductSchema>

export const ProductListRes = z.object({
    data: z.array(ProductSchema),
    pagination: PaginationSchema.optional(),
})
export type ProductListResType = z.TypeOf<typeof ProductListRes>


export const CreateProductBody = z.object({
    name: z.string().min(3),
    slug: z.string(),
    description: z.string(),
    content: z.string(),
    status: z.string(),

    image: z.string().nullable().optional(),
    images: z.string().nullable().optional(),

    is_featured: z.number().optional(),
    price: z.number(),
    sale_price: z.number(),
    views: z.number(),
    tags: z.array(z.string()),
    categories: z.array(z.coerce.number()),
})

export type CreateProductBodyType = z.infer<typeof CreateProductBody>
