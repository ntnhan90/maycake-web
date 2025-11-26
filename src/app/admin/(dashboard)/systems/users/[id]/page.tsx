import UserEditForm from "./userEditForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Edit User | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};


export default async function EditUserPage({ params }: { params: { id: number } }) {
    const id :number= params.id

    return (
        <div className="container py-4">
        <h2>Edit User</h2>
        <UserEditForm id={id}/>
        </div>
    );
}
