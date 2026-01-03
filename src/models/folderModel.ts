import z from "zod";

export const FolderSchema = z.object({
    id: z.number(),
    user_id: z.number(),
    name: z.string(),
    slug: z.string(),
    parent_id: z.number(),
})
export type FolderResType = z.TypeOf<typeof FolderSchema>

export const FolderListRes = z.object({
    data: z.array(FolderSchema),
})
export type FolderListResType = z.TypeOf<typeof FolderListRes>

export const CreateFolderBody = z.object({
   // user_id: z.number(),
    name: z.string().min(2),
   // slug: z.string(),
    parent_id: z.coerce.number(),
})
export type CreateFolderBodyType = z.TypeOf<typeof CreateFolderBody>