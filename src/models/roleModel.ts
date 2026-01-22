import z from "zod";

export const PermissionSchema = z.object({
    id: z.number(),
    name:z.string(),
    description:z.string(),
    module:z.string(),
    path:z.string(),
    method: z.string(),
})
export type PermissionResType = z.TypeOf<typeof PermissionSchema>

export const PermissionListRes = z.object({
    data: z.array(PermissionSchema),
})
export type PermissionListResType = z.TypeOf<typeof PermissionListRes>



export const RoleSchema = z.object({
    id: z.number(),
    name:z.string(),
    slug:z.string(),
    description:z.string(),
    is_default: z.number(),
    permissions: z.array(PermissionSchema),
})
export type RoleResType = z.TypeOf<typeof RoleSchema>

export const RoleListRes = z.object({
    data: z.array(RoleSchema),
})
export type RoleListResType = z.TypeOf<typeof RoleListRes>

export const CreateRoleBody = z.object({
    name: z.string().min(1).max(256),
    description:z.string(),
    is_default: z.coerce.number(),
    permissionIds:  z.array(z.number()), 
})
export type CreateRoleBodyType = z.TypeOf<typeof CreateRoleBody>



