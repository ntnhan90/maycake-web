import z from 'zod'

export const BlogCateSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    parent_id: z.number(),
    description:z.string(),
    status:z.string(),
})
export type BlogCateResType = z.TypeOf<typeof BlogCateSchema>

export const BlogCateListRes = z.object({
    data: z.array(BlogCateSchema),
})
export type BlogCateListResType = z.TypeOf<typeof BlogCateListRes>

export const CreateBlogCateBody = z.object({
    name: z.string().min(4),
    order:z.number().optional().nullable(),
    is_featured:z.number().optional().nullable(),
    is_default:z.number().optional().nullable(),
    slug: z.string(),
    parent_id: z.number(),
    image:z.string().optional().nullable(),
    description:z.string().optional().nullable(),
    status:z.string(),
})

export type CreateBlogCateBodyType = z.TypeOf<typeof CreateBlogCateBody>


export const CategoryWithCountSchema = z.object({
  id: z.number(),
  name: z.string(),
  parent_id: z.number().default(0), // thường parent có thể null
  is_featured:z.number(),
  is_default:z.number(),
  count: z.number(),
});
export type CategoryWithCountType = z.TypeOf<typeof CategoryWithCountSchema>