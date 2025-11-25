import z from "zod";
import { Role } from "@/types/jwt.type";

export const AccountSchema = z.object({
    id: z.number(),
    username: z.string(),
    email: z.string(),
    //role: z.enum([Role.Admin, Role.Franchise, Role.Store]),
    avatar_id: z.string().nullable(),
    isActive: z.number()
})
export type AccountType = z.TypeOf<typeof AccountSchema>
export type AccountResType = z.TypeOf<typeof AccountSchema>


export const AccountListRes = z.object({
    data: z.array(AccountSchema),
})
export type AccountListResType = z.TypeOf<typeof AccountListRes>


