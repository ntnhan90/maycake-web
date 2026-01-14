import z from "zod";

export const RoleSchema = z.object({
    id: z.number(),
    name:z.string(),
    slug:z.string(),
    permissions:z.string(),
    description:z.string(),
    is_default: z.number(),
})
export type RoleResType = z.TypeOf<typeof RoleSchema>

export const RoleListRes = z.object({
    data: z.array(RoleSchema),
})
export type RoleListResType = z.TypeOf<typeof RoleListRes>

export const CreateRoleBody = z.object({
    name: z.string().min(1).max(256),
    description:z.string(),
})
export type CreateRoleBodyType = z.TypeOf<typeof CreateRoleBody>
