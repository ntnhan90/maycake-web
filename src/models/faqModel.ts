import z from "zod";
import { PaginationSchema } from "./pagination";
export const FaqCateSchema = z.object({
    id: z.number(),
    name: z.string(),
    order: z.number(),
    description: z.string(),
    status: z.string(),
})

export type FaqCateResType = z.TypeOf<typeof FaqCateSchema>

export const FaqCateListRes = z.object({
    data: z.array(FaqCateSchema),
    pagination: PaginationSchema,
})
export type FaqCateListResType = z.TypeOf<typeof FaqCateListRes>

export const CreateFaqCateBody = z.object({
    name: z.string().min(3),
    order: z.number(),
    description: z.string(),
    status: z.string()
})
export type CreateFaqCateBodyType = z.TypeOf<typeof CreateFaqCateBody>


export const FaqsSchema = z.object({
    id: z.number(),
    question: z.string(),
    answer: z.string(),
    category_id: z.number(),
    status: z.string(),
})

export type FaqsResType = z.TypeOf<typeof FaqsSchema>

export const FaqsListRes = z.object({
    data: z.array(FaqsSchema),
})
export type FaqsListResType = z.TypeOf<typeof FaqsListRes>

export const CreateFaqsBody = z.object({
    question: z.string().min(10),
    answer: z.string().min(10),
    category_id: z.number(),
    status: z.string(),
})
export type CreateFaqsBodyType = z.TypeOf<typeof CreateFaqsBody>