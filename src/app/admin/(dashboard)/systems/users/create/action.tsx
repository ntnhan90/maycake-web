"use client";

import UserForm from '../userForm';
import z from 'zod';

export const UserFormSchema = z.object({
  username: z.string().min(3, "Username phải tối thiểu 3 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  avatar_id: z.string().nullable(),
});

export type UserFormType = z.infer<typeof UserFormSchema>;


export default function CreateUserWrapper() {
    const handleSubmit = async (data: UserFormType) => {
        console.log("Create : " , data)
    };

    return <UserForm onSubmit={handleSubmit} />;
}
