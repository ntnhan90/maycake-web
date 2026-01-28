import z from "zod";

export const AccountSchema = z.object({
    id: z.number(),
    username: z.string(),
    email: z.string(),
    //role: z.enum([Role.Admin, Role.Franchise, Role.Store]),
    avatar_id: z.string().nullable(),
    isActive: z.number(),
    first_name: z.string(),
    last_name: z.string(),
})
export type AccountType = z.TypeOf<typeof AccountSchema>
export type AccountResType = z.TypeOf<typeof AccountSchema>


export const AccountListRes = z.object({
    data: z.array(AccountSchema),
})
export type AccountListResType = z.TypeOf<typeof AccountListRes>

export const CreateAccountBody = z.object({
    username: z.string().trim().min(2).max(256),
    email: z.string().email(),
    first_name: z.string().min(2),
    last_name: z.string().min(2),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100)
}).strict()
.superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: 'custom',
            message: 'Mật khẩu không khớp',
            path: ['confirmPassword']
        })
    }
})
export type CreateAccountBodyType = z.TypeOf<typeof CreateAccountBody>


export const UpdateAccountBody = z.object({
    username: z.string().min(3, "Username too short"),
    email: z.string().email("Invalid email"),
    first_name: z.string().min(1, "Required"),
    last_name: z.string().min(1, "Required"),
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
export type UpdateAccountBodyType = z.infer<typeof UpdateAccountBody>;