import { Card , Container , Nav} from 'react-bootstrap';
import UserCreateForm from './userCreateForm';
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Create User | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function CreateUserPage() {
    return (
        <Container>
            <Card className="mb-4 border-0">
                <UserCreateForm  />
            </Card>
        </Container>
    );
}