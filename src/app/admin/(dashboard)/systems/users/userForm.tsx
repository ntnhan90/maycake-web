// components/UserForm.tsx
"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// schemas/user.schema.ts
export const UserFormSchema = z.object({
    id: z.number(),
  username: z.string().min(3, "Username phải tối thiểu 3 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  avatar_id: z.string().nullable(),
});

export type UserFormType = z.infer<typeof UserFormSchema>;


export default function UserForm({
    defaultValues,
    onSubmit,
}: {
    defaultValues?: UserFormType;  // Edit mode
    onSubmit: (values: UserFormType) => Promise<void>;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<UserFormType>({
            resolver: zodResolver(UserFormSchema),
            defaultValues: defaultValues ?? {
            username: "",
            email: "",
        avatar_id: "",
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded">
        {/* Username */}
        <div>
            <label className="block font-semibold">Username</label>
            <input {...register("username")} className="border p-2 w-full" />
            {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
        </div>

        {/* Email */}
        <div>
            <label className="block font-semibold">Email</label>
            <input {...register("email")} className="border p-2 w-full" />
            {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
        </div>

        {/* Avatar */}
        <div>
            <label className="block font-semibold">Avatar ID</label>
            <input {...register("avatar_id")} className="border p-2 w-full" />
        </div>

        <button
            disabled={isSubmitting}
            className="py-2 px-4 bg-blue-600 text-white rounded"
        >
            {defaultValues ? "Cập nhật" : "Tạo mới"}
        </button>
        </form>
    );
}
