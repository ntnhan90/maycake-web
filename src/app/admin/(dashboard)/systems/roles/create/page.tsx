import { Card , Container } from 'react-bootstrap';
import { Metadata } from "next";
import RoleForm from '../roleForm';

export const metadata: Metadata = {
    title: "Create Role | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function UpdateRolePage({params}: {params:{id:number}}) {
    const id:number = params.id
    return (
        <Container>
            <Card className="mb-4 border-0">
                <RoleForm id={id} />
            </Card>
        </Container>
    );
}