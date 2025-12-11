import z, { symbol } from "zod";

export const CurrencySchema = z.object({
    id: z.number(),
    title:z.string(),
    is_prefix_symbol:z.number(),
    decimails:z.number(),
    order:z.number(),
    default:z.number(),
    exchange_rate:z.number(),
})

export type CurrencyResType = z.TypeOf<typeof CurrencySchema>


export const CurrencyListRes = z.object({
    data: z.array(CurrencySchema),
})
export type CurrencyListResType = z.TypeOf<typeof CurrencyListRes>

export const CreateCurrencyBody = z.object({
    title: z.string().min(1).max(256),
    is_prefix_symbol:z.number(),
    decimails:z.number(),
    order:z.number(),
    default:z.number(),
    exchange_rate:z.number(),
})
export type CreateCurrencyBodyType = z.TypeOf<typeof CreateCurrencyBody>
