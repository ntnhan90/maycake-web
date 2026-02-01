import z from 'zod'
import { PaginationSchema } from '../pagination';

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

export const PostSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    content: z.string(),
    user_id: z.number(),
    is_featured: z.number(),
    image:z.string(),
    status: z.enum(["pending", "published", "draft"]),
    views: z.number(),
    tags: z.array(TagResSchema),
    categories: z.array(CategoryResSchema),
})
export type PostResType = z.TypeOf<typeof PostSchema>

export const PostListRes = z.object({
    data: z.array(PostSchema),
    pagination: PaginationSchema,
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
    status: z.enum(["pending", "published", "draft"]),
    tags: z.array(z.string()),
    categories: z.array(z.coerce.number()),
})

export type CreatePostBodyType = z.TypeOf<typeof CreatePostBody>
