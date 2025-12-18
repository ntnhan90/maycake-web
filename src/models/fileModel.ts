import z from "zod";

export const FileSchema = z.object({
    id: z.number(),
    user_id: z.number(),
    name: z.string(),
    alt: z.string(),
    folder_id: z.number(),
    mime_type : z.string(),
    size: z.number(),
    url: z.string(),
})
export type FileResType = z.TypeOf<typeof FileSchema>

export const FileListRes = z.object({
    data: z.array(FileSchema),
})
export type FileListResType = z.TypeOf<typeof FileListRes>

export const CreateFileBody = z.object({
    user_id: z.number(),
    name: z.string(),
    alt: z.string(),
    folder_id: z.number(),
    mime_type : z.string(),
    size: z.number(),
    url: z.string(),
})
export type CreateFileBodyType = z.TypeOf<typeof CreateFileBody>