import z from 'zod'

export const PostSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    content: z.string(),
    user_id: z.number(),
    is_featured: z.number(),
    image:z.string(),
    status:z.string(),
    views: z.number(),
})
export type PostResType = z.TypeOf<typeof PostSchema>

export const PostListRes = z.object({
    data: z.array(PostSchema),
})
export type PostListResType = z.TypeOf<typeof PostListRes>

export const CreatePostBody = z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
    description:z.string().nullable().optional(),
    content: z.string().nullable().optional(),
  //  user_id: z.number(),
    is_featured: z.number(),
    image:z.string().nullable().optional(),
    status:z.string(),
    tags: z.array(z.string()),
    categories: z.array(z.coerce.number()),
})

export type CreatePostBodyType = z.TypeOf<typeof CreatePostBody>
