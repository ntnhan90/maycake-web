import z from "zod";
import { Role } from "@/types/jwt.type";
export const AccountSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  //role: z.enum([Role.Admin, Role.Franchise, Role.Store]),
  avatar: z.string().nullable()
})

export const AccountRes = z .object({
    AccountSchema,
}).strict()
export type AccountResType = z.TypeOf<typeof AccountRes>


export const AccountListRes = z.object({
    data: z.array(AccountSchema),
})
export type AccountListResType = z.TypeOf<typeof AccountListRes>