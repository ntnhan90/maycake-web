import z from "zod";

export const TaxSchema = z.object({
    id: z.number(),
    title:z.string(),
    percentage: z.number(),
    status:z.string(),
})
export type TaxResType = z.TypeOf<typeof TaxSchema>


export const TaxListRes = z.object({
    data: z.array(TaxSchema),
})
export type TaxListResType = z.TypeOf<typeof TaxListRes>

export const CreateTaxBody = z.object({
    title: z.string().min(1).max(256),
    percentage: z.number(),
    status:z.string(),
})
export type CreateTaxBodyType = z.TypeOf<typeof CreateTaxBody>
