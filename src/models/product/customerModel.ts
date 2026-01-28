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
    confirmPassword: z.string().min(6).max(100),
    dob:z.date().optional().nullable(),
    phone: z.string().regex(/^\d{10}$/, 'Số điện thoại phải gồm đúng 10 chữ số'),
    status:z.string(),
})

export type CreateCustomerBodyType = z.TypeOf<typeof CreateCustomerBody>

export const UpdateCustomerBody = z.object({
    name: z.string().min(3, "Name too short"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(1, "Required"),
    dob: z.string().optional(), // 🔥 đổi sang string
    status:z.string(),
    password: z
        .string()
        .min(6, "Password min 6 chars")
        .or(z.literal(""))
        .transform(v => (v === "" ? undefined : v))
        .optional(),
    confirmPassword: z
        .string()
        .min(6, "Password min 6 chars")
        .or(z.literal(""))
        .transform(v => (v === "" ? undefined : v))
        .optional(),
})
.superRefine((data, ctx) => {
    if (data.password && data.password !== data.confirmPassword) {
        ctx.addIssue({
            path: ["confirmPassword"],
            code: "custom",
            message: "Passwords do not match",
        });
    }
});
export type UpdateCustomerBodyType = z.infer<typeof UpdateCustomerBody>;


export type UpdateCustomerPayload = {
    id: number;
    name?: string;
    email?: string;
    phone?: string;
    status?: string;
    dob?: Date | null;
    password?: string;
};

