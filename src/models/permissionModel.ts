import z from "zod";

export const PermissionSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    module: z.string(),
    path: z.string(),
    method: z.string(),
})
export type PermissionResType = z.TypeOf<typeof PermissionSchema>

export const PermissionListRes = z.object({
    data: z.array(PermissionSchema)
})
export type PermissionListResType = z.TypeOf<typeof PermissionListRes>

export const CreatePermissionBody = z.object({
    name: z.string(),
    description: z.string(),
    module: z.string(),
    path: z.string(),
    method: z.string(),
})
export type CreatePermissionBodyType = z.TypeOf<typeof CreatePermissionBody>