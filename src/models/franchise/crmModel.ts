import z from 'zod'
import { PaginationSchema } from '../pagination'

export const FranchiseSchema = z.object({
    id: z.number(),
    company_name: z.string(),
    tax_code: z.string(),
    owner_name: z.string(),
    email: z.string(),
    phone: z.string(),
    shop: z.number(),
})
export type FranchiseResType = z.TypeOf<typeof FranchiseSchema>

export const FranchiseListRes = z.object({
    data: z.array(FranchiseSchema),
    pagination: PaginationSchema,
})
export type FranchiseListResType = z.TypeOf<typeof FranchiseListRes>

export const CreateFranchiseResBody = z.object({
    company_name: z.string().min(2),
    tax_code: z.string().min(2),
    owner_name:z.string().nullable().optional(),
    email:z.string(),
    phone: z.string(),
})

export type CreateFranchiseBodyType = z.TypeOf<typeof CreateFranchiseResBody>
