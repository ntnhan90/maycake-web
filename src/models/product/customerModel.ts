import z from 'zod'

export const CustomerSchema = z.object({
    id: z.number(),
    email: z.string(),
    name: z.string(),
    password: z.string(),
    avatar: z.number(),
    dob:z.date(),
    phone:z.string(),
    status:z.string(),
})
export type CustomerResType = z.TypeOf<typeof CustomerSchema>

export const CustomerListRes = z.object({
    data: z.array(CustomerSchema),
})
export type CustomerListResType = z.TypeOf<typeof CustomerListRes>

export const CreateCustomerBody = z.object({
    email: z.string().min(4).email("Email is not valid"),
    name: z.string().min(4),
    password: z.string().min(6, "Password must be at least 6 characters"),
    avatar: z.string().optional().nullable(),
    dob:z.date().optional().nullable(),
    phone:z.string(),
    status:z.string(),
})

export type CreateCustomerBodyType = z.TypeOf<typeof CreateCustomerBody>

