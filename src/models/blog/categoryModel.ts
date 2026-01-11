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
    name: z.string(),
    //slug: z.string(),
    parent_id: z.number(),
    description:z.string(),
    status:z.string(),
})

export type CreateBlogCateBodyType = z.TypeOf<typeof CreateBlogCateBody>
