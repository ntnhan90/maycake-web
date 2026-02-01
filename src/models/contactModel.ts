import z from "zod";
import { PaginationSchema } from "./pagination";
export const ContactSchema = z.object({
    id: z.number(),
    email: z.string(),
    name: z.string(),
    phone: z.string(),
    address: z.string(),
    content: z.string(),
    status: z.string()
})
export type ContactResType = z.TypeOf<typeof ContactSchema>

export const ContactListRes = z.object({
    data: z.array(ContactSchema),
    pagination: PaginationSchema,
})
export type ContactListResType = z.TypeOf<typeof ContactListRes>

export const CreateContactBody = z.object({
    email: z.string().min(3),
    name: z.string().min(3),
    phone: z.string().min(9),
    address: z.string(),
    content: z.string(),
    status: z.string()
})
export type CreateContactBodyType = z.TypeOf<typeof CreateContactBody>