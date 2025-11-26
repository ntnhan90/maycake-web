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

export const UpdateAccountBody = z .object({
    username: z.string().trim().min(2).max(256),
    email: z.string().email(),
    first_name: z.string().min(2),
    last_name: z.string().min(2),
    //  avatar: z.string().url().optional(),
    password: z.string().min(6).max(100).optional(),
    confirmPassword: z.string().min(6).max(100).optional(),
    // role: z.enum([Role.Owner, Role.Employee]).optional().default(Role.Employee)
})
.strict()
.superRefine(({ confirmPassword, password }, ctx) => {
    if (!password || !confirmPassword) {
        ctx.addIssue({
        code: 'custom',
        message: 'Hãy nhập mật khẩu mới và xác nhận mật khẩu mới',
        path: ['changePassword']
        })
    } else if (confirmPassword !== password) {
        ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu không khớp',
        path: ['confirmPassword']
        })
    }
})
export type UpdateAccountBodyType = z.TypeOf<typeof UpdateAccountBody>
