import z from 'zod'
import { PaginationSchema } from '../pagination'

export const ContractSchema = z.object({
    id: z.number(),
    contract_code: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    royalty_percent: z.string(),
    marketing_fee_percent: z.string(),
    payment_status: z.string(),
    contract_file_url: z.string(),
    franchiseId:z.number()
})
export type ContractResType = z.TypeOf<typeof ContractSchema>

export const ContractListRes = z.object({
    data: z.array(ContractSchema),
    pagination: PaginationSchema,
})
export type ContractListResType = z.TypeOf<typeof ContractListRes>

export const CreateContractResBody = z.object({
    contract_code: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    royalty_percent: z.string(),
    marketing_fee_percent: z.string(),
    payment_status: z.string(),
    contract_file_url: z.string(),
    franchiseId:z.number()
})

export type CreateContractBodyType = z.TypeOf<typeof CreateContractResBody>
