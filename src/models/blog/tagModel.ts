import z from 'zod'

export const BlogTagSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    status:z.string(),
})
export type BlogTagResType = z.TypeOf<typeof BlogTagSchema>

export const BlogTagListRes = z.object({
    data: z.array(BlogTagSchema),
})
export type ProTagListResType = z.TypeOf<typeof BlogTagListRes>

export const CreateBlogTagBody = z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
    description:z.string().nullable().optional(),
    status:z.string(),
})

export type CreateBlogTagBodyType = z.TypeOf<typeof CreateBlogTagBody>
