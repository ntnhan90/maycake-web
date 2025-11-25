"use client";
import { useEffect, useState } from "react";
import UserForm from "../userForm";
import z from 'zod';

export const UserFormSchema = z.object({
    id:z.number(),
    username: z.string().min(3, "Username phải tối thiểu 3 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    avatar_id: z.string().nullable(),
});
export type UserFormType = z.infer<typeof UserFormSchema>;

interface UserFormWrapperProps {
  userId: string;
}

// giả lập API lấy dữ liệu user
async function getUser(id: number) {
    return {
        id: 1,
        username: "nhan",
        email: "nhan@example.com",
        avatar_id: "",
    };
}

export default async function EditUserWrapper({ userId }: UserFormWrapperProps) {

    const handleSubmit = async (data:UserFormType) => {
        console.log("Create : " , data)
    };
    const user = await getUser(1);
    
    return <UserForm defaultValues={user}  onSubmit={handleSubmit} />;
}