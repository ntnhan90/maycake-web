import UserForm from "../userForm";
import z from 'zod';
import EditUserWrapper from "./action";

export const UserFormSchema = z.object({
  username: z.string().min(3, "Username phải tối thiểu 3 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  avatar_id: z.string().nullable(),
});
export type UserFormType = z.infer<typeof UserFormSchema>;



export default async function EditUserPage({ params }: { params: { id: string } }) {
    return (
        <div className="container py-4">
        <h2>Edit User</h2>
        <EditUserWrapper userId={params.id}/>
        </div>
    );
}
