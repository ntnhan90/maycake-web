import { Card , Container } from 'react-bootstrap';
import { Metadata } from "next";
import CustomerForm from '../customerForm';

export const metadata: Metadata = {
    title: "Create Customer | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function CreateCustomerPage() {
    return (
        <Container>
            <Card className="mb-4 border-0">
                <CustomerForm />
            </Card>
        </Container>
    );
}