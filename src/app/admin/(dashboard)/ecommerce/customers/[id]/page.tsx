import { Card , Container } from 'react-bootstrap';
import { Metadata } from "next";
import EditCustomerForm from './editCustomerForm';

export const metadata: Metadata = {
    title: "Update Customer | Maycake",
    description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

export default function UpdateCustomerPage({params}: {params:{id:number}}) {
    const id:number = params.id
    return (
        <Container>
            <Card className="mb-4 border-0">
                <EditCustomerForm id={id} />
            </Card>
        </Container>
    );
}